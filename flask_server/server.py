from flask import Flask, request, redirect, url_for, send_from_directory
import os
from flask_cors import CORS, cross_origin
from google.cloud import storage
from flask import jsonify
from datetime import timedelta, datetime
import mysql.connector as mysql
from decouple import config
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

UPLOAD_FOLDER = config("UPLOAD_FOLDER")
ALLOWED_EXTENSIONS = {'pdf'}


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
limiter = Limiter(key_func=get_remote_address, app=app)
CORS(app, support_credentials=True)

MYSQL_USER =  config("MYSQL_USER") #replace with your user name.
MYSQL_PASS =  config("MYSQL_PASS") #replace with your MySQL server password
MYSQL_DATABASE = config("MYSQL_DATABASE")#replace with your database name


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/signup", methods=["GET", "POST"])
@limiter.limit("5 per minute")
@cross_origin(supports_credentials=True)
def signup(): 
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    name = request.form.get("name")
    email = request.form.get("email")
    password = request.form.get("password")
    university = request.form.get("university")
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""SELECT email from usertable""")
    emaildict = cnx.fetchall()
    emails = [dic["email"] for dic in emaildict]
    if email in emails:
        connection.close()
        return jsonify({"response":"Email already in use"}), 401
    password = generate_password_hash(password)
    cnx.execute("""INSERT INTO usertable (username, email, password, university) VALUES (%s, %s, %s, %s)""", (name, email, password, university,))
    cnx.execute("""COMMIT""")
    connection.close()
    return "Account created successfully", 200


@app.route("/login", methods=["GET", "POST"])
@limiter.limit("5 per minute")
@cross_origin(supports_credentials=True)
def login():
    email = request.form.get("email")
    password = request.form.get("password")
    # Create connection with database
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    # Fetch user based on email and password
    cnx.execute(""" SELECT * FROM usertable WHERE email = %s """, (email,))
    user = cnx.fetchall()
    connection.close()
    # If query comes back empty the user doens't exist
    # Else it responds with the user info
    if user == []:
        return jsonify({"response":"Fel lösenord eller email", "errorcode":400}), 400 
    if check_password_hash(user[0]["password"], password):
        return jsonify({"response":user[0]}), 200 
    else:
        return jsonify({"response":"Fel lösenord eller email", "errorcode":400}), 400  
    

@app.route("/servertest", methods=["GET"])
@cross_origin(supports_credentials=True)
def servertest():
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""
        SELECT 
            * 
        FROM 
            usertable
        """)
    testusers = cnx.fetchall()
    cnx.execute("""
        SELECT 
            * 
        FROM 
            accepted
        """)
    accepted = cnx.fetchall()
    cnx.execute("""
        SELECT 
            * 
        FROM 
            pending
        """)
    testfiler = cnx.fetchall()
    cnx.execute("""
        SELECT 
            * 
        FROM 
            denied
        """)
    denied = cnx.fetchall()
    connection.close()
    return jsonify({"users": testusers, "Accepterade": accepted, "Pending": testfiler, "Denied": denied})


@app.route("/myfiles", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def myfiles():
    user_id = request.form.get("id")
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""
        SELECT 
            * 
        FROM 
            pending
        WHERE 
            user_id = %s
        """, (user_id,))
    pending = cnx.fetchall()
    for exam in pending:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])
    cnx.execute("""
        SELECT 
            * 
        FROM 
            accepted
        WHERE 
            user_id = %s
        """, (user_id,))
    accepted = cnx.fetchall()  
    for exam in accepted:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])  
    cnx.execute("""
        SELECT 
            id,file_name,cource_code,grade,exam_date,file_data,denied.user_id,rating,accepted,exam_id,denied.created_on,comment 
        FROM 
            denied 
        JOIN 
            comments 
        ON 
            denied.id=comments.file_id
        WHERE 
            denied.user_id = %s
        """, (user_id,))
    denied = cnx.fetchall()
    for exam in denied:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])
    connection.close()
    return jsonify({"accepted": accepted, "pending": pending, "denied": denied})
    

@app.route("/accepted_files",  methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def get_accepted_files():
    course_code = request.form.get("name").upper()
    #GCS SOLUTION
    #os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'ServiceKey_GoogleCloud.json'
    #client = storage.Client()
    #bucket = client.get_bucket("hanna_data_bucket")
    #blobs = bucket.list_blobs()
    #files = [{"name" : blob.name, "link" : bucket.blob(blob.name).generate_signed_url(datetime.today() + timedelta(1))} for blob in blobs]
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    if course_code == "":
        cnx.execute("SELECT * FROM accepted ORDER BY rating desc LIMIT 20")
    else:
        cnx.execute("SELECT * FROM accepted WHERE cource_code=%s", (course_code,))
    result = cnx.fetchall()
    cnx.execute("SELECT distinct cource_code FROM accepted")
    courses = cnx.fetchall()
    cnx.close()
    for exam in result:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])
    return jsonify({"files": result, "courses":courses})


@app.route("/pending_files")
@cross_origin(supports_credentials=True)
def get_pending_files():
    #GCS SOLUTION
    #os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'ServiceKey_GoogleCloud.json'
    #client = storage.Client()
    #bucket = client.get_bucket("hanna_data_bucket")
    #blobs = bucket.list_blobs()
    #files = [{"name" : blob.name, "link" : bucket.blob(blob.name).generate_signed_url(datetime.today() + timedelta(1))} for blob in blobs]
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute(f"""SELECT * FROM pending order by created_on""")
    result = cnx.fetchall()
    cnx.close()
    for exam in result:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])
    return jsonify({"files": result})


@app.route("/upload", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload():
    # Get the file and form data from the request
    file = request.files.get("file")
    cource_code = request.form.get("name").upper()
    date = request.form.get("date")
    grade = request.form.get("grade")
    examId = request.form.get("examId")
    user_id = request.form.get("user_id")
    university = request.form.get("university")
    # Validate the form data
    if not all([file, cource_code, date, grade, examId, user_id, university]):
        return "Please provide all the required fields", 400
    
    if not file or not allowed_file(file.filename):
        return "Only Pdf allowed", 401
    
    if len(cource_code) != 6:
        return "Invalid cource code", 402

    digits = 0
    for char in cource_code:
        if char.isdigit():
            digits += 1

    if digits != 4:
        return "Invalid cource code", 402
    
    if len(date) != 10:
        return "Invalid date", 403
    date.replace("-","/")
    date_format = "%Y-%m-%d"
    # using try-except blocks for handling the exceptions
    try:
    # formatting the date using strptime() function
        dateObject = datetime.strptime(date, date_format)
        print(dateObject)
    # If the date validation goes wrong
    except ValueError:
    # printing the appropriate text if ValueError occurs
        return "Invalid Date", 403

    filename = secure_filename(file.filename)
    file_path = "/"+ f"{filename}"
    direct = app.config['UPLOAD_FOLDER'] + file_path
    file.save(direct)
    
    redirect(url_for('download_file', name=file_path))
    # Categorize the file
    #file_name = f"{cource_code}/{date}/{grade}/{file.filename}"
    # Upload to GCS
    #storage_client = storage.Client()
    #bucket = storage_client.bucket("hanna_data_bucket")
    #blob = bucket.blob(file_name)
    #blob.upload_from_file(file)

    #Upload to MYSQL
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""
                SELECT
                    *
                FROM
                    pending
                WHERE
                cource_code = %s
                AND
                exam_date = %s
                AND
                exam_id = %s""", (cource_code, date, examId,))
    pending = cnx.fetchall()
    cnx.execute("""
                SELECT
                    *
                FROM
                    accepted
                WHERE
                cource_code = %s
                AND
                exam_date = %s
                AND
                exam_id = %s""", (cource_code, date, examId,))
    accepted = cnx.fetchall()
    if pending != [] or accepted != []:
        cnx.close()
        return "file already exists", 404
    cnx.execute("""INSERT INTO 
                        pending 
                        (file_name, cource_code, grade, exam_date, file_data, user_id, created_on, exam_id, university) 
                    VALUES
                        (%s,%s,%s,%s,%s,%s,CURDATE(),%s,%s)""",
                        (file.filename, cource_code, grade, date, f"http://localhost:5000/download{file_path}", user_id, examId, university) 
                    )
    cnx.execute("""COMMIT""")
    cnx.close()
    return "File uploaded successfully", 200


@app.route('/download/<name>', methods = ["GET"])
@cross_origin(supports_credentials=True)
def download_file(name = None):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)


@app.route("/reviewed", methods=["POST"])
@cross_origin(supports_credentials=True)
def reviewed():
    # Get the file and form data from the request
    file_id = request.form.get("id", type=int)
    status = request.form.get("status")
    comment = request.form.get("comment")
    user_id = request.form.get("user_id")
    # Validate the form date
    if not all([file_id, status]):
        
        return "Please provide all the required fields", 400
    
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    if comment != None:
        cnx.execute(""" INSERT INTO
                            comments
                            (file_id, user_id, comment, created_on)
                        VALUES
                            (%s, %s, %s, curdate())""", (file_id, user_id, comment,))
    cnx.execute(""" UPDATE pending SET accepted = %s where id = %s """, (status, file_id,))
    cnx.execute(""" DELETE FROM pending where id = %s""", (file_id,))
    cnx.execute("""COMMIT""")
    cnx.close()
    return "File uploaded successfully", 200    


@app.route("/erase", methods=["POST"])
@cross_origin(supports_credentials=True)
def erase():
    file_id = request.form.get("id", type=int)
    table = request.form.get("status")
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute(f"""DELETE FROM {table} where id = {file_id}""")
    cnx.execute(f"""DELETE FROM comments where file_id = {file_id}""")
    cnx.execute(f"""DELETE FROM rating where exam_id = {file_id}""")
    cnx.execute("""COMMIT""")
    cnx.close()
    return "File uploaded successfully", 200  


@app.route("/deleteAccount", methods=["POST"])
@cross_origin(supports_credentials=True)
def deleteAccount():
    pass
    #user_id = request.form.get("user_id", type=int)
    #connection = mysql.connect(user=MYSQL_USER,
    #                       passwd=MYSQL_PASS,
    #                       database=MYSQL_DATABASE, 
    #                       host='127.0.0.1')
    #cnx = connection.cursor(dictionary=True)
    #cnx.execute("DELETE FROM comments WHERE user_id = %s", (user_id))
    #cnx.execute("DELETE FROM rating WHERE user_id = %s", (user_id))
    #cnx.execute("DELETE FROM usertable WHERE user_id = %s", (user_id))
    #cnx.execute("""COMMIT""")
    #cnx.close()


@app.route("/userUpdate", methods=["POST"])
@cross_origin(supports_credentials=True)
def userUpdate():
    user_id = request.form.get("user_id", type=int)
    username = request.form.get("username")
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute(""" UPDATE
                        usertable 
                    SET 
                        username = %s 
                    WHERE
                        user_id = %s""", (username, user_id,))
    cnx.execute("""COMMIT""")
    cnx.close()
    return "Success", 200


@app.route("/getuploads", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def getuploads():
    user_id = request.form.get("user_id")
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""
                SELECT
                    uploads
                FROM
                    usertable
                WHERE
                    user_id = %s
                """, (user_id,))
    uploads = cnx.fetchall()
    return jsonify({"response": uploads[0]})


@app.route("/categories")
@cross_origin(supports_credentials=True)
def get_categories():
    connection = mysql.connect(user=MYSQL_USER,
                               passwd=MYSQL_PASS,
                               database=MYSQL_DATABASE,
                               host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""
                SELECT
                    *
                FROM
                    course_code_view
                """
                )
    all = cnx.fetchall()
    cnx.execute("""
                SELECT
                    distinct code_group_name
                FROM
                    course_code_view
                """
                )
    temp = cnx.fetchall()
    cnx.close()
    categories = []
    for item in temp:
        categories.append({"cat" : item["code_group_name"], "courses":[]})
    for cat in categories:
        for course in all:
            if cat["cat"] == course["code_group_name"]:
                cat["courses"].append(course["cource_code"])
    return jsonify({"categories": categories})


@app.route("/exams/<int:exam_id>/comments", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_exam_comments(exam_id):
    connection = mysql.connect(user=MYSQL_USER,
                               passwd=MYSQL_PASS,
                               database=MYSQL_DATABASE,
                               host='127.0.0.1')

    cnx = connection.cursor(dictionary=True)
    cnx.execute("""
                SELECT
                    comment_id, parent_comment_id, username, usertable.user_id, file_id, comment, created_on
                FROM
                    comments
                JOIN 
                    usertable
                ON
                    usertable.user_id = comments.user_id
                WHERE
                    file_id = %s
                ORDER BY 
                    created_on ASC
                """, (exam_id,)
                )
    result = cnx.fetchall()
    cnx.close()

    # Organize comments into threads
    comments = []
    replies = []
    for row in result:
        if row['parent_comment_id'] is None:
            row['replies'] = []
            comments.append(row)
        else:
            replies.append(row)

    for reply in replies:
        for comment in comments:
            if reply['parent_comment_id'] == comment['comment_id']:
                comment['replies'].append(reply)
                break

    return jsonify({"comments": comments})


@app.route("/comments", methods=["POST"])
@limiter.limit("10 per minute")
@cross_origin(supports_credentials=True)
def create_comment():
    connection = mysql.connect(user=MYSQL_USER,
                               passwd=MYSQL_PASS,
                               database=MYSQL_DATABASE,
                               host='127.0.0.1')

    exam_id = request.form["file_id"]
    user_id = request.form["user_id"]
    content = request.form["content"]
    parent_comment_id = request.form["parent_comment_id"]
    timestamp = datetime.now()

    # Check if parent_comment_id is 'null' or an empty value
    if parent_comment_id == 'null' or parent_comment_id == '':
        parent_comment_id = None
    else:
        # Check if the parent comment exists
        cnx = connection.cursor()
        cnx.execute("SELECT COUNT(*) FROM comments WHERE comment_id = %s", (parent_comment_id,))
        parent_comment_count = cnx.fetchone()[0]
        
        if parent_comment_count == 0:
            return jsonify({"message": "Parent comment not found"}), 400

    cnx = connection.cursor()
    cnx.execute("""
                INSERT INTO comments (file_id, user_id, comment, created_on, parent_comment_id)
                VALUES (%s, %s, %s, %s, %s)
                """, (exam_id, user_id, content, timestamp, parent_comment_id)
                )
    connection.commit()
    cnx.close()
    return jsonify({"message": "Comment created"})


@app.route("/comments/<int:comment_id>", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete_comment(comment_id):
    connection = mysql.connect(user=MYSQL_USER,
                               passwd=MYSQL_PASS,
                               database=MYSQL_DATABASE,
                               host='127.0.0.1')

    cnx = connection.cursor()
    cnx.execute("DELETE FROM comments WHERE comment_id = %s", (comment_id,))
    connection.commit()
    cnx.close()

    return jsonify({"message": "Comment deleted"})


@app.route("/update_rating", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_rating():
    connection = mysql.connect(user=MYSQL_USER,
                               passwd=MYSQL_PASS,
                               database=MYSQL_DATABASE,
                               host='127.0.0.1')

    rating = request.form.get("rating")
    user_id = request.form.get("user_id")
    exam_id = request.form.get("exam_id")

    cnx = connection.cursor()
    cnx.execute("""
                CALL update_rating (%s, %s, %s)
                """, (user_id, exam_id, rating)
                )
    connection.commit()
    cnx.close()

    return jsonify({"rating":rating})


@app.route("/statistics", methods=["GET"])
@cross_origin(supports_credentials=True)
def statistics():
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    
    cnx = connection.cursor(dictionary=True)
    
    # Get number of accepted exams
    cnx.execute("SELECT COUNT(*) as accepted_exams FROM accepted")
    accepted_exams = cnx.fetchone()["accepted_exams"]

    # Get number of pending exams
    cnx.execute("SELECT COUNT(*) as pending_exams FROM pending")
    pending_exams = cnx.fetchone()["pending_exams"]

    # Get number of denied exams
    cnx.execute("SELECT COUNT(*) as denied_exams FROM denied")
    denied_exams = cnx.fetchone()["denied_exams"]

    # Get number of users
    cnx.execute("SELECT COUNT(*) as users FROM usertable")
    users = cnx.fetchone()["users"]
    
    connection.close()
    
    return jsonify({
        "accepted_exams": accepted_exams,
        "pending_exams": pending_exams,
        "denied_exams": denied_exams,
        "users": users
    })


@app.route("/activeuser", methods=["GET"])
@cross_origin(supports_credentials=True)
def activeuser():
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""
        SELECT 
            COUNT(*) as active_users
        FROM 
            usertable
        
        """)
    result = cnx.fetchone()
    connection.close()
    return jsonify({"active_users": result["active_users"]})


@app.route("/browseExamsWithSolutions", methods=["GET"])
@cross_origin(supports_credentials=True)
def browse_exams_with_solutions():
    connection = mysql.connect(user=MYSQL_USER,
                               passwd=MYSQL_PASS,
                               database=MYSQL_DATABASE,
                               host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute("SELECT * FROM accepted ORDER BY rating DESC LIMIT 20")
    result = cnx.fetchall()
    cnx.close()
    for exam in result:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])

    return jsonify({"files": result})


@app.route("/allusers", methods=["GET"])
@cross_origin(supports_credentials=True)
def allusers():
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""
        SELECT 
            user_id, username, email, role
        FROM 
            usertable
        """)
    result = cnx.fetchall()
    connection.close()
    return jsonify({"response": result})


@app.route("/promote", methods=["POST"])
@cross_origin(supports_credentials=True)
def promote():
    user_id = request.form.get("user_id")
    role = request.form.get("role")
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""
        UPDATE 
            usertable
        SET 
            role = %s
        WHERE
            user_id = %s
        """, (role, user_id))
    cnx.execute("""COMMIT""")
    connection.close()
    return "success", 200
if __name__ == "__main__":
    app.run(debug=True)


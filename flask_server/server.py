from flask import Flask, request, redirect, url_for, send_from_directory
import os
from flask_cors import CORS, cross_origin
from google.cloud import storage
from flask import jsonify
from datetime import timedelta, datetime
import mysql.connector as mysql
from decouple import config
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = config("UPLOAD_FOLDER")
ALLOWED_EXTENSIONS = {'pdf'}


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, support_credentials=True)

MYSQL_USER =  config("MYSQL_USER") #replace with your user name.
MYSQL_PASS =  config("MYSQL_PASS") #replace with your MySQL server password
MYSQL_DATABASE = config("MYSQL_DATABASE")#replace with your database name


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/signup", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def signup(): 
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    name = request.form.get("name")
    email = request.form.get("email")
    password = request.form.get("password")
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""SELECT email from usertable""")
    emaildict = cnx.fetchall()
    emails = [dic["email"] for dic in emaildict]
    if email in emails:
        connection.close()
        return jsonify({"response":"Email already in use"}), 401
    cnx.execute(f"""INSERT INTO usertable (username, email, password) VALUES ('{name}', '{email}', '{password}')""")
    cnx.execute("""COMMIT""")
    connection.close()
    return "Account created successfully", 200


@app.route("/login", methods=["GET", "POST"])
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
    
    cnx.execute(f"""SELECT 
                        *
                    FROM 
                        usertable
                    WHERE
                        email = "{email}"
                    AND
                        password = "{password}"
                """)
    user = cnx.fetchall()
    connection.close()
    # If query comes back empty the user doens't exist
    # Else it responds with the user info
    if user == []:
        return jsonify({"response":"Fel lösenord eller email", "errorcode":400}), 400
    return jsonify({"response":user[0]}), 200        
    

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
    cnx.execute(f"""
        SELECT 
            * 
        FROM 
            pending
        WHERE 
            user_id = "{user_id}"
        """)
    pending = cnx.fetchall()
    for exam in pending:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])
    cnx.execute(f"""
        SELECT 
            * 
        FROM 
            accepted
        WHERE 
            user_id = "{user_id}"
        """)
    accepted = cnx.fetchall()  
    for exam in accepted:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])  
    cnx.execute(f"""
        SELECT 
            id,file_name,cource_code,grade,exam_date,file_data,denied.user_id,rating,accepted,exam_id,denied.created_on,comment 
        FROM 
            denied 
        JOIN 
            comments 
        ON 
            denied.id=comments.file_id
        WHERE 
            denied.user_id = "{user_id}"
        """)
    denied = cnx.fetchall()
    for exam in denied:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])
    print(denied)
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
        cnx.execute("SELECT * FROM accepted ORDER BY rating desc LIMIT 5")
    else:
        cnx.execute("SELECT * FROM accepted WHERE cource_code=%s", (course_code,))
    result = cnx.fetchall()
    cnx.close()
    for exam in result:
        exam["exam_date"] = str(exam["exam_date"])
        exam["created_on"] = str(exam["created_on"])
    return jsonify({"files": result})


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
    # Validate the form data
    if not all([file, cource_code, date, grade, examId, user_id]):
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
    cnx.execute(f"""
                SELECT
                    *
                FROM
                    pending
                WHERE
                cource_code = '{cource_code}'
                AND
                exam_date = '{date}'
                AND
                exam_id = '{examId}'""")
    pending = cnx.fetchall()
    cnx.execute(f"""
                SELECT
                    *
                FROM
                    accepted
                WHERE
                cource_code = '{cource_code}'
                AND
                exam_date = '{date}'
                AND
                exam_id = '{examId}'""")
    accepted = cnx.fetchall()
    if pending != [] or accepted != []:
        cnx.close()
        return "file already exists", 404
    cnx.execute(f"""INSERT INTO 
                        pending 
                        (file_name, cource_code, grade, exam_date, file_data, user_id, created_on, exam_id) 
                    VALUES 
                        ('{file.filename}', '{cource_code}', '{grade}', '{date}', '{f"http://localhost:5000/download{file_path}"}','{user_id}', CURDATE(), '{examId}') """)
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
        cnx.execute(f""" INSERT INTO
                            comments
                            (file_id, user_id, comment, created_on)
                        VALUES
                            ("{file_id}", "{user_id}", "{comment}", curdate())""")
    cnx.execute(f""" UPDATE pending SET accepted = "{status}" where id = "{file_id}" """)
    cnx.execute(f""" DELETE FROM pending where id = "{file_id}" """)
    cnx.execute("""COMMIT""")
    cnx.close()
    return "File uploaded successfully", 200    


@app.route("/erase", methods=["POST"])
@cross_origin(supports_credentials=True)
def erase():
    file_id = request.form.get("id", type=int)
    table = request.form.get("status")
    print(table, file_id) 
    if not file_id and table:
        return "error", 400
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute(f""" DELETE FROM {table} where id = "{file_id}" """)
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
    cnx.execute(f""" UPDATE
                        usertable 
                    SET 
                        username = "{username}" 
                    WHERE
                        user_id = "{user_id}" """)
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
    cnx.execute(f"""
                SELECT
                    uploads
                FROM
                    usertable
                WHERE
                    user_id = "{user_id}"
                """)
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
                    created_on DESC
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

if __name__ == "__main__":
    app.run(debug=True)


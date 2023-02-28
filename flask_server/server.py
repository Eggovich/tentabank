from flask import Flask, Response, request, session, redirect, url_for, send_from_directory, send_file
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

    # Validate the form data
    if not all([name, email, password]):
        connection.close()
        return "Please provide all the required fields", 400
   
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""SELECT email from usertable""")
    emaildict = cnx.fetchall()
    emails = [dic["email"] for dic in emaildict]
    if email in emails:
        connection.close()
        return "Email already in use", 401
    cnx.execute(f"""INSERT INTO usertable (username, email, password) VALUES ('{name}', '{email}', '{password}')""")
    cnx.execute("""COMMIT""")
    connection.close()
    return "Account created successfully", 200


@app.route("/login", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def login():
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    email = request.form.get("email")
    password = request.form.get("password")
    # Validate the form data
    if not all([email, password]):
        connection.close()
        return jsonify({"response":"Please provide all the required fields"}), 400
    
    cnx = connection.cursor(dictionary=True)
    cnx.execute("""SELECT 
                        email, password 
                    FROM 
                        usertable
                """)
    userdict = cnx.fetchall()
    users = [[dic["email"], dic["password"]] for dic in userdict]
    for user in users:
        if user[0] == email and user[1] == password:
            cnx.execute(f"""SELECT 
                                * 
                            FROM 
                                usertable 
                            WHERE 
                                email ='{email}' 
                                AND password = '{password}'""")
            currentuser = cnx.fetchall()
            connection.close()
            return jsonify({"response":currentuser[0]})
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
            pending
        """)
    testfiler = cnx.fetchall()
    connection.close()
    return jsonify({"users": testusers, "filer": testfiler})

@app.route("/myfiles", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def myfiles():
    user_id = request.form.get("id")
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    print(user_id)
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
    cnx.execute(f"""
        SELECT 
            * 
        FROM 
            accepted
        WHERE 
            user_id = "{user_id}"
        """)
    accepted = cnx.fetchall()    
    cnx.execute(f"""
        SELECT 
            * 
        FROM 
            denied
        WHERE 
            user_id = "{user_id}"
        """)
    denied = cnx.fetchall()
    connection.close()
    return jsonify({"accepted": accepted, "pending": pending, "denied": denied})
    

@app.route("/accepted_files")
@cross_origin(supports_credentials=True)
def get_accepted_files():
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
    cnx.execute(f"""SELECT * FROM accepted""")
    result = cnx.fetchall()
    cnx.close()
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
    return jsonify({"files": result})


@app.route("/upload", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload():
    # Get the file and form data from the request
    file = request.files.get("file")
    cource_code = request.form.get("name").upper()
    date = request.form.get("date")
    grade = request.form.get("grade")
    user_id = request.form.get("user_id")
    # Validate the form data
    if not all([file, cource_code, date, grade, user_id]):
        return "Please provide all the required fields", 400
    
    if not file or not allowed_file(file.filename):
        return "shit is wrong", 401
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
    cnx.execute(f"""INSERT INTO 
                        pending 
                        (file_name, cource_code, grade, exam_date, file_data, user_id, created_on) 
                    VALUES 
                        ('{file.filename}', '{cource_code}', '{grade}', '{date}', '{f"http://localhost:5000/download{file_path}"}','{user_id}', CURDATE())""")
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
    # Validate the form date
    if not all([file_id, status]):
        
        return "Please provide all the required fields", 400
    
    connection = mysql.connect(user=MYSQL_USER,
                           passwd=MYSQL_PASS,
                           database=MYSQL_DATABASE, 
                           host='127.0.0.1')
    cnx = connection.cursor(dictionary=True)
    cnx.execute(f""" UPDATE pending SET accepted = "{status}" where id = "{file_id}" """)
    cnx.execute("""COMMIT""")
    cnx.close()
    return "File uploaded successfully", 200    


if __name__ == "__main__":
    app.run(debug=True)


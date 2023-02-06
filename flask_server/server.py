from flask import Flask, Response, request
import os
from flask_cors import CORS, cross_origin
from google.cloud import storage
from flask import jsonify
from datetime import timedelta, datetime

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/members")
@cross_origin(supports_credentials=True)
def members():
    return {"hej":"nej"}

@app.route("/files")
@cross_origin(supports_credentials=True)
def get_files():
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'ServiceKey_GoogleCloud.json'
    client = storage.Client()
    bucket = client.get_bucket("hanna_data_bucket")
    blobs = bucket.list_blobs()
    files = [{"name": blob.name, "link":bucket.blob(blob.name).generate_signed_url(datetime.today()+timedelta(1))} for blob in blobs]
    return jsonify({"files": files})

@app.route("/upload", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload():
    # Get the file and form data from the request
    file = request.files.get("file")
    name = request.form.get("name").upper()
    date = request.form.get("date")
    grade = request.form.get("grade")

    # Validate the form data
    if not all([file, name, date, grade]):
        return "Please provide all the required fields", 400

    # Categorize the file
    file_path = f"{name}/{date}/{grade}/{file.filename}"

    # Upload to GCS
    storage_client = storage.Client()
    bucket = storage_client.bucket("hanna_data_bucket")
    blob = bucket.blob(file_path)
    blob.upload_from_file(file)

    return "File uploaded successfully", 200
if __name__ == "__main__":
    app.run(debug=True)


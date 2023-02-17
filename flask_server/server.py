from flask import Flask, Response, request
import os
from flask_cors import CORS, cross_origin
from google.cloud import storage
from flask import jsonify
from datetime import timedelta, datetime
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")
CORS(app, support_credentials=True)
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

# 👆 We're continuing from the steps above. Append this to your server.py file.

oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)


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
    files = [{"name" : blob.name, "link" : bucket.blob(blob.name).generate_signed_url(datetime.today() + timedelta(1))} for blob in blobs]
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


@app.route("/login")
@cross_origin(supports_credentials=True)
def login():
    return {"Hej":1000}
if __name__ == "__main__":
    app.run(debug=True)


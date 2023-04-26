# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

------------------ FOR PEER-REVIEW --------------

You will start be running this comad to download the node module for the `tentabank-bth`folder.
You can access the folder from the termial with the command.

### `cd tentabank-bth`

After you are in the direcory you need to run the `npm install`command to get the node modules

### `npm install`

After downloaded the node module (that takes some time), you need check that all the dependencied inside the folder `tentabank-bth` is downloaded.

### `npm install 
    "@auth0/auth0-react"
    "@react-pdf/renderer"
    "@testing-library/jest-dom"
    "@testing-library/react"
    "@testing-library/user-event"
    "react-activity-detector"
    "react-bootstrap"
    "react-confirm-alert"
    "react-cookie"
    "react-countup"
    "react-dom"
    "react-fetch-hook"
    "react-icons"
    "react-pdf"
    "react-scripts"
    "styled-components"
    "usestate"
    "web-vitals"`

--------------- SETTIING UP THE BACKEND -------------

Open up a new terminal and jump in to it

Download the requirements with:

### `pip install`
### `pip3 install` for mac

    flask>=2.0.3
    python-dotenv>=0.19.2
    authlib>=1.0
    requests>=2.27.1


After the requirements are installed, you need to set up the .env file:

The .env file looks like:
"""
MYSQL_USER =YOUR-USERNAME
MYSQL_PASS =YOUR-PASSWORD
MYSQL_DATABASE =YOUR-DATABASE-NAME

UPLOAD_FOLDER =YOUR-EXAMS-FOLDER-PATH
"""
--------------- SETTIING UP THE DATABASE -------------

Set up your own database on your machine using MySQL, use the path and update the .env file with the cridentials.

### `copy the mysql.sql file`

And run the code in your database enviroment.


--------------- NOW YOUR FRONTEND, BACKEND AND DATABESE ARE DONE -------------

Go the the `tentabank-bth`directory and run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


Then start your backend by going to the `flask_server` directory and run:

### `python server.py`

### `python3 server.py`for mac
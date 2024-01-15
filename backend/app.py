from flask import Flask, request, session, redirect, url_for, jsonify
from flask import *

#PostgreSQL database adapter for the Python
import psycopg2 #pip install psycopg2 
from flask_cors import CORS
import re 


from crawl import crawl_and_save,ten_percent,cluster_websites,cluster_seperator,cluster_sampler




#turning a password into ciphertext, to block  password breaches.
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "super secret key"
#we use secret_key to keep data safe

#Cross Origin Resource Sharing (CORS) enables support on all routes, for all origins and methods
CORS(app) 

conn = psycopg2.connect(database="Wsample",  
                        user="postgres", 
                        password="nakrer",  
                        host="localhost", port="5432") 
cur = conn.cursor() 


#@app.route('/')
#def home():
#   data = request.get_json()

results = []

@app.route('/searchscreen',methods=['POST'])
def search():
    
    data = request.get_json()
    technique = data.get('technique')
    searchQuery = data.get('searchQuery')
    
    print(searchQuery)
    print(technique)

    urls = crawl_and_save(searchQuery,3)
    

    if (technique == "d"):
        print("D")
        results.clear()  # results listesini temizle
        clusters = cluster_websites(urls)
      
       
  
        seperated_clusters = cluster_seperator(clusters, urls)
       
        print("seperated",seperated_clusters)
        cluster_samples = cluster_sampler(seperated_clusters)  
        print(cluster_samples)
        results.extend(cluster_samples)
        return jsonify(cluster_samples)
      

    if(technique=="g"):
        print("G")
        results.clear()  # results listesini temizle
        random = ten_percent(urls)
        results.extend(random)
        return jsonify(random)


@app.route('/getresults',methods=['GET'])
def getresults():
    print(results)
    return jsonify(results)

@app.route('/saveProject',methods=['POST'])
def saveProject():
    data = request.get_json()
    pName = data.get('pName')
    date = data.get('date')
    
    items = data.get('items')
    print(pName)
    print(date)
    print(items)

    pid = 0;

    cur.execute("INSERT INTO projects (project_name, project_date) VALUES (%s,%s) RETURNING pid",
                       (pName, date))
    
    pid = cur.fetchone()[0]
    conn.commit()

    #cur.execute('SELECT pid FROM projects WHERE project_name = %s', (pName,))
    #pid = cur.fetchone()

    for i in items:
        cur.execute("INSERT INTO project_links (url, pid) VALUES (%s,%s)",
                       (i, pid))
    conn.commit(),

    return jsonify({'message': 'You have successfully saved!'}), 200


@app.route('/getProject',methods=['GET'])
def getProject():
    projects = [] ;
    cur.execute('SELECT * FROM projects')
    projects = cur.fetchall()

    #print(projects)
    return jsonify(projects)
    


 
@app.route('/register', methods=['POST'])
def register():

    data = request.get_json()

    firstname = data.get('firstName')
    lastname = data.get('lastName')
    username = data.get('username')
    password = data.get('password')

    #hashed_password = generate_password_hash(password)

    # Check if account exists using your database
    cur.execute('SELECT * FROM users WHERE user_name = %s', (username,))
    account = cur.fetchone()

    print(f"Data to be inserted: {firstname}, {lastname}, {password}, {username}")

    if not firstname or not lastname or not password or not username or not any([firstname, lastname, password, username]):
        return jsonify({'message': 'Please fill out the form!'}), 400

    elif account:
        return jsonify({'message': 'Account already exists!'}), 400

    elif not re.match(r'[A-Za-z0-9]+', username):
        return jsonify({'message': 'Username must contain only characters and numbers!'}), 400
    else:
        cur.execute("INSERT INTO users (user_name, name, surname, password) VALUES (%s,%s,%s,%s)",
                       (username, firstname, lastname, password))
        conn.commit()
        return jsonify({'message': 'You have successfully registered!'}), 200


@app.route('/login', methods=['POST'])
def login():

    # Check if "username" and "password" POST requests exist (user submitted form)
    if request.method == 'POST':
        data = request.get_json()  # Assuming data is sent as JSON from your React app
        username = data.get('username')
        password = data.get('password')

        # Check if account exists using your database
        cur.execute('SELECT * FROM users WHERE user_name = %s', (username,))
        account = cur.fetchone()

        print(f"Data to be checked: {password}, {username}")

        if account:
            
            password_rs = account[3]
            if password.__eq__(password_rs):
                # check_password_hash(password_rs, password):
                # Create session data, we can access this data in other routes
                session['username'] = username
                return jsonify({'message': 'Login successful'}), 200
            else:
                return jsonify({'message': 'Incorrect password'}), 400
        else:
            return jsonify({'message': 'Incorrect username'}), 400


    
#@app.route("/logout")
#def logout():
    session.pop("username", None)

if __name__ == '__main__':
    app.run(debug=True)



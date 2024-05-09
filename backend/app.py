from flask import Flask, request, session, redirect, url_for, jsonify
from flask import *

#PostgreSQL database adapter for the Python
import psycopg2 #pip install psycopg2 
from flask_cors import CORS
import re 
import jwt
import datetime

from crawl import crawl_and_save,ten_percent,cluster_websites,cluster_seperator,cluster_sampler, error_messages
from aNew import find_required_pages


from sqlalchemy import text
from flask_sqlalchemy import SQLAlchemy


#turning a password into ciphertext, to block  password breaches.
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "super secret key"
#we use secret_key to keep data safe

#Cross Origin Resource Sharing (CORS) enables support on all routes, for all origins and methods
CORS(app) 


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:W-Sample@wsample.crlioocavuh9.us-east-1.rds.amazonaws.com:5432/WSample'
db = SQLAlchemy(app)

results = []
user_check = []
messages = []


keywords = [["home"],
            ["login", "sign in", "signin", "login"],
            ["sitemap"],
            ["contact"],
            ["help"],
            ["legal information", "terms and conditions", "privacy policy"]]


JWT_SECRET_KEY = "your-secret-key"
@app.route('/searchscreen',methods=['POST'])
def search():
    messages.clear()
   
   
    data = request.get_json()
    technique = data.get('technique')
    searchQuery = data.get('searchQuery')
    
    print(searchQuery)
    print(technique)

    urls = crawl_and_save(searchQuery,3)
    messages.extend(error_messages) 
    print("ERROR MESSAGES ",messages,"AND",urls)
    results.clear()
    if  urls:

        
        if (technique == "d"):
            print("D")
        
            clusters = cluster_websites(urls)
        
        
    
            seperated_clusters = cluster_seperator(clusters, urls)
        
            print("seperated",seperated_clusters)
            cluster_samples = cluster_sampler(seperated_clusters)  
            print(cluster_samples)
            results.extend(cluster_samples)
            return jsonify(cluster_samples)
        

        if(technique=="g"):
            print("G")
            
            random = ten_percent(urls)
            results.extend(random)
            return jsonify(random)
        
        if(technique=="a"):
            print("A")
        
            temp  = find_required_pages(keywords,urls,searchQuery)
            results.extend(temp)
            return jsonify(results)
    else:
         print("HERE")
         return jsonify({'message': messages}), 500


@app.route('/getProjectDetails', methods=['POST'])
def get_project_details():
    try:
        data = request.get_json()
        project_id = data.get('projectId')

        if not project_id:
            return jsonify({'error': 'Project ID (projectId) is required.'}), 400

       
        project_check_query = text("SELECT pid FROM projects WHERE pid = :project_id")
        result = db.session.execute(project_check_query, {"project_id": project_id})
        project_exists = result.fetchone()

        if not project_exists:
            return jsonify({'error': 'Project with the provided ID does not exist.'}), 404

        print("project id:", project_id)

       
        query = text("SELECT url FROM project_links WHERE pid = :project_id")
        result = db.session.execute(query, {"project_id": project_id})
        links = [row[0] for row in result.fetchall()]

        return jsonify({'links': links}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Error getting project details'}), 500


"""   
@app.route('/deleteProject', methods=['POST'])
def deleteForm():
    data = request.get_json()

    pId = data.get('delId')
    print("delete pid",pId)
    try:
        
        user_p_delete_query = text("DELETE FROM user_projects WHERE project_id= :pId")
        db.session.execute(user_p_delete_query, {"pId": pId})
        db.session.commit()

        links_p_delete_query = text("DELETE FROM project_links WHERE pid= :pId")
        db.session.execute(links_p_delete_query, {"pId": pId})
        db.session.commit()

        
        p_delete_query = text("DELETE FROM projects WHERE pid = :pId")
        db.session.execute(p_delete_query, {"pId": pId})
        db.session.commit()

        return jsonify({'message': 'Project successfully deleted!'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'message': 'Error for deleting project!'}), 500
 """
from flask import jsonify

@app.route('/deleteProject', methods=['POST'])
def deleteForm():
    try:
        data = request.get_json()
        pId = data.get('delId')

        if not pId:
            return jsonify({'error': 'Project ID (delId) is required.'}), 400

        # Check if the project ID exists in the database
        project_check_query = text("SELECT pid FROM projects WHERE pid = :pId")
        result = db.session.execute(project_check_query, {"pId": pId})
        project_exists = result.fetchone()

        if not project_exists:
            return jsonify({'error': 'Project with the provided ID does not exist.'}), 404

        print("delete pid", pId)

        user_p_delete_query = text("DELETE FROM user_projects WHERE project_id= :pId")
        db.session.execute(user_p_delete_query, {"pId": pId})
        db.session.commit()

        links_p_delete_query = text("DELETE FROM project_links WHERE pid= :pId")
        db.session.execute(links_p_delete_query, {"pId": pId})
        db.session.commit()

        p_delete_query = text("DELETE FROM projects WHERE pid = :pId")
        db.session.execute(p_delete_query, {"pId": pId})
        db.session.commit()

        return jsonify({'message': 'Project successfully deleted!'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Error occurred while deleting project.'}), 500

    
@app.route('/editProject', methods=['POST'])
def updateName():
    data = request.get_json()

    pName = data.get('pName')
    pId = data.get('pId')
    print("project name", pId)
    try:
        user_p_update_query = text("UPDATE projects SET project_name = :pName WHERE pid = :pId")
        db.session.execute(user_p_update_query, {"pName": pName, "pId": pId})
        db.session.commit()


        return jsonify({'message': 'Project successfully updated!'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'message': 'Error for updating project!'}), 500
    

@app.route('/getresults', methods=['GET'])
def getresults():
    try:
        if not results:
            return jsonify({'error': 'No results found.'}), 404

        print(results)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


"""
@app.route('/saveProject',methods=['POST'])
def saveProject():
    data = request.get_json()
    pName = data.get('pName')
    date = data.get('date')
    username = data.get('username')

    print(username)
    
    items = data.get('items')
    print(pName)
    print(date)
    print(items)

    pid = 0;
    
    query = text("INSERT INTO projects (project_name, project_date) VALUES (:project_name, :project_date) RETURNING pid")
    parameters = {"project_name": pName, "project_date": date}
    result = db.session.execute(query, parameters)
    pid = result.fetchone()[0] 
    db.session.commit()

    query = text("INSERT INTO user_projects (user_name, project_id) VALUES (:username, :pid)")
    parameters = {"username": username, "pid": pid}
    result = db.session.execute(query, parameters)
    db.session.commit()

    #cur.execute('SELECT pid FROM projects WHERE project_name = %s', (pName,))
    #pid = cur.fetchone()

    for i in items:
        query = text("INSERT INTO project_links (url, pid) VALUES (:url, :pid)")
        parameters = {"url": i, "pid": pid}
        db.session.execute(query, parameters)

    db.session.commit()

    return jsonify({'message': 'You have successfully saved!'}), 200

"""
@app.route('/saveProject', methods=['POST'])
def saveProject():
    try:
        data = request.get_json()
        pName = data.get('pName')
        date = data.get('date')
        username = data.get('username')
        items = data.get('items')

        if not all([pName, date, username, items]):
            return jsonify({'error': 'Missing required fields.'}), 400

        print(username)
        print(pName)
        print(date)
        print(items)

        query = text("INSERT INTO projects (project_name, project_date) VALUES (:project_name, :project_date) RETURNING pid")
        parameters = {"project_name": pName, "project_date": date}
        result = db.session.execute(query, parameters)
        pid = result.fetchone()[0]
        db.session.commit()

        query = text("INSERT INTO user_projects (user_name, project_id) VALUES (:username, :pid)")
        parameters = {"username": username, "pid": pid}
        db.session.execute(query, parameters)
        db.session.commit()

        for i in items:
            query = text("INSERT INTO project_links (url, pid) VALUES (:url, :pid)")
            parameters = {"url": i, "pid": pid}
            db.session.execute(query, parameters)

        db.session.commit()

        return jsonify({'message': 'You have successfully saved!'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/getProject', methods=['POST'])
def getProject():
    try:
        data = request.json
        username = data.get('username')

        if not username:
            return jsonify({'error': 'Username is required.'}), 400

        query = text("""
             SELECT projects.pid, projects.project_name, projects.project_date
             FROM user_projects
             JOIN projects ON user_projects.project_id = projects.pid
             WHERE user_projects.user_name = :username
        """)
        result = db.session.execute(query, {"username": username})

       
        columns = result.keys()

        
        projects = []
        for row in result.fetchall():
            project = {}
            for idx, column in enumerate(columns):
                project[column] = row[idx]
            projects.append(project)

        print(projects)
        return jsonify(projects), 200
       
    except Exception as e:
        return jsonify({'error': str(e)}), 500



"""
@app.route('/getProjects', methods=['GET'])
def get_projects():
    user_name = request.args.get('user_name')  # Kullanıcı adını isteğe bağlı olarak al
    if not user_name:
        return jsonify({"error": "Missing user_name parameter"}), 400  # Eğer kullanıcı adı belirtilmemişse hata döndür

    # Kullanıcının projelerini almak için bir sorgu oluştur
    """
      # query = text("""
         #SELECT projects.project_id, projects.project_name, projects.project_date
         # FROM user_project
         # JOIN projects ON user_project.project_id = projects.project_id
    # WHERE user_project.user_name = :user_name
   # """)
    
    
    # Sorguyu çalıştır
"""
    result = db.session.execute(query, {"user_name": user_name})

    # Satırları sözlük listesine dönüştür
    projects = []
    for row in result.fetchall():
        project = {
            "project_id": row["project_id"],
            "project_name": row["project_name"],
            "project_date": row["project_date"]
        }
        projects.append(project)

    return jsonify(projects)"""


    


@app.route('/register', methods=['POST'])
def register():

    data = request.get_json()

    firstname = data.get('firstName')
    lastname = data.get('lastName')
    username = data.get('username')
    password = data.get('password')

    #hashed_password = generate_password_hash(password)

    # Check if account exists using your database

    query = text("SELECT * FROM users WHERE user_name = :username")
    result = db.session.execute(query, {"username": username})
    account = result.fetchone()

    print(f"Data to be inserted: {firstname}, {lastname}, {password}, {username}")

    if not firstname or not lastname or not password or not username or not any([firstname, lastname, password, username]):
        return jsonify({'message': 'Please fill out the form!'}), 400

    elif account:
        return jsonify({'message': 'Account already exists!'}), 400

    elif not re.match(r'[A-Za-z0-9]+', username):
        return jsonify({'message': 'Username must contain only characters and numbers!'}), 400
    else:
        query = text("INSERT INTO users (user_name, name, surname, password) VALUES (:user_name, :name, :surname, :password)")
        parameters = {"user_name": username, "name": firstname, "surname": lastname, "password": password}
        db.session.execute(query, parameters)
        db.session.commit()
        return jsonify({'message': 'You have successfully registered!'}), 200


@app.route('/login', methods=['POST'])
def login():

    # Check if "username" and "password" POST requests exist (user submitted form)
    if request.method == 'POST':
        data = request.get_json()  # Assuming data is sent as JSON from your React app
        username = data.get('username')
        password = data.get('password')

        # Check if account exists using your database
        query = text("SELECT * FROM users WHERE user_name = :username")
        result = db.session.execute(query, {"username": username})
        account = result.fetchone()

        print(f"Data to be checked: {password}, {username}")

        if account:
            
            password_rs = account[3]
            if password.__eq__(password_rs):
                # check_password_hash(password_rs, password):
                # Create session data, we can access this data in other routes
                token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, JWT_SECRET_KEY)
                user_check.append(username)
                return jsonify({'message': 'Login successful','token': token , 'username':username}), 200
            else:
                return jsonify({'message': 'Incorrect password'}), 400
        else:
            return jsonify({'message': 'Incorrect username'}), 400


    

if __name__ == '__main__':
    app.run(debug=True)









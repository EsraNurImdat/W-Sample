from flask import *

app = Flask(__name__)

app.secret_key = "123"

articles = [("A1", "A1 Title", "A1 Desc"), ("A2", "A2 Title", "A2 Desc"), ("A3", "A3 Title", "A3 Desc")]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login")
def loginscreen():
    return render_template("login.html")

@app.route("/register")
def registerationscreen():
    return render_template("register.html")

@app.post("/applylogin")
def loginoperation():
    #DB check to see if the user is available
    session["username"] = request.form["username"]
    return redirect(url_for("index"))

@app.route("/logout")
def logoutoperation():
    session.pop("username", None)
    return redirect(url_for("index"))

@app.route("/showarticles")
def showarticles():
    if "username" in session:
        return render_template("articles.html", articles=articles)
    else:
        return redirect(url_for("index"))

@app.get("/showarticle")
def showarticle():
    articleid = request.args.get("articleid")
    for a in articles:
        if a[0] == articleid:
            return render_template("article.html", article=a)

    return redirect("/showarticles")

if __name__ == "__main__":
    app.run()

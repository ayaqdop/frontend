import os
from flask import Flask, render_template

app = Flask(__name__)
port = int(os.getenv("PORT", 8000))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/log")
def log():
    return render_template("log.html")

@app.route("/game")
def game():
    return render_template("game.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)

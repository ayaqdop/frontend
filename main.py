import os
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
port = int(os.getenv("PORT", 8000))
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/log")
def log():
    return render_template("log.html")

@app.route("/game")
def game():
    return render_template("game.html")

@socketio.on("server")
def receive_message(msg):
    socketio.emit("client", msg)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=port)

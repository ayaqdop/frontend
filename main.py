from flask import Flask, render_template
import os

app = Flask(__name__)
port = int(os.getenv("VCAP_APP_PORT"))

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)

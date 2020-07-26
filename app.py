from flask import Flask, render_template, request, jsonify
import json, os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/Nige")
def Nige():
    return render_template("Nige/index.html")
@app.route("/Oni")
def Oni():
    with open('loc.json','r') as f:
        json_txt = f.read()
        json_txt = str(json_txt).replace("'", '"').replace('True', 'true').replace('False', 'false')
        dt = json.loads(json_txt)
    return render_template("Oni/index.html", datas=dt)
@app.route("/getLocation", methods=["GET"])
def getLocation():
    with open('loc.json','r') as f:
        dt = json.load(f)
    return render_template("Oni/index.html",datas=dt)
@app.route("/sendLocation", methods=["POST"])
def sendLocation():
    global datas
    datas = request.get_data()
    datas = datas.decode()
    datas = json.loads(datas)
    print(datas)
    lat = datas["lat"]
    lng = datas["lng"]
    print(lat)
    print(lng)
    with open('loc.json','w') as f:
        json.dump(datas, f, indent=4)
    return jsonify(datas)
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
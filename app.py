from flask import Flask, render_template, request, jsonify, make_response
import json, os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
cnames = []
data = {}
@app.route("/")
def Room():
	return render_template("Room/index.html")
@app.route("/Lobby")
def Lobby():
	return render_template("Lobby/index.html")
@app.route("/Nige")
def Nige():
	return render_template("Nige/index.html")
@app.route("/Oni")
def Oni():
	return render_template("Oni/index.html", datas=datas)
@app.route("/getLocation", methods=["GET"])
def getLocation():
	print('[getLocation:]' + str(datas))
	return jsonify(datas)
@app.route("/sendLocation", methods=["POST"])
def sendLocation():
	global datas
	datas = request.get_data()
	datas = datas.decode()
	datas = json.loads(datas)
	print(datas)
	lat = datas["lat"]
	lng = datas["lng"]
	cname = datas["cname"]
	print(cname)
	print(lat)
	print(lng)
	return jsonify(datas)
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
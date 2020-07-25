from flask import Flask, render_template, request
import json, os
app = Flask(__name__)
@app.route("/Nige")
def Nige():
	return render_template("Nige/index.html")

@app.route("/Oni")
def Oni():
	return render_template("Oni/index.html", datas=datas)
@app.route("/getLocation", methods=["GET"])
def getLocation():
	return datas

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
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
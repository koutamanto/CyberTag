from flask import Flask, render_template, request, jsonify
import json, os
app = Flask(__name__)
@app.route("/Nige")
def Nige():
	return render_template("Nige/index.html")

@app.route("/Oni")
def Oni():
	with open('loc.txt','r') as f:
		dt = f.read()
	return render_template("Oni/index.html", datas=dt)
@app.route("/getLocation", methods=["GET"])
def getLocation():
	with open('loc.txt','r') as f:
		dt = f.read()
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
	with open('loc.txt','w') as f:
		f.write(str(datas))
	return jsonify(datas)
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
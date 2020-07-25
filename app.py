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
	return render_template("Oni/index.html",datas=datas)

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
	return datas
if __name__ == '__main__':
	app.listen(os.environ["PORT"] || 5000)
    app.run(host="0.0.0.0", port=5000)
from flask import Flask, render_template, request
import json, os
from livereload import Server

app = Flask(__name__)
@app.route("/Nige")
def Nige():
	return render_template("Nige/index.html")

@app.route("/Oni")
def Oni():
	return render_template("Oni/index.html", datas=datas)
@app.route("/getLocation", methods=["GET"])
def getLocation():
	with open('loc.json','r') as f:
		data = json.load(f)
	return render_template("Oni/index.html",datas=data)

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
if __name__ == '__main__':
	live_server = Server(app.wsgi_app)
	live_server.watch("**/*.*")
	port = os.environ.get("PORT", 5000)
	server.serve(port=port, host='0.0.0.0')

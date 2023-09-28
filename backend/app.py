import json

from flask import Flask
from flask_cors import CORS, cross_origin

from bokeh.plotting import figure
from bokeh.embed import json_item

from numpy import cos, linspace

app = Flask(__name__)
# CORS enabled so react frontend can pull data from python backend
CORS(app)

@app.route('/plot1', methods=["GET"])
def plot1(): 
  # copy/pasted from Bokeh Getting Started Guide
    x = linspace(-6, 6, 100)
    y = cos(x)
    p = figure(width=500, height=500, toolbar_location="below",
                     title="Plot 1")
    p.circle(x, y, size=7, color="firebrick", alpha=0.5)
 
    # following above points: 
    #  + pass plot object 'p' into json_item
    #  + wrap the result in json.dumps and return to frontend
    return json.dumps(json_item(p, "myplot"))
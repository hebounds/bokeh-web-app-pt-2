from flask import Flask, send_file
from flask_cors import CORS

from bokeh.plotting import figure
from bokeh.embed import json_item
from bokeh.io import export_png, export_svgs

from numpy import cos, linspace

app = Flask(__name__)
# CORS enabled so react frontend can pull data from python backend
CORS(app)

@app.route('/plot1', methods=["GET"])
def plot1(): 
    x = linspace(-6, 6, 100)
    y = cos(x)
    p = figure(width=500, height=500, toolbar_location=None, title="Plot 1")
    p.circle(x, y, size=7, color="firebrick", alpha=0.5)

    export_png(p, filename = "bokeh_plot.png")
    return send_file("bokeh_plot.png", mimetype='image/png')
    # export_svgs(p, filename = "bokeh_plot.svg")
    # return send_file("bokeh_plot.svg", mimetype='image/svg+xml')
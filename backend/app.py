from flask import Flask, send_file, request, make_response
from flask_cors import CORS, cross_origin

from bokeh.plotting import figure
from bokeh.embed import json_item
from bokeh.io import export_png, export_svgs
from bokeh.models import ColumnDataSource

import numpy as np
import pandas as pd

import time
import datetime

# If true writes graph generation timing to "timings.txt"
timingBool = True

app = Flask(__name__)
# CORS enabled so react frontend can pull data from python backend
CORS(app, resources={r"/plot1": {"origins": "http://localhost:3000"}}, supports_credentials=True)
# CORS(app)

@app.route('/plot1', methods=['GET', 'OPTIONS', 'PUT', 'POST', 'HEAD', 'DELETE'])
def plot1(): 
    time1 = time.perf_counter() 
    df = pd.read_csv('data.csv')

    channel = request.args.get('channel', default='Channel1')

    # axis_range = Range1d(graphSettings.lowerBound, graphSettings.upperBound)

    dates = np.array(df['Date'], dtype=np.datetime64)
    source = ColumnDataSource(data=dict(date=dates, close=df[channel]))

    p = figure(height=300, width=800, tools="xpan", toolbar_location=None,
        x_axis_type="datetime", x_axis_location="below",
        background_fill_color="#efefef")

    # p.line('date', 'close', source=source)
    p.circle('date', 'close', source=source, fill_color="white", size=8)
    p.yaxis.axis_label = 'Value'

    export_png(p, filename = "bokeh_plot.png")
    time2 = time.perf_counter()
    if (timingBool):
        with open('timings.csv', 'a') as timings:
            curTime = datetime.datetime.now()
            timings.write(curTime.strftime("%m/%d/%Y %H:%M:%S") + "," + str(time2 - time1) + "\n")

    # response = make_response(send_file("bokeh_plot.png", mimetype='image/png'))
    # response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    # response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
    # response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    # response.headers["Access-Control-Allow-Credentials"] = "true"

    # return response
    return send_file("bokeh_plot.png", mimetype='image/png')

    # export_svgs(p, filename = "bokeh_plot.svg")
    # return send_file("bokeh_plot.svg", mimetype='image/svg+xml')
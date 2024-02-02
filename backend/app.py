import os
from flask import Flask, send_file, request
from flask_cors import CORS

from bokeh.plotting import figure
from bokeh.io import export_png, export_svgs
from bokeh.models import ColumnDataSource

import numpy as np
import pandas as pd

import time
import datetime

# If true writes graph generation timing to "timings.txt"
timingBool = True

app = Flask(__name__)
app.config.CORS_HEADERS = 'Content-Type, Authorization, Origin' 
app.config.CORS_METHODS = 'GET, HEAD, POST, PATCH, DELETE, OPTIONS' 
app.config.CORS_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']
CORS(app, supports_credentials=True)

@app.route('/plot1', methods=["GET"])
def plot1(): 
    time1 = time.perf_counter() 

    df = pd.read_csv("dataSources/" + request.args.get('dataSource') + ".csv")

    channel = request.args.get('channel', default='Channel1')
    start = request.args.get('start', default='0')
    stop = request.args.get('stop', default='1')
    start_delta = datetime.timedelta(seconds=float(start)*3600)
    stop_delta = datetime.timedelta(seconds=float(stop)*3600)
    today = datetime.datetime.today();
    today = today.replace(hour=0, minute=0, second=0, microsecond=0)
    start_datetime = today + start_delta
    stop_datetime = today + stop_delta

    dates = np.array(df['Date'], dtype=np.datetime64)
    source = ColumnDataSource(data=dict(date=dates, close=df[channel]))

    p = figure(height=300, width=800, tools="xpan", toolbar_location=None,
        x_axis_type="datetime", x_axis_location="below",
        background_fill_color="#efefef", x_range=(start_datetime, stop_datetime), y_range=(0, 1))

    p.circle('date', 'close', source=source, fill_color="white", size=8)
    p.yaxis.axis_label = 'Value'

    export_png(p, filename = "bokeh_plot.png")
    time2 = time.perf_counter()
    if (timingBool):
        with open('timings.csv', 'a') as timings:
            curTime = datetime.datetime.now()
            timings.write(curTime.strftime("%m/%d/%Y %H:%M:%S") + "," + str(time2 - time1) + "\n")

    return send_file("bokeh_plot.png", mimetype='image/png')

    # export_svgs(p, filename = "bokeh_plot.svg")
    # return send_file("bokeh_plot.svg", mimetype='image/svg+xml')

@app.route('/channels', methods=["GET"])
def channels():
    df = pd.read_csv("dataSources/" + request.args.get('dataSource') + ".csv")

    channels = df.columns
    channels = channels[1:-1]
    channels_str = ""
    for i in channels:
        channels_str += "," + i
    return channels_str[1:]

@app.route('/dataSources', methods=["GET"])
def dataSources():
    directory = "dataSources/"
    fileNames = sorted(os.listdir(directory))
    fileNames_str = ""
    for i in fileNames:
        fileNames_str += "," + i.split(".")[0]
    return fileNames_str[1:]
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

    df = pd.read_csv("dataSources/" + request.args.get('dataSource') + "/" + request.args.get('recording') + ".csv")

    channel = request.args.get('channel', default='Channel1')

    # Get current date and time
    now = datetime.datetime.now()
    yesterday = now - datetime.timedelta(seconds=86400)

    # Format date and time
    formatted_date_time_now = now.strftime("%Y-%m-%dT%H:%M")
    formatted_date_time_yesterday = yesterday.strftime("%Y-%m-%dT%H:%M")

    # Fetch start and stop arguments, with default of yesterday and today at current time
    start = request.args.get('start', default=formatted_date_time_yesterday)
    stop = request.args.get('stop', default=formatted_date_time_now)

    if (start == ""):
        start = formatted_date_time_yesterday
    if (stop == ""):
        stop = formatted_date_time_now

    start_tokens = start.split("-") + start.split("T")[1].split(":")
    stop_tokens = stop.split("-") + stop.split("T")[1].split(":")

    start_year = start_tokens[0]
    start_month = start_tokens[1]
    start_day = start_tokens[2].split("T")[0]
    start_hour = start_tokens[3]
    start_minute = start_tokens[4]

    stop_year = stop_tokens[0]
    stop_month = stop_tokens[1]
    stop_day = stop_tokens[2].split("T")[0]
    stop_hour = stop_tokens[3]
    stop_minute = stop_tokens[4]

    start_datetime = datetime.datetime(
        year=int(start_year),
        month=int(start_month),
        day=int(start_day),
        hour=int(start_hour),
        minute=int(start_minute)
    )
    stop_datetime = datetime.datetime(
        year=int(stop_year),
        month=int(stop_month),
        day=int(stop_day),
        hour=int(stop_hour),
        minute=int(stop_minute)
    )

    # if start_datetime == stop_datetime:
    #     current_minute = stop_datetime.minute
    #     current_minute += 1
    #     stop_datetime.replace(minute=current_minute)

    # print(stop_datetime.minute)

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

@app.route('/dataSources', methods=["GET"])
def dataSources():
    directory = "dataSources/"
    fileNames = sorted(os.listdir(directory))
    fileNames_str = ""
    for i in fileNames:
        fileNames_str += "," + i.split(".")[0]
    return fileNames_str[1:]

@app.route('/recordings', methods=["GET"])
def recordings():
    directory = "dataSources/" + request.args.get('dataSource') + "/"
    fileNames = sorted(os.listdir(directory))
    fileNames_str = ""
    for i in fileNames:
        fileNames_str += "," + i.split(".")[0]
    return fileNames_str[1:]

@app.route('/channels', methods=["GET"])
def channels():
    df = pd.read_csv("dataSources/" + request.args.get('dataSource') + "/" + request.args.get('recording') + ".csv")

    channels = df.columns
    channels = channels[1:-1]
    channels_str = ""
    for i in channels:
        channels_str += "," + i
    return channels_str[1:]
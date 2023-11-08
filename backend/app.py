from flask import Flask, send_file
from flask_cors import CORS

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
CORS(app)

@app.route('/plot1', methods=["GET"])
def plot1(): 
    time1 = time.perf_counter() 
    df = pd.read_csv('data.csv')

    dates = np.array(df['Date'], dtype=np.datetime64)
    source = ColumnDataSource(data=dict(date=dates, close=df['Channel1']))

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
    return send_file("bokeh_plot.png", mimetype='image/png')
    # export_svgs(p, filename = "bokeh_plot.svg")
    # return send_file("bokeh_plot.svg", mimetype='image/svg+xml')
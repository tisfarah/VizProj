import os

import pandas as pd
import numpy as np
import sqlite3

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################


# database_path = "NYC_Health_Ratings.sqlite"
# engine = create_engine(f'sqlite:///{database_path}')

# ['NYC_Health_Ratings',
#  'Restaurant_Geo_Info',
#  'Violations_by_Borough',
#  'Violations_by_Cuisine',
#  'Violations_by_Restaurant']



@app.route("/")
def welcome():
    """List all available api routes."""
    return ("Available Routes:/api/v1.0/location<br>\n/api/v1.0/id<br>\n/api/v1.0/user_smart/<input_column>")

@app.route("/api/v1.0/user_smart/<input_column>")
def mycolumn(input_column):
    conn = sqlite3.connect("NYC_Health_Ratings.sqlite")
    cur = conn.cursor()
    cur.execute("SELECT * from Restaurant_Geo_Info")
    rows = cur.fetchall()
    column_list = []
    for row in rows:
        column_list.append(row[0])

    columndata = dict()
    columndata["column name"] = input_column
    columndata["result"] = column_list
    return jsonify(columndata)


@app.route("/api/v1.0/Locations")
def mylocations():
    conn = sqlite3.connect("NYC_Health_Ratings.sqlite")

    cur = conn.cursor()
    cur.execute("SELECT lat, long from Restaurant_Geo_Info")
    rows = cur.fetchall()
    lat_list = []
    # long_list = []
    for row in rows:
        lat_list.append(row[0])
        # long_list.append(row[1])

    return jsonify(lat_list)
    # return jsonify(long_list)

# @app.route("/api/v1.0/location")
# def location():
#     conn = sqlite3.connect("NYC_Health_Ratings.sqlite")
#     cur = conn.cursor()
#     cur.execute("SELECT * from Violations_by_Cuisine")
#     rows = cur.fetchall()
#     location_list = []
#     for row in rows:
#         location_list.append(row[0])

#     return jsonify(location_list)

if __name__ == '__main__':

    app.run(debug=True)

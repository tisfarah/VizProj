# importing the database that we'll need to create our visualization

import os
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)



#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/Group_Project_NYC.sqlite"
db = SQLAlchemy(app)


# Designing the new database into a new database model that will will hold all our values
Base = automap_base()

# reflect the tables

Base.prepare(db.engine, reflect=True)

# once the table have been reflected, we need to save into a table
Food_NYC = Base.classes.NYC_Restaurants
Violations_NYC = Base.classes.Nyc_Restaurants_violations


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/names")

def names():
    all_restaurants= db.seesion.query(CAMIS).statement
    area_violations=pd.read_sql_query(all_restaurants,db.session.bind)

    #let's return the list of all DBA

    return jsonify(list(area_violations)[3:])

@app.route("/NYC_Restaurants/<CAMIS>")
def Food_NYC(CAMIS):
  
    sel = [
        Food_NYC.CAMIS,
        Food_NYC.DBA,
        Food_NYC.BORO,
        Food_NYC.INSPECTIONDATE,
        Food_NYC.GRADE,
        Food_NYC.SCORE,
        
    ]

Info_Restaurants = db.session.query(*sel).filter(Food_NYC.CAMIS == CAMIS).all()

if __name__ == "__main__":
    app.run()

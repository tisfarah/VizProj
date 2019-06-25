import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
app = Flask(__name__)


#################################################
# Database Setup
#################################################
dbfile = os.path.join('data/NYC_Restarants.db')
engine = create_engine(f"sqlite:///{dbfile}")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
NYC_Restaurants = Base.classes.NYC_Restaurants


# Create our session (link) from Python to the DB
session = Session(engine)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template('index.html')


@app.route('/names')
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = session.query(NYC_Restaurants).statement
    df = pd.read_sql_query(stmt, session.bind)
    # df.set_index('otu_id', inplace=True)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns))
@app.route('/camis')
def otu():
    """Return a list of OTU descriptions."""
    results = session.query(NYC_Restaurants.CAMIS).all()

    # Use numpy ravel to extract list of tuples into a list of OTU descriptions
    CAMIS_list = list(np.ravel(results))
    return jsonify(CAMIS_list)


  


if __name__ == "__main__":
    app.run(debug=True)

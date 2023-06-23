from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, text
from flask_cors import CORS
import json
from bson import json_util

app = Flask(__name__)
CORS(app)

# Create the SQLAlchemy engine
engine = create_engine('postgresql://dmsrzjin:HaCccW5jzQtSrHEp_0qYSwboRSJ_vtPd@mahmud.db.elephantsql.com/dmsrzjin')


@app.route('/')
def welcome():
    """List all available api routes."""
    return (
        f"Welcome to Climate Change Dashboard <br/>"
        f"You have access to the following information<br/>"
        f"--------------------------------------------<br/>"
        f"Visuals: /api/v1.0/charts<br/>"
        f"-----------------------<br/>"
        f"CO2 Emissions:  /api/v1.0/co2_emissions<br/>"
        f"-----------------------<br/>"
        f"Temperatures Observed: /api/v1.0/Temperature<br/>"
        f"-----------------------<br/>"
        f"Min, Average, Max Temperature since a given date (YYYY-MM-DD): /api/v1.0/start <br/>"
        f"------------------------------------------------------------------------------------<br/>"
        f"Min, Average, Max Temperature for given dates (YYYY-MM-DD): /api/v1.0/start/end <br/>"
        f"--------------------------------------------------------------------------------<br/>"
   )

# Create a route to display the climate data
@app.route('/api//chartsv1.0')
def display_climate_data():
    # Execute a SQL query using the engine
    with engine.connect() as connection:
    
        return render_template('index.html')
    
# Create a route to display temperature grouped per year in json format
@app.route('/api/v1.0/temperature')
def temperature_chart():
    # Execute a SQL query using the engine
    with engine.connect() as connection:
        query = text("SELECT year, avg(temperature) as temperature FROM climate_data GROUP BY year ORDER BY year ASC")
        result = connection.execute(query).fetchall()
        # Fetch all rows and convert them to a list of dictionaries
        data = []
        for row in result:
            data.append(dict(row._asdict()))
        
        return data

# Create a route to display co2 emissions grouped per year in json format     
@app.route('/co2')
def co2_emissions_chart():
    # Execute a SQL query using the engine
    with engine.connect() as connection:
        query = text("SELECT year, avg(co2_emissions) as co2_emissions FROM climate_data GROUP BY year ORDER BY year ASC")
        result = connection.execute(query).fetchall()
        # Fetch all rows and convert them to a list of dictionaries
        data = []
        for row in result:
            data.append(dict(row._asdict()))
        
        return data
  

if __name__ == '__main__':
    app.run(debug=True)

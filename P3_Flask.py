from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, text
from flask_cors import CORS
import json
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)

# Create the SQLAlchemy engine
engine = create_engine('postgresql://postgres:MissPost$7@localhost:5432/P3_Climate_change')

# Create a route to display the climate data
@app.route('/')
def display_climate_data():
    # Execute a SQL query using the engine
    with engine.connect() as connection:
               
        return render_template('index.html')
    

@app.route('/temperature')
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

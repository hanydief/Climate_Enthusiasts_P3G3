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
        query = text("SELECT year, temperature FROM climate_data")
        result = connection.execute(query)
        
    #     # Fetch all rows and convert them to a list of dictionaries
    #     # data = [dict(row) for row in result]
    # data = []
    # for row in result:
    #    data.append(dict(row))

    return render_template('index.html')
    # return jsonify({"hello":"hello"})

@app.route('/chart')
def chart_one():
    # Execute a SQL query using the engine
    with engine.connect() as connection:
        query = text("SELECT year, avg(temperature) as temperature FROM climate_data GROUP BY year ORDER BY year ASC")
        query1 = text("SELECT year, avg(co2_emmision) as co2_emmision FROM climate_data GROUP BY year ORDER BY year ASC")
        result = connection.execute(query).fetchall()
        result1 = connection.execute(query1).fetchall()
        
        # result_co2 = connection.execute("SELECT year, avg(co2_emmision) as co2_emmision FROM climate_data GROUP BY year ORDER BY year ASC")
        # Fetch all rows and convert them to a list of dictionaries
        # data = []
        # for row in result:
        #     data.append(dict(row.items()))
        
        return dumps(result,default=str)

        # for row in result:
        #     data.append(dict(row))
        # results = [tuple(row) for row in data]
        # # for row in result_co2:
        # #     data.append(dict(row))
        
        # return json.dumps(results)
        # # return data

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine
import json

app = Flask(__name__)

# Database Connection SERVER
engine = create_engine('postgresql://dmsrzjin:HaCccW5jzQtSrHEp_0qYSwboRSJ_vtPd@mahmud.db.elephantsql.com/dmsrzjin')
# engine = create_engine('postgresql://dmsrzjin:HaCccW5jzQtSrHEp_0qYSwboRSJ_vtPd@mahmud.db.elephantsql.com/dmsrzjin')


# Create the SQLAlchemy engine LOCAL
# engine = create_engine('postgresql://dmsrzjin:HaCccW5jzQtSrHEp_0qYSwboRSJ_vtPd@mahmud.db.elephantsql.com/dmsrzjin')


# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/co2_emissions')
def get_co2_emissions():
    # Query CO2 emissions data from the database
    query = "SELECT * FROM co2_emissions;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    result = [{'country': row[0], 'year': row[1], 'emissions': row[2]} for row in data]

    # Return the data as JSON
    return jsonify(result)

@app.route('/temperature')
def get_temperature():
    # Query temperature data from the database
    query = "SELECT * FROM temp_mo_1901_2021;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    result = [{'country': row[0], 'month': row[1], 'year': row[2], 'temperature': row[3]} for row in data]

    # Return the data as JSON
    return jsonify(result)

@app.route('/co2_emissions/compare')
def compare_co2_emissions():
    # Query CO2 emissions data per country from the database
    query = "SELECT entity, year, SUM(emissions) as total_emissions\
            FROM co2_emissions\
            WHERE year BETWEEN 2000 AND 2021\
            GROUP BY entity, year\
            ORDER BY total_emissions, year;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    result = [{'country': row[0], 'total_emissions': row[1]} for row in data]

    # Return the data as JSON
    return jsonify(result)

@app.route('/temperature/average_temperature')
def average_temp():
    # Query -- average temperature per year
    query = "SELECT year, country, \
        (jan_temp + feb_temp + mar_temp + apr_temp + may_temp + jun_temp + jul_temp + aug_temp + sep_temp + oct_temp + nov_temp + dec_temp) / 12 AS avg_temperature\
        FROM temp_mo_1901_2021\
        GROUP BY country, year,\
              jan_temp, feb_temp, mar_temp, apr_temp, may_temp, jun_temp, jul_temp, aug_temp, sep_temp, oct_temp, nov_temp, dec_temp\
        ORDER BY Year, country;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    result = [{'Year': row[0], 'Country': row[1], 'avg_temperature':row[2]} for row in data]

    # Return the data as JSON
    return jsonify(result)

@app.route('/temperature/season')
def average_season_temp():
    # Query -- average temperature per season per year
    query = "SELECT year, country,\
                    (apr_temp + may_temp + jun_temp)/3 as spring_temp,\
                    (jul_temp + aug_temp + sep_temp)/3 AS summer_temp,\
                    (oct_temp + nov_temp + dec_temp)/3 AS fall_temp,\
                    (jan_temp + feb_temp + mar_temp)/3 AS winter_temp\
            FROM temp_mo_1901_2021\
            GROUP BY country, year, jan_temp, feb_temp, mar_temp, apr_temp, may_temp, jun_temp, jul_temp, aug_temp, sep_temp, oct_temp, nov_temp, dec_temp\
            ORDER BY Year, country;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    result = [{'Year': row[0], 'Country': row[1], 'avg_spring':row[2], 'avg_summer':row[3], 'avg_fall':row[4], 'avg_winter':row[5]} for row in data]

    # Return the data as JSON
    return jsonify(result)

@app.route('/temperature/temperature_co2')
def temperature_co2():
    # Query -- average temperature per season per year
    query = "SELECT temp_mo_1901_2021.year, temp_mo_1901_2021.country, co2_emissions.emissions,\
		            (jan_temp + feb_temp + mar_temp + apr_temp + may_temp + jun_temp + jul_temp + aug_temp + sep_temp + oct_temp + nov_temp + dec_temp) / 12 AS avg_temperature\
            FROM temp_mo_1901_2021, co2_emissions\
            WHERE co2_emissions.entity = temp_mo_1901_2021.country\
            GROUP BY country, co2_emissions.emissions,\
                    temp_mo_1901_2021.year, jan_temp, feb_temp, mar_temp, apr_temp, may_temp, jun_temp, jul_temp, aug_temp, sep_temp, oct_temp, nov_temp, dec_temp\
            ORDER BY Year, temp_mo_1901_2021.country;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    result = [{'Year': row[0], 'Country': row[1], 'co2_emissions':row[2], 'avg_temperature':row[3]} for row in data]

    # Return the data as JSON
    return jsonify(result)

# route to include the GeoJSON data for the Leaflet map
@app.route('/map')
def get_map_data():
    # Query data for the map from the database
    query = "SELECT country, latitude, longitude FROM countries;"
    data = engine.execute(query)

    # Convert the data to a GeoJSON format
    features = []
    for row in data:
        feature = {
            "type": "Feature",
            "properties": {
                "country": row[0]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [row[2], row[1]]
            }
        }
        features.append(feature)

    geojson_data = {
        "type": "FeatureCollection",
        "features": features
    }

    # Return the GeoJSON data as JSON
    return json.dumps(geojson_data)

# route to retrieve the data for the Plotly chart:
@app.route('/temperature/plotly')
def get_temperature_plotly():
    # Query temperature data from the database
    query = "SELECT year, country, \
        (jan_temp + feb_temp + mar_temp + apr_temp + may_temp + jun_temp + jul_temp + aug_temp + sep_temp + oct_temp + nov_temp + dec_temp) / 12 AS avg_temperature\
        FROM temp_mo_1901_2021\
        WHERE year > 1999\
        GROUP BY country, year,\
              jan_temp, feb_temp, mar_temp, apr_temp, may_temp, jun_temp, jul_temp, aug_temp, sep_temp, oct_temp, nov_temp, dec_temp\
        ORDER BY country, Year ASC;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    result = [{'Year': row[0], 'Country': row[1], 'Temperature': row[2]} for row in data]

    # Return the data as JSON
    return jsonify(result)

@app.route('/Heat')
def heat():
    # Query temperature data from the database
    query = "SELECT country, \
        (jan_temp + feb_temp + mar_temp + apr_temp + may_temp + jun_temp + jul_temp + aug_temp + sep_temp + oct_temp + nov_temp + dec_temp) / 12 AS avg_temperature\
        FROM temp_mo_1901_2021\
        WHERE year = 1999\
        GROUP BY country,\
              jan_temp, feb_temp, mar_temp, apr_temp, may_temp, jun_temp, jul_temp, aug_temp, sep_temp, oct_temp, nov_temp, dec_temp\
        ORDER BY country ASC;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    result = [{'Country': row[0], 'Temperature': row[1] } for row in data]

    # Return the data as JSON 
    return jsonify(result)

@app.route('/temp_anomaly_race')
def get_temp_anomaly():
    # Query temperature data from the database 		lo_bound
    query = "SELECT * FROM wb_temp_anomaly;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    # result = [{'region': row[0], 'year': row[1], 'avg_temp_anomaly': row[2], 'up_bound': row[3], 'lo_bound': row[4]} for row in data]
    result = [['avg_temp_anomaly', 'up_bound', 'lo_bound', 'country', 'year']] + [[row[2], row[3], row[4],row[0], row[1]] for row in data]


    # Return the data as JSON
    return result

@app.route('/favicon.ico')
def favicon():
    return '', 204


if __name__ == '__main__':
    app.run(debug=True)


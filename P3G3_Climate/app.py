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
    c_query = 'SELECT country, avg(jan_temp) as jan_temp FROM temp_mo_1901_2021 GROUP BY country;'
    c_data = engine.execute(c_query)
    country_result = [row[0] for row in c_data]
    country_result.sort()
    
    y_query = 'SELECT year, avg(jan_temp) as jan_temp FROM temp_mo_1901_2021 GROUP BY year ORDER BY year;'
    y_data = engine.execute(y_query)
    year_result = [row[0] for row in y_data]
    
    result = [country_result,year_result]
    return render_template('index.html', data = result )

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
    query = "SELECT co2_emissions.entity AS country, co2_emissions.year, co2_emissions.emissions,\
                    (temp_mo_1901_2021.jan_temp + temp_mo_1901_2021.feb_temp + temp_mo_1901_2021.mar_temp + temp_mo_1901_2021.apr_temp + temp_mo_1901_2021.may_temp + temp_mo_1901_2021.jun_temp + temp_mo_1901_2021.jul_temp + temp_mo_1901_2021.aug_temp + temp_mo_1901_2021.sep_temp + temp_mo_1901_2021.oct_temp + temp_mo_1901_2021.nov_temp + temp_mo_1901_2021.dec_temp) / 12 AS avg_temperature\
            FROM co2_emissions\
            JOIN temp_mo_1901_2021 ON co2_emissions.entity = temp_mo_1901_2021.country AND co2_emissions.year = temp_mo_1901_2021.year\
            ORDER BY co2_emissions.entity, co2_emissions.year;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    # result = [{'Year': row[0], 'Country': row[1], 'co2_emissions':round(row[2],2), 'avg_temperature':round(row[3],2)} for row in data]
    # result = [['co2_emissions', 'avg_temperature', 'country', 'year'] + [[round(row[2],0), round(row[3],2), row[0], row[1]] for row in data]]
    result = [['co2_emissions', 'avg_temperature', 'avg_temperature', 'country', 'year']] + [[round((row[2]/100000),0), round(row[3],2), row[3],row[0], row[1]] for row in data]


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

@app.route('/Heat/<newYear>')
def heat(newYear):
    # Query temperature data from the database

    query = f"SELECT country, \
        (jan_temp + feb_temp + mar_temp + apr_temp + may_temp + jun_temp + jul_temp + aug_temp + sep_temp + oct_temp + nov_temp + dec_temp) / 12 AS avg_temperature\
        FROM temp_mo_1901_2021\
        WHERE year = {newYear}\
        GROUP BY country,\
              jan_temp, feb_temp, mar_temp, apr_temp, may_temp, jun_temp, jul_temp, aug_temp, sep_temp, oct_temp, nov_temp, dec_temp\
        ORDER BY country ASC;"
    data = engine.execute(query)
    
    # Convert the data to a dictionary format
    result = [{'Country': row[0], 'Temperature': round(row[1],2) } for row in data]

    # Return the data as JSON 
    return jsonify(result)

@app.route('/temp_anomaly/')
def get_temp_anomaly():
    # Query temperature data from the database 
    query = "SELECT * FROM wb_temp_anomaly WHERE year > 1920;"
    data = engine.execute(query)

    # Convert the data to a dictionary format
    # result = [{'region': row[0], 'year': row[1], 'avg_temp_anomaly': row[2], 'up_bound': row[3], 'lo_bound': row[4]} for row in data]
    # result = [['avg_temp_anomaly', 'up_bound', 'lo_bound', 'country', 'year']] + [[row[2], row[3], row[4],row[0], row[1]] for row in data]

    result = [{'year':row[1],'country':row[0],'avg_temp_anomaly':round(row[2],2), 'up_bound': round(row[3],2), 'lo_bound': round(row[4],2)} for row in data]
    
    # Return the data as JSON
    return result

@app.route('/favicon.ico')
def favicon():
    return '', 204


if __name__ == '__main__':
    app.run(debug=True)


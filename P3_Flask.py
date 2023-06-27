
import os
import plotly
from flask import Flask, jsonify, render_template, send_from_directory
from sqlalchemy import create_engine, text
# from flask_cors import CORS
import json
from bson.json_util import dumps

app = Flask(__name__)

# CORS(app)

# Create the SQLAlchemy engine 
#*******************************************************************************************************#
#* (2 options local or cloud elephant SQL                                                              *#
#* but on cloud if internet speed is not good some charts might not plot                               *#
#* on local have to build your database, notepad is available, & change the password)                  *#
#*******************************************************************************************************#
# local engine PgAdmin Postgresql:
# engine = create_engine('postgresql://postgres:Temo1632009$@localhost:5432/P3-Climate_Data')
# cloud engine elephant SQL Postgresql:
engine = create_engine('postgresql://dmsrzjin:HaCccW5jzQtSrHEp_0qYSwboRSJ_vtPd@mahmud.db.elephantsql.com/dmsrzjin')

@app.route('/favion.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path,'static'),'favicon.ico',mimetype='image/vnd.microsoft.icon')


# Create a route to display the climate data
@app.route('/')
def display_climate_data():
    # Execute a SQL query using the engine
    with engine.connect() as connection:

            
        return render_template('indexh.html')
    
    return (
        f"Welcome to Climate App Home API!<br/>"
        f"********************************<br/>"
    )

# Create a route to display the temp data
@app.route('/temp')
def temp_chart():
    # Execute a SQL query using the engine
    with engine.connect() as connection:
        query=text("SELECT year, country, avg(temperature) as temperature FROM climate_data GROUP BY year, country ORDER BY temperature DESC LIMIT 10")
        result = connection.execute(query).fetchall()
        temp_data = []
        for row in result:
            temp_data.append(dict(row._asdict()))
        
        return jsonify(temp_data)
    

# Create a route to display the co2 data    

               
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

        query = text("SELECT year, country, avg(co2_emissions) as co2_emissions FROM climate_data GROUP BY year, country ORDER BY co2_emissions DESC LIMIT 10")
        result = connection.execute(query).fetchall()
        # Fetch all rows and convert them to a list of dictionaries
        co2_data = []
        for row in result:
            co2_data.append(dict(row._asdict()))
        
        return jsonify(co2_data)
    

# Create a route to display the humidity data
@app.route('/humidity')
def humidity_chart():
    # Execute a SQL query using the engine
    with engine.connect() as connection:
        query = text("SELECT year, country, avg(humidity) as humidity FROM climate_data GROUP BY year, country ORDER BY humidity DESC LIMIT 10")
        result = connection.execute(query).fetchall()
        # Fetch all rows and convert them to a list of dictionaries
        humidity_data = []
        for row in result:
            humidity_data.append(dict(row._asdict()))
        
        return jsonify(humidity_data)


# Create a route to display the sea level data
@app.route('/sealevel')
def sealevel_chart():
    # Execute a SQL query using the engine
    with engine.connect() as connection:
        query = text("SELECT year, country, avg(sea_level_rise) as sea_level_rise FROM climate_data GROUP BY year, country ORDER BY sea_level_rise DESC LIMIT 10")
        result = connection.execute(query).fetchall()
        # Fetch all rows and convert them to a list of dictionaries
        sealevel_data = []
        for row in result:
            sealevel_data.append(dict(row._asdict()))
        
        return jsonify(sealevel_data)


# Create a route to display the Race Bar Temperatures data
@app.route('/temperatures')
def get_temperatures():
    # Retrieve the temperature data for each year
    # Replace this with your actual temperature data retrieval logic

    with engine.connect() as connection:
        query=text("""SELECT avg(temperature) AS temperature, country, year
                FROM climate_data
                GROUP BY year, country 
                HAVING country IN ('Finland','France','Germany','Iceland','Norway','Poland','Russia','United Kingdom')
                ORDER BY year
                """)

        # query=text("SELECT year, country, avg(temperature) as temperature FROM climate_data GROUP BY year, country ORDER BY year, country, temperature DESC ")
        result = connection.execute(query).fetchall()
        temperatures = []
        for row in result:
            temperatures.append(dict(row._asdict()))
    keys = ['temperature', 'country','year']
    main_list = []
    main_list.append(keys)
    for piece in temperatures:
        temp = []
        temp.append(round(piece["temperature"],2))
        temp.append(piece["country"])
        temp.append(piece["year"])

        main_list.append(temp)

    return jsonify(main_list)

# Create a route to display the Race Bar CO2_Emissions data
@app.route('/racebarco')
def get_racebarco2():
    # Retrieve the co2 emissions data for each year
    # Replace this with your actual co2 emissions data retrieval logic

    with engine.connect() as connection:
        query=text("""SELECT avg(co2_emissions) AS co2_emissions, country, year
            FROM climate_data
            GROUP BY year, country
            ORDER BY year, co2_emissions, country""")

    # query=text("SELECT year, country, avg(co2_emissions) as co2_emissions FROM climate_data GROUP BY year, country ORDER BY year, country, co2_emissions DESC ")
        result = connection.execute(query).fetchall()
        racebarco2 = []
        for row in result:
            racebarco2.append(dict(row._asdict()))
    keys = ['co2_emissions', 'country','year']
    main_list = []
    main_list.append(keys)
    for piece in racebarco2:
        rbco2 = []
        rbco2.append(round(piece["co2_emissions"],2))
        rbco2.append(piece["country"])
        rbco2.append(piece["year"])

        main_list.append(rbco2)

    return jsonify(main_list)

# Create a route to display the Plotly Map CO2_Emissions data
@app.route('/pltmapco')
def get_pltmapco2():
    # Retrieve the co2 emissions data for each year
    # Replace this with your actual co2 emissions data retrieval logic

    with engine.connect() as connection:
        query=text("""SELECT avg(co2_emissions) AS co2_emissions, country
            FROM climate_data
            GROUP BY country
            """)

    # query=text("SELECT year, country, avg(co2_emissions) as co2_emissions FROM climate_data GROUP BY year, country ORDER BY year, country, co2_emissions DESC ")
        result = connection.execute(query).fetchall()
        pltmapco2 = []
        for row in result:
            pltmapco2.append(dict(row._asdict()))


    return jsonify(pltmapco2)



    


if __name__ == '__main__':
    app.run(debug=True)
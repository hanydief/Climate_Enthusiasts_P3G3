-- Drop the table if it exists
DROP TABLE IF EXISTS climate_data;

-- Create the table
CREATE TABLE climate_data (
    Year numeric,
	Month numeric,
	country varchar(255),
	Location varchar(255),
    Temperature numeric,
    CO2_Emissions numeric,
    Sea_Level_Rise numeric,
    Precipitation numeric,
    Humidity numeric,
    Wind_Speed numeric
);

--IMPORT CSV DATA FROM RESOURCES FOLDER

SELECT *
FROM climate_data;

-- ALTER TABLE climate_data ADD COLUMN year INTEGER;
-- UPDATE climate_data 
-- SET year = EXTRACT(YEAR FROM date);
-- SET month = EXTRACT(MONTH FROM date);

-- SELECT *, 
-- EXTRACT(YEAR FROM date) AS year FROM climate_data;
--EXTRACT(MONTH FROM date) AS month FROM climate_data;

-- SELECT year, country -- min(temperature), max(temperature)
-- FROM climate_data
-- ORDER BY year, country;

----------********   temperature  ********------------
-- Querry to get min & max temp per year for each country and location
SELECT year, country, location, min(temperature), max(temperature), avg(temperature)
FROM climate_data
GROUP BY country, location, year
ORDER BY year, country, location;

-- Querry to get min & max temp per year for each country and location
SELECT year, country, min(temperature), max(temperature), avg(temperature)
FROM climate_data
GROUP BY year, country
ORDER BY year, country;

-- Querry to get min & max temp per year for each country and location
SELECT year, country, location,temperature
FROM climate_data
GROUP BY country, location, year, temperature
ORDER BY temperature;

----------********   CO2_Emissions  ********------------
-- Querry to get min & max CO2_Emissions per year for each country and location
SELECT year, country, location, min(CO2_Emissions), max(CO2_Emissions), avg(CO2_Emissions)
FROM climate_data
GROUP BY country, location, year
ORDER BY year, country, location;

-- Querry to get min & max CO2_Emissions per year for each country and location
SELECT year, country, min(CO2_Emissions), max(CO2_Emissions), avg(CO2_Emissions)
FROM climate_data
GROUP BY year, country
ORDER BY year, country;

-- Querry to get min & max CO2_Emissions per year for each country and location
SELECT year, country, location,CO2_Emissions
FROM climate_data
GROUP BY country, location, year, CO2_Emissions
ORDER BY CO2_Emissions;


----------********   Sea_Level_Rise  ********------------
-- Querry to get min & max Sea_Level_Rise per year for each country and location
SELECT year, country, location, min(Sea_Level_Rise), max(Sea_Level_Rise), avg(Sea_Level_Rise)
FROM climate_data
GROUP BY country, location, year
ORDER BY year, country, location;

-- Querry to get min & max Sea_Level_Rise per year for each country and location
SELECT year, country, min(Sea_Level_Rise), max(Sea_Level_Rise), avg(Sea_Level_Rise)
FROM climate_data
GROUP BY year, country
ORDER BY year, country;

-- Querry to get min & max Sea_Level_Rise per year for each country and location
SELECT year, country, location,Sea_Level_Rise
FROM climate_data
GROUP BY country, location, year, Sea_Level_Rise
ORDER BY Sea_Level_Rise;


----------********   Precipitation  ********------------
-- Querry to get min & max Precipitation per year for each country and location
SELECT year, country, location, min(Precipitation), max(Precipitation), avg(Precipitation)
FROM climate_data
GROUP BY country, location, year
ORDER BY year, country, location;

-- Querry to get min & max Precipitation per year for each country and location
SELECT year, country, min(Precipitation), max(Precipitation), avg(Precipitation)
FROM climate_data
GROUP BY year, country
ORDER BY year, country;

-- Querry to get min & max Precipitation per year for each country and location
SELECT year, country, location,Precipitation
FROM climate_data
GROUP BY country, location, year, Precipitation
ORDER BY Precipitation;

----------********   Humidity  ********------------
-- Querry to get min & max Humidity per year for each country and location
SELECT year, country, location, min(Humidity), max(Humidity), avg(Humidity)
FROM climate_data
GROUP BY country, location, year
ORDER BY year, country, location;

-- Querry to get min & max Humidity per year for each country and location
SELECT year, country, min(Humidity), max(Humidity), avg(Humidity)
FROM climate_data
GROUP BY year, country
ORDER BY year, country;

-- Querry to get min & max Humidity per year for each country and location
SELECT year, country, location,Humidity
FROM climate_data
GROUP BY country, location, year, Humidity
ORDER BY Humidity;

----------********   Wind_Speed  ********------------
-- Querry to get min & max Wind_Speed per year for each country and location
SELECT year, country, location, min(Wind_Speed), max(Wind_Speed), avg(Wind_Speed)
FROM climate_data
GROUP BY country, location, year
ORDER BY year, country, location;

-- Querry to get min & max Wind_Speed per year for each country and location
SELECT year, country, min(Wind_Speed), max(Wind_Speed), avg(Wind_Speed)
FROM climate_data
GROUP BY year, country
ORDER BY year, country;

-- Querry to get min & max Wind_Speed per year for each country and location
SELECT year, country, location,Wind_Speed
FROM climate_data
GROUP BY country, location, year, Wind_Speed
ORDER BY Wind_Speed;

----------********   COMBINED  ********------------
-- Querry to get combined each country, min, max, avg of each factor
SELECT year, country, 
	min(temperature) AS min_temp, 
	max(temperature) AS max_temp, 
	avg(temperature) AS avg_temp, 
	min(CO2_Emissions) AS min_CO2, 
	max(CO2_Emissions) AS max_CO2, 
	avg(CO2_Emissions) AS avg_CO2, 
	min(Sea_Level_Rise) AS min_Sea_L_Rise, 
	max(Sea_Level_Rise) AS max_Sea_L_Rise, 
	avg(Sea_Level_Rise) AS avg_Sea_L_Rise, 
	min(Precipitation) AS min_Precipitation, 
	max(Precipitation) AS max_Precipitation, 
	avg(Precipitation) AS avg_Precipitation, 
	min(Humidity) AS min_Humidity, 
	max(Humidity) AS max_Humidity, 
	avg(Humidity) AS avg_Humidity, 
	min(Wind_Speed) AS min_Wind_Speed, 
	max(Wind_Speed) AS max_Wind_Speed, 
	avg(Wind_Speed) AS avg_Wind_Speed
FROM climate_data
GROUP BY country, year
ORDER BY year, country;


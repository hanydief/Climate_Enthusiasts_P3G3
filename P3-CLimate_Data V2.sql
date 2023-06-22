
-- Drop the table if it exists
DROP TABLE IF EXISTS climate_data;

-- Create the table
CREATE TABLE climate_data (
    date timestamp,
    location varchar(255),
    country varchar(255),
    temperature numeric,
    co2_emissions numeric,
    sea_level_rise numeric,
    precipitation numeric,
    humidity numeric,
    wind_speed numeric
);

SELECT *
FROM climate_data;

COPY climate_data 
	( date, location, country, temperature, co2_emissions, sea_level_rise, precipitation, humidity, ind_speed)
	
FROM C:\Users\INBA6454\Documents\My SugarSync\Continuous Improvement\UCB Data Analytics Bootcamp\Lecture\Project3\Resources\cleaned_Climate_data.csv'

DELIMITER ','
CSV HEADER;


ALTER TABLE climate_data ADD COLUMN year INTEGER;
UPDATE climate_data SET year = EXTRACT(YEAR FROM date);

SELECT *, EXTRACT(YEAR FROM date) AS year FROM climate_data;

SELECT year, country -- min(temperature), max(temperature)
FROM climate_data
ORDER BY year, country;

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
SELECT temperature, year, country, location
FROM climate_data
GROUP BY country, location, year, temperature
ORDER BY temperature;



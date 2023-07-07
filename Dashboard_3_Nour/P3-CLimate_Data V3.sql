-- Drop the table if it exists
DROP TABLE IF EXISTS co2_emissions;

-- Create the table
CREATE TABLE co2_emissions (
    entity varchar,
    code varchar,
    year numeric,
    emissions numeric
   );

SELECT *
FROM co2_emissions;

COPY co2_emissions (
	entity,
	code,
	year,
	emissions
	)
FROM 'C:\Users\INBA6454\Documents\My SugarSync\Continuous Improvement\UCB Data Analytics Bootcamp\Lecture\Project3\Resources\FinalCLeanData\co2_emissions.csv'
DELIMITER ','
CSV HEADER;

-- Drop the table if it exists
DROP TABLE IF EXISTS wb_temp_anomaly;

-- Create the table
CREATE TABLE wb_temp_anomaly (
    entity varchar,
    year numeric,
    avg_temp_anomaly numeric,
	up_bound numeric,
	lo_bound numeric
   );

SELECT *
FROM wb_temp_anomaly;


-- Drop the table if it exists
DROP TABLE IF EXISTS temp_mo_1901_2021;

-- Create the table

CREATE TABLE temp_mo_1901_2021 (
    Country varchar,
	code varchar,
    year numeric,
	Jan	varchar, Feb varchar,	Mar varchar,	Apr varchar, 
	May varchar,	Jun varchar,	Jul varchar,	Aug varchar,	Sep varchar,
	Oct	varchar, Nov varchar,	Dec varchar
    );

SELECT *
FROM temp_mo_1901_2021;

--  Tables created with wrong type
ALTER TABLE temp_mo_1901_2021
ALTER COLUMN Jan TYPE numeric USING Jan::numeric,
ALTER COLUMN Feb TYPE numeric USING Feb::numeric;
-- repeat for each month Mar to dec

-- Renamed COlumns to be more meaningful
ALTER TABLE temp_mo_1901_2021
RENAME COLUMN jan TO Jan_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Feb TO Feb_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Mar TO Mar_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Apr TO Apr_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN May TO May_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Jun TO Jun_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Jul TO Jul_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Aug TO Aug_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Sep TO Sep_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Oct TO Oct_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Nov TO Nov_temp;

ALTER TABLE temp_mo_1901_2021
RENAME COLUMN Dec TO Dec_temp;

-- One more table for lat lon per country 
-- Drop the table if it exists
DROP TABLE IF EXISTS country_lat_lon;

-- Create the table
CREATE TABLE country_lat_lon(
    country varchar,
    country_code varchar,
    latitude numeric,
	longitude numeric
   );

SELECT *
FROM country_lat_lon;

COPY country_lat_lon(
    country,
    country_code,
    latitude,
    longitude
	)
FROM 'C:\Users\INBA6454\Documents\My SugarSync\Continuous Improvement\UCB Data Analytics Bootcamp\Lecture\Project3\Resources\FinalCLeanData\country_lat_lon.csv'
DELIMITER ','
CSV HEADER;


-- Querries 

-- average temperature per year
SELECT year, country,
    (jan_temp + feb_temp + mar_temp + apr_temp + may_temp + jun_temp + jul_temp + aug_temp + sep_temp + oct_temp + nov_temp + dec_temp) / 12 AS avg_temperature
FROM temp_mo_1901_2021
GROUP BY country, year, jan_temp, feb_temp, mar_temp, apr_temp, may_temp, jun_temp, jul_temp, aug_temp, sep_temp, oct_temp, nov_temp, dec_temp
ORDER BY Year, country;

-- Comparing CO2 emissions over years
SELECT entity, year, SUM(emissions) as total_emissions
FROM co2_emissions
WHERE year BETWEEN 2000 AND 2021
GROUP BY entity, year
ORDER BY total_emissions, year;

--  Average temperature season per year
SELECT year, country,
   (apr_temp + may_temp + jun_temp)/3 as spring_temp,
   (jul_temp + aug_temp + sep_temp)/3 AS summer_temp,
   (oct_temp + nov_temp + dec_temp)/3 AS fall_temp,
   (jan_temp + feb_temp + mar_temp)/3 AS winter_temp
FROM temp_mo_1901_2021
GROUP BY country, year, jan_temp, feb_temp, mar_temp, apr_temp, may_temp, jun_temp, jul_temp, aug_temp, sep_temp, oct_temp, nov_temp, dec_temp
ORDER BY Year, country;

-- Temp & CO2 emissions per country per year
SELECT co2_emissions.entity AS country, co2_emissions.year, co2_emissions.emissions,\
                    (temp_mo_1901_2021.jan_temp + temp_mo_1901_2021.feb_temp + temp_mo_1901_2021.mar_temp + temp_mo_1901_2021.apr_temp + temp_mo_1901_2021.may_temp + temp_mo_1901_2021.jun_temp + temp_mo_1901_2021.jul_temp + temp_mo_1901_2021.aug_temp + temp_mo_1901_2021.sep_temp + temp_mo_1901_2021.oct_temp + temp_mo_1901_2021.nov_temp + temp_mo_1901_2021.dec_temp) / 12 AS avg_temperature\
            FROM co2_emissions\
            JOIN temp_mo_1901_2021 ON co2_emissions.entity = temp_mo_1901_2021.country AND co2_emissions.year = temp_mo_1901_2021.year\
            ORDER BY co2_emissions.entity, co2_emissions.year;

-- Average temp per country and per year
SELECT year, country,
        (jan_temp + feb_temp + mar_temp + apr_temp + may_temp + jun_temp + jul_temp + aug_temp + sep_temp + oct_temp + nov_temp + dec_temp) / 12 AS avg_temperature
FROM temp_mo_1901_2021
WHERE year > 1999
GROUP BY country, year,
              jan_temp, feb_temp, mar_temp, apr_temp, may_temp, jun_temp, jul_temp, aug_temp, sep_temp, oct_temp, nov_temp, dec_temp
ORDER BY country, Year ASC;


-- Drop the table if it exists
DROP TABLE IF EXISTS climate_data;

-- Create the table
CREATE TABLE climate_data (
	date timestamp,
    Year numeric,
	Location varchar(255),
	country varchar(255),
	Temperature numeric,
    CO2_Emissions numeric,
    Sea_Level_Rise numeric,
    Precipitation numeric,
    Humidity numeric,
    Wind_Speed numeric
);


SELECT *
FROM climate_data;

--IMPORT CSV DATA FROM RESOURCES FOLDER
SELECT *
FROM climate_data;


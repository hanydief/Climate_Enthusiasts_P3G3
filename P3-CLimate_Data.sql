
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

SELECT country, avg(temperature)
FROM climate_data
GROUP BY country
ORDER BY country

SELECT *
FROM climate_data

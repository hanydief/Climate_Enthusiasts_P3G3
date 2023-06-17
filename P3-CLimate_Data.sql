-- Drop the table if it exists
DROP TABLE IF EXISTS climate_data;

-- Create the table
CREATE TABLE climate_data (
    Year INT,
    Month INT,
    Country VARCHAR(255),
    Location VARCHAR(255),
    Temperature NUMERIC,
    CO2_Emissions NUMERIC,
    Sea_Level_Rise NUMERIC,
    Precipitation NUMERIC,
    Humidity NUMERIC,
    Wind_Speed NUMERIC
);

-- Insert data into the table
COPY climate_data (Year, Month, Country, Location, Temperature, CO2_Emissions, Sea_Level_Rise, Precipitation, Humidity, Wind_Speed)
FROM 'path_to_csv_file.csv' DELIMITER ',' CSV HEADER;

-- Retrieve average temperature by country
SELECT Country, AVG(Temperature)
FROM climate_data
GROUP BY Country
ORDER BY Country;

-- Retrieve all data from the climate_data table
SELECT *
FROM climate_data;


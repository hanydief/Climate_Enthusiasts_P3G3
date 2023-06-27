# Climate_Enthusiasts_P3G3
Climate change is a critical issue facing our planet, and understanding climate data is essential for monitoring and analyzing its impact. In this project, we explore a Flask web application that connects to a PostgreSQL database containing climate data. The application provides interactive visualizations to help us gain insights into temperature, CO2 emissions, humidity, and sea level rise.

## Data sources
The climate change data used in this dashboard is sourced from [insert data sources].

## Contributors
- Nour Balhaj -- (@nourbalhaj)
- Hany Dief -- (@hanydief)
- Beethoven Sabar -- (@bsabar)
- Alejandro Gutierrez -- (@alejfxguti)
- Raymond Darrough -- (@raymonddarrough)
- João Fortunato -- (@joaopedrofortunato)

## Google Slides Presentation Link
https://docs.google.com/presentation/d/1iqDcU6FGP9ofsdUX73cQ_7jqZDb_SMMXgz0V0N04E2w/edit?usp=sharing

## Technology Used

- Python
- Flask
- SQLAlchemy
- Plotly
- D3.js
- ECharts

## Installation

1. Clone the repository to your local machine.
2. Make sure you have PostgreSQL installed and running.
3. Create a new PostgreSQL database using pgAdmin and name it `P3-Climate_Data`.
  - Set up the database by running the necessary SQL scripts (not provided in this repository).
  - You can use either a local PostgreSQL instance or a cloud-based instance (ElephantSQL). The connection details for both options are included in the code, and you can choose which engine to use by commenting/uncommenting the respective lines.
4. Install the required Python packages by running pip install for packages mentioned above.
5. Run the Flask application using `python P3_Flask.py`.
6. Open your web browser and navigate to http://localhost:5000 to access the Climate App.

## Functionality

The flask application provides the following routes to visualize climate data:

- `/temp`: Displays a bar chart of the average temperature by country and year.
- `/co2`: Displays a bar chart of the average CO2 emissions by country and year.
- `/humidity`: Displays a bar chart of the average humidity by country and year.
- `/sealevel`: Displays a bar chart of the average sea level rise by country and year.
- `/temperatures`: Displays a race bar chart of the average temperature by country and year.
- `/racebarco`: Displays a race bar chart of the average CO2 emissions by country and year.
- `/pltmapco`: Displays a map chart of the average CO2 emissions by country.

## Project Structure
`P3_Flask.py:` The main Flask application file that handles routing and serves the webpages. \
`templates/index.html:` The HTML template file that contains the structure and layout of the dashboard. \
`static/css/styles.css:` The CSS file that defines the styles for the dashboard. \
`static/js/app.js:` The JavaScript file that contains the logic for data processing and chart rendering. \
`Resources/:` Directory containing the climate change dataset files. \
`P3_CLimate_Data_V3.sql:` SQL to create Climate Change Database. \
`P3_data_cleaningV3.ipynb:` Pandas jupyter notebook data prep and initial visualizations. \
`Outputs_CSV_&_Json/:` Directory containing outputs of jupyter notebook data prep and initial visualization. 

## License

This project is licensed under the [MIT License](LICENSE).

## Notes
- The JavaScript code in the static folder handles the rendering of charts using the retrieved data from the Flask routes. You can find the JavaScript code in the static folder of this repository.
- Please make sure to modify the database connection details in the Flask app code before running the application.
- Feel free to explore the different routes to visualize the climate data in various chart formats.

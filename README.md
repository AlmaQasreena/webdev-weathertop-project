
# mi-weathertop_starter

This is a 4th Semester Web Technology Project in my course Artificial Intelligence & Data Science (B. Sc.). The task is as follows:
- Develope a Node.js web application which allows user to manage a list of weather stations and display the current and pass weather measurement data using Model-View-Controller.
- Integrate the page to display data from a database using PostgreSQL.
- Visualize the data from OpenWeather API to be displayed on the website.

## Developed With
- Node.js (JavaScript)
- Express
- Handlebars (hbs)
- PostgreSQL (database)
- dotenv (.env configuration)
- Developed locally using WebStorm (any editor such as VS Code also works)

## Requirements to Run
To run this project on your laptop, you need:
- Node.js (LTS recommended) + npm
- A running PostgreSQL instance and a valid database connection string
- A `.env` file in the project root (see `.env.example`) containing at least:
  - `PORT`
  - `DB_CON_STRING`
  - `API_KEY`

After installing the requirements, install dependencies with `npm install` and start the app with `npm start`, then open `http://localhost:<PORT>`.



# Movies RESTful API

## Setup

This node app runs on port 4000, run `npm i` on the root level of the project and then `node server.js`

Check that it is running: http://localhost:4000/api/ and you should get the message: you are ready to use the api

## Endpoints

- A list of movies
  `GET /api/movies`

  - The user should be able to search the movies by title
    `GET /api/movies/title/:searchString`
    :searchString must be valid characters A-z and 0-9

  * The user should be able to filter the movies by rating
    `GET /api/movies/attribute?type=:type&:type=:value`

    i.e. /api/movies/attribute?type=rating&rating=PG

  - The user should be able to filter the movies by category
    `GET /api/movies/attribute?type=:type&:type=:value`

    i.e. /api/movies/attribute?type=category&category=Horror

- Movie details for each movie
  `GET /api/movies/:film_id`

* A list of actors in a movie
  `GET /api/movies/:film_id/actors`

# Project Specifications and Considerations

- What design patterns did you use?

This project uses Node, Sequelize ORM, ES6 async and await and an MVC design structure. CRUD operations (the requirements only specified read) are used through the project.I used SOLID design patterns as much as possible, there is always a trade off between reusability and loose coupling as in the movie by attributes endpoint.

- How would you test your application?

To test this application I would use standardized basedata, and unit testing with Mocha.

- What ways could you structure the code to make it easy to understand and maintain?

When structuring code I try to use obvious naming conventions, predictable patterns, and small functions. Also it si important to have clear and explict error messages.

- What other considerations and tradeoffs did you make when building the application?

I would say the biggest tradeoffs, are when to use a join and when to preform second query. I know that for small applications like this joins are not as time consuming. There are some changed to the schema that may have made things easier, category has 1 to 1 realationsip with film, so having a separate table to connect them seemed extraneous.

Also what data to send back to the user, in some cases the joins left data with object with one item in it, where we wouldn't need a whole object for one attribute. That could be refined before export.

# Notes:

I left the configuration in the repo because this is a quick example, but normally I would set up a configuration file for the database name, username and password, not to be committed. Additionally, I have written simple / basic error messages, probably not with as specific codes (401, 400, 500) as they could for time saving.
As well as I would normally write a function for more detailed custom error handling that could be sent to the console or a log.

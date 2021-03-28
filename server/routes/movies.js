const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//get all movie data
router.get("/all", async (req, res) => {
  try {
    const getAllMoviesDataQry = `WITH movie_genre_agg AS
    (
      SELECT movie_id, string_agg(name::text, ',') AS genres FROM genre g
      LEFT JOIN movie_genre mg
      ON mg.genre_id = g.id
      GROUP BY movie_id
    )
    SELECT id, name, director, imdb_score, popularity, genres FROM movies m
    LEFT JOIN movie_genre_agg mga
    ON mga.movie_id = m.id
    ORDER BY name`;

    const allMoviesData = await pool.query(getAllMoviesDataQry);

    if (allMoviesData.rows.length > 0) {
      // console.log(allMoviesData.rows);
      return res.status(200).json(allMoviesData.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get all movie data matching the search keyword
router.get("/search", async (req, res) => {
  const { keyword } = req.query;
  try {
    const getMatchingMoviesDataQry = `WITH movie_genre_agg AS
    (
    SELECT movie_id, string_agg(name::text, ',') AS genres FROM genre g
    LEFT JOIN movie_genre mg
    ON mg.genre_id = g.id
    GROUP BY movie_id
    )
    SELECT id, name, director, imdb_score, popularity, genres FROM movies m
    LEFT JOIN movie_genre_agg mga
    ON mga.movie_id = m.id
    WHERE name ILIKE '%${keyword}%'
    OR director ILIKE '%${keyword}%'
    ORDER BY name`;

    const matchingMoviesData = await pool.query(getMatchingMoviesDataQry);
    // console.log(`Query => ${getMatchingMoviesDataQry}`);
    if (matchingMoviesData.rows.length > 0) {
      return res.status(200).json(matchingMoviesData.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get all movie data matching the sort by condition
router.get("/sortby", async (req, res) => {
  const { sortBy, order } = req.query;
  let columnName = "";
  let sortByClause = "";
  if (sortBy && order) {
    switch (sortBy) {
      case "101":
        columnName = "name";
        break;
      case "102":
        columnName = "imdb_score";
        break;
      case "103":
        columnName = "popularity";
        break;
      case "104":
        columnName = "director";
        break;
      default:
        columnName = "name";
        break;
    }

    sortByClause = `ORDER BY ${columnName} ${order}`;
  }
  try {
    const getMatchingMoviesDataQry = `WITH movie_genre_agg AS
    (
      SELECT movie_id, string_agg(name::text, ',') AS genres FROM genre g
      LEFT JOIN movie_genre mg
      ON mg.genre_id = g.id
      GROUP BY movie_id
    )
    SELECT id, name, director, imdb_score, popularity, genres FROM movies m
    LEFT JOIN movie_genre_agg mga
    ON mga.movie_id = m.id
    ${sortByClause}`;

    const matchingMoviesData = await pool.query(getMatchingMoviesDataQry);
    // console.log(`Query => ${getMatchingMoviesDataQry}`);
    if (matchingMoviesData.rows.length > 0) {
      return res.status(200).json(matchingMoviesData.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get all movie data grouped by Genre Data
router.get("/groupbygenre", async (req, res) => {
  const { genre } = req.query;
  try {
    if (genre) {
      const noOfGenre = genre.split(",").length;
      const getMoviesGroupedByGenreQry = `WITH movie_genre_groupby AS 
      ( 
        SELECT movie_id FROM movie_genre mg WHERE genre_id IN (${genre})
		    GROUP BY movie_id having count(*) = ${noOfGenre}
      ),
      movie_genre_agg AS
      (
        SELECT mgg.movie_id, string_agg(name::text, ',') AS genres FROM genre g
        INNER JOIN movie_genre mg
        ON mg.genre_id = g.id
		    INNER JOIN movie_genre_groupby mgg
        ON mg.movie_id = mgg.movie_id
        GROUP BY mgg.movie_id
      )
      SELECT id, name, director, imdb_score, popularity, genres FROM movies m
      INNER JOIN movie_genre_agg mga
      ON mga.movie_id = m.id
      ORDER BY name`;

      const groupByGenreMoviesData = await pool.query(
        getMoviesGroupedByGenreQry
      );
      //console.log(`Query => ${getMoviesGroupedByGenreQry}`);
      if (groupByGenreMoviesData.rows.length >= 0) {
        return res.status(200).json(groupByGenreMoviesData.rows);
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Create a new movie Data with new genre if not available
router.post("/new", async (req, res) => {
  try {
    let {
      assignTo,
      createdBy,
      dueDate,
      ticketDesc,
      ticketPriority,
      ticketTitle,
      ticketType,
    } = req.body;

    // // TODO: need to move to utility functions
    // // replaced apostrophe symbol ' with '', just to handle insert query in SQL
    // ticketTitle = ticketTitle.replace(/'/g, "''");
    // ticketDesc = ticketDesc.replace(/'/g, "''");

    // const ticketInsertQuery = `INSERT INTO tickets(
    //   ticket_title, ticket_desc, type_id, status_id, priority_id, created_by, assigned_to, due_date, created_on)
    //   VALUES ('${ticketTitle}', '${ticketDesc}', ${ticketType}, 101, ${ticketPriority}, ${createdBy}, ${assignTo}, '${dueDate}', current_timestamp) RETURNING *`;

    // const newticketData = await pool.query(ticketInsertQuery);

    // if (newticketData.rows.length === 1) {
    //   return res.status(200).send("Ticket created sucessfully");
    // }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).send("Server error");
  }
});

module.exports = router;

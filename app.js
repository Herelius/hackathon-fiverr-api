const express = require('express');
// const Joi = require('joi');
const { PORT } = require('./env');
const connection = require('./db-config');

const app = express();
const router = express.Router();


app.use(express.json());

// server setup
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// process setup : improves error reporting
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', JSON.stringify(error), error.stack);
  process.exit(1);
});

/* ********************** connection to database ********************** */
/*
connection.connect((err) => {
  if (err) {
    console.error('error connecting to db');
  } else {
    console.log('connected to db');
  }
});
*/


// routes 

// create new mentor
/*
router.post('/mentor', (req, res) => {
  const { title, genre, picture, artist } = req.body;
  const { error: validationErrors } = Joi.object({
    title: Joi.string().max(50).required(),
    genre: Joi.string().max(20).required(),
    picture: Joi.string().uri().required(),
    artist: Joi.string().max(50).required(),
  }).validate({ title, genre, picture, artist }, { abortEarly: false });

  if (validationErrors) {
    res.status(422).send({ validationErrors });
  } else {
    app
      .promise()
      .query(
        'INSERT INTO albums (title, genre, picture, artist) VALUES (?, ?, ?, ?)',
        [title, genre, picture, artist]
      )
      .then(([result]) => {
        res.send({ id: result.insertId, title, genre, picture, artist });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});
*/

// retrieve the full list of newbies /////////////////////////////////////////

router.get('/newbies', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM newbies')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// retrieve the skill list of one newbie

router.get('/newbies/:id/skills', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM skills_set WHERE newbie_id = ? ')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// retrieve one newbie by its ID /////////////////////////////

router.get('/newbies/:id', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM newbies WHERE id = ? ')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// retrieve the full list of projects //////////////////////////////////////

router.get('/projects', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM projects')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// retrieve one projet by its ID /////////////////////////////

router.get('/projects/:id', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM projects WHERE id = ? ')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// retrieve one project by its skills list /////////////////////////////

router.get('/projects/:id/skills_set/:id/', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM projects WHERE id = ? AND skills_set_id = ? ')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// retrieve one newbie by its skills list /////////////////////////////

router.get('/newbies/:id/skills_set/:id/', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM newbies WHERE id = ? AND skills_set_id = ? ')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = server;

/**
 * A basic example of express session authentication
 *
 * What we did:
 * - Making a session token/cookie with express middleware
 * - GET: APP
 * - GET: Register
 * - POST: Register
 * - GET: Login
 * - POST: Login
 * - POST: Logout
 */

/**
 * Import needed libraries
 */

const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const dotenv = require('dotenv');
const Users = new (require('./lib/Users'))('./users.json');
const PORT = 3000;
const SESSION_NAME = "pikachu";

/**
 * General Setup
 */

// gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
dotenv.config();

// create an Express application
const app = express();

// use some middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // needed for POST/GET/... in forms

// the file store options
fileStoreOptions = {
  // store extra information
  // more information: https://www.npmjs.com/package/session-file-store
}

// set the session middleware
// more information: https://www.npmjs.com/package/express-session
app.use(session({
  name: SESSION_NAME,
  secret: process.env.SECRET_SALT,
  resave: false,
  saveUninitialized: true,
  store: new FileStore(fileStoreOptions),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}))

/**
 * MIDDLE WARE
 */

const auth = (req, res, next) => {
  if(!(req.session && req.session.userId)) res.redirect('/login'); //next(new Error('Unauthorized!'))
  else next();
}

/**
 * ENDPOINTS:
 * - register (GET&POST)
 * - login (GET&POST)
 * - logout (GET)
 * - root (GET)
 */

// --------
// REGISTER
// --------

app.get('/register', (req, res) => {
  // sending out the form
  res.send(`<h1>Register a new user</h1>
            <form method="POST" action="/register">
              <div class="form-element">
                <label for="username">Username</label>
                <input type="text" name="username" placeholder="username" required/>
              </div>
              <div class="form-element">
                <label for="password">Password</label>
                <input type="password" placeholder="password" name="password" required />
              </div>
              <input type="submit" />
            </form>`);
});

app.post('/register', (req, res) => {
  try
  {
    Users.addUser(req.body.username, req.body.password);
    if(req.session.userId) res.redirect('/login');
  }
  catch(e)
  {
    console.log(e.message);
    res.sendStatus(400);
  }
});

// --------
// LOGIN
// --------

app.get('/login', (req, res) => {
  if(req.session && req.session.userId) res.redirect('/')
  else {
    res.send(`<h1>Login a new user</h1>
            <form method="POST" action="/login">
              <div class="form-element">
                <label for="username">Username</label>
                <input type="text" name="username" placeholder="username" required/>
              </div>
              <div class="form-element">
                <label for="password">Password</label>
                <input type="password" placeholder="password" name="password" required />
              </div>
              <input type="submit" value="Login"/>
            </form>`);
  }
});

app.post('/login', (req, res) => {
  try
  {
    if(req.session) req.session.userId = Users.login(req.body.username, req.body.password);
    res.redirect('/');
  }
  catch(e)
  {
    console.log(e.message);
    res.sendStatus(400);
  }
});

// --------
// LOGOUT
// --------

app.get('/logout', auth, (req, res) => {
  if(req.session) {
    req.session.destroy((err) => {
    if (err) reject(err)
      res.clearCookie(SESSION_NAME);
      res.redirect('/login');
    });
  }
});

// --------
// HOMEPAGE
// --------

app.get('/', auth, (req, res) => {
  res.send(`<h1>Current logged in user ID is ${req.session.userId}</h1>
            <form action="/logout" method="get">
              <input type="submit" value="Logout">
            </form>`);
})

/**
 * SERVER
 */

// server listens on http://localhost:3000
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
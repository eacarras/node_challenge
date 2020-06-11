const session = require('cookie-session');
const express = require('express');
const morgan = require('morgan');
const app = express();

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 );

// Settings
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

if (process.env.PRODUCTION) {
  app.use(session({
    name: 'session',
    cookie: {
      keys: ['key1', 'key2'],
      secure: true,
      httpOnly: true,
      expires: expiryDate,
    }
  }));
}

// Routes
app.use(require("./routes/empleados"));

// Start server
app.listen(app.get('port'), () => {
  console.log("Servidor corriendo en puerto 3000");
});

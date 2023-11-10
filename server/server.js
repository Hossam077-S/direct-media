const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const App = require('../src/App'); // Adjust the path to your App component

const app = express();

// Serve static files from the 'build' directory
app.use(express.static('build'));


app.get('*', (req, res) => {
    const context = {};
    const reactApp = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );
  res.send(`
    <html>
      <head>
        <title>Your App</title>
      </head>
      <body>
        <div id="root">${reactApp}</div>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

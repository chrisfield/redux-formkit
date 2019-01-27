const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const app = next({ dev });
const handleRequestWithNext = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.post('/exampleF', (req, res) => {
    app.render(req, res, '/index')
  });

  server.get('/exampleF', (req, res) => {
    return app.render(req, res, '/index');
  });

  server.get('*', (req, res) => {
    return handleRequestWithNext(req, res);
  });  

  server.listen(PORT, (err) => {
    if (err){
      throw err;
    }
    console.log(`Server listening on port ${PORT}`)
  })

}).catch(ex => {
  console.error(ex.stack)
  process.exit(1);
});

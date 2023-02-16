const express = require('express');
const apiRouter = require('./routes/apiRoutes').default
const path = require('path')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

app.use('/api', apiRouter);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

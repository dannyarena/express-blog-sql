const express = require ('express');
const app = express();
app.use(express.json());  // Middleware per il parsing del JSON
const postsRouter = require('./routers/posts');
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');
const db = require('./data/db');

app.use('/posts', postsRouter);

app.get('/', (req, res) => {
    res.send('Benvenuto nel blog!');
});

app.use(notFound);
app.use(errorsHandler);

const port = 3000;

app.listen(port, () => {
    console.log(`App attiva su http://localhost:${port}`);
});
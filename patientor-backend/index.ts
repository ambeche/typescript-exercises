import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3003;

app.get('/ping', (_req, res) => {
  console.log('you\'ve been pinged');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});
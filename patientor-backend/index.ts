import express from 'express';
import cors from 'cors';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('you\'ve been pinged');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});
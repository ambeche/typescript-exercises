import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log("you've been pinged");
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});

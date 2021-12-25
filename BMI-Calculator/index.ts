import express, { ErrorRequestHandler } from 'express';
import * as bmiCalculator from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bmiParams: any = req.query;
    
    const { height, weight } = bmiCalculator.validateBmiQuery(
      bmiParams.height,
      bmiParams.weight
    );
    const bmi = bmiCalculator.calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi,
    });
  } catch (error) {
    next(error);
  }
});

const validationErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next
) => {
  if (error.name === 'BmiValidationError') {
    res.status(400).json({ error: error.message });
    return;
  }
  next(error);
};

app.use(validationErrorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App listening for request on port ${PORT}`);
});

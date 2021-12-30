import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  const diagnoses = diagnoseService.getDiagnoses();
  res.json(diagnoses);
});

export default diagnoseRouter;

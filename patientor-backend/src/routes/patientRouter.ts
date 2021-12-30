import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  const patients = patientService.getPatients();
  res.json(patients);
});

export default patientRouter;

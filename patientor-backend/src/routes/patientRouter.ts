import { PatientInput, Patient } from './../types';
import express from 'express';
import patientService from '../services/patientService';
import {validatePatientInputs} from '../utils';

const patientRouter = express.Router();

patientRouter
  .route('/')
  .get((_req, res) => {
    const patients = patientService.getPatients();
    res.json(patients);
  })
  .post((req, res, next) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newPatient: PatientInput = validatePatientInputs(req.body);
      const addedPatient: Patient = patientService.addPatient(newPatient);
      res.json(addedPatient);
    } catch (error: unknown) {
      next(error);
    }
  });

export default patientRouter;

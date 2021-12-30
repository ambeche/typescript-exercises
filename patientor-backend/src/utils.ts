import {ErrorRequestHandler} from 'express';
import { PatientFieldsForValidation, PatientInput, Gender } from './types';

const validationError = (
  secondaryMsg = '', primaryMsg = 'Incorrect or missing field'
): Error => {
  const message = secondaryMsg
    ? `${primaryMsg}, '${secondaryMsg}' !`
    : primaryMsg;
  const validationError = new Error(message);
  validationError.name = 'ValidationError';

  return validationError;
};

const isString = (arg: unknown): arg is string => {
  return typeof arg === 'string' || arg instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return ( Object.values(Gender).includes(gender));
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) throw validationError(`gender: ${gender}`);
  return gender;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !Date.parse(date)) throw validationError(`${date}`);
  return date;
};

const parseString = (stringValue: unknown): string => {
  if (!stringValue || !isString(stringValue)) throw validationError(`${stringValue}`);
  return stringValue;
};

const validatePatientInputs = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: PatientFieldsForValidation): PatientInput => {
  const patientInputs = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    ssn: parseString(ssn),
  };

  return patientInputs;
};

const validationErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (
    error.name === 'ValidationError' && error instanceof Error
  ) {
    
    res.status(400).json({ error: error.message });
    return;
  }
  console.error(error);
  next(error);
};

export { validatePatientInputs, validationErrorHandler };

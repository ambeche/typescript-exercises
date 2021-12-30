import { patients } from '../../data/dataEntries';
import { Patient, NonSensitivePatient, PatientInput } from './../types';
import { v4 as uuid4 } from 'uuid';

// excludes sensitive data, ssn from patient record (type Patient) before returns (type NonSensitivePatient)
const getPatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addPatient = (patientInput: PatientInput): Patient => {
  const id: string = uuid4();
  const newPatient: Patient = {
    id,
    ...patientInput,
  };

  patients.push(newPatient);

  return newPatient;
};

export default { getPatients, addPatient };

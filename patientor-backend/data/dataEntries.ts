import { Patient } from './../src/types';
import { Diagnose } from '../src/types';
import diagnosesAsJson from '../data/diagnoses.json';
import patientsAsJson from '../data/patients.json';

const diagnoses: Diagnose[] = [...diagnosesAsJson];

const patients: Patient[] = patientsAsJson.map(patient => {
  const castedToPatientType = patient as Patient;
  castedToPatientType.id = patient.id;

  return castedToPatientType;
});

export { diagnoses, patients };

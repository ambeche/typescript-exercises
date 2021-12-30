import { patients } from '../../data/dataEntries';
import { NonSensitivePatient } from './../types';

// excludes sensitive data, ssn from patient record (type Patient) before returns (type NonSensitivePatient)
const getPatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export default { getPatients };

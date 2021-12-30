import { diagnoses } from '../../data/dataEntries';
import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => diagnoses;

export default { getDiagnoses };

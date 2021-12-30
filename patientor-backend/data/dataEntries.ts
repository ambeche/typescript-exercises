import { Diagnose } from '../src/types';
import diagnosesAsJson from '../data/diagnoses.json';

const diagnoses: Diagnose[] = [...diagnosesAsJson];

export { diagnoses };

import { throwValidationError } from './utils';

interface BmiInputs {
  height: number;   
  weight: number;
}

// parses arguments from the CLI
const validateCliInputsForBmiCalculator = (args: Array<string>): BmiInputs => {
  if (args.length < 4)
    throwValidationError('Not enough arguments to perform this operation!');

  if (args.length > 4)
    throwValidationError('Too many arguments, operation not allowed!');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3])))
    throwValidationError('Only numbers are allowed for this operation!');

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

const validateBmiQuery = (height: string, weight: string): BmiInputs => {
  if (!height || !weight)
    throwValidationError('parameters missing', 'BmiValidationError');

  if (isNaN(Number(height)) || isNaN(Number(weight)))
    throwValidationError('malformatted parameters', 'BmiValidationError');

  return {
    height: Number(height),
    weight: Number(weight),
  };
};

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0)
    throwValidationError(
      'Height and weight must be positive numbers greater than zero',
      'BmiValidationError'
    );
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const bmiToOneDecimal = Number(bmi.toFixed(1));

  switch (true) {
    case bmiToOneDecimal < 18.5:
      return 'Underweight (More weight needed for a healthy state)';
    case bmiToOneDecimal >= 18.5 && bmiToOneDecimal <= 24.9:
      return 'Normal (Healthy weight)';
    case bmiToOneDecimal >= 25 && bmiToOneDecimal <= 29.9:
      return 'Overweight (Not healthy, watch your diet!)';
    case bmiToOneDecimal >= 30:
      return 'Obese (Not healthy, incorporate exercise in your daily activities, eat healthy!)';
    default:
      throw new Error('Invalid parameters, operation not allowed!');
  }
};

try {
  const { height, weight } = validateCliInputsForBmiCalculator(process.argv);
  console.log(calculateBmi(height, weight));
  //console.log(calculateBmi(180, 70));
} catch (e: unknown) {
  if (e instanceof Error) console.log('BMI Error:', e.message);
}

export { calculateBmi, validateBmiQuery };

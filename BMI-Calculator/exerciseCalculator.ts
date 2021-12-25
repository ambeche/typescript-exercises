import { throwValidationError } from './utils';

interface ExerciseStatistics {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

interface ExerciseInputs {
  target: number;
  dailyHours: Array<number>;
}

const ERROR_NAME = 'CalculateExerciseValidationError';

const verifyIsNotNaN = (
  originalTarget: string,
  exercises: Array<string>,
  message = 'Invalid input, only numbers are allowed!',
  name = 'Error'
): ExerciseInputs => {
  if (isNaN(Number(originalTarget))) throwValidationError(message, name);
  const target = Number(originalTarget);

  const dailyHours = exercises.map((hours) => {
    if (isNaN(Number(hours))) throwValidationError(message, name);
    return Number(hours);
  });

  return { target, dailyHours };
};

const validateExerciseRequest = (
  // validates all requests from the /exercise endpoint
  originalTarget: string,
  exercises: Array<string>
): ExerciseInputs => {
  if ((!originalTarget && Number(originalTarget) !== 0) || !exercises?.length)
    throwValidationError('parameters missing', ERROR_NAME);

  return verifyIsNotNaN(
    originalTarget,
    exercises,
    'malformatted parameters',
    ERROR_NAME
  );
};

const validateCliInputs = (args: Array<string>): ExerciseInputs => {
  if (args.length < 4)
    throw new Error('Not enough arguments to perform this operation!');
  const exercises = args.slice(3);
  const target = args[2];

  return verifyIsNotNaN(target, exercises);
};

const calculateExercises = (
  target: number,
  exercises: Array<number>
): ExerciseStatistics => {
  const totalHours = exercises.reduce((acc, currentValue): number => {
    if (currentValue < 0 || isNaN(currentValue))
      throwValidationError(
        'Exercise hours must be numbers, nagative values not allowed!'
      );
    return acc + currentValue;
  }, 0);

  const periodLength = exercises.length;
  const trainingDays: number = exercises.filter(
    (hours: number) => hours !== 0
  ).length;

  if (periodLength === 0)
    throwValidationError('Operation not allowed, zero hours provided!');
  const average = totalHours / periodLength;

  // returns a value between 0 and 1; 1 => average hours equals original target (success, target met)
  if (target <= 0)
    throwValidationError('Target value must be a number greater than zero', ERROR_NAME);
  const successRatio = average / target;
  console.log('success', successRatio);

  const ratePerformance = (): Rating => {
    switch (true) {
      case successRatio >= 1:
        return {
          rating: 3,
          ratingDescription:
            successRatio === 1
              ? 'Excellent, keep up the good job!'
              : "Fantastic! You've out-performed yourself, great job!",
        };
      case successRatio >= 0.5 && successRatio < 1:
        return { rating: 2, ratingDescription: 'Good, you could be better!' };
      case successRatio < 0.5:
        return { rating: 1, ratingDescription: 'Bad, courage, you can do it!' };
      default:
        throw new Error('Not Applicable!');
    }
  };

  const { rating, ratingDescription } = ratePerformance();

  return {
    periodLength,
    trainingDays,
    success: successRatio >= 1,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyHours } = validateCliInputs(process.argv);
  console.log(calculateExercises(target, dailyHours));
  //console.log(calculateExercises(2, [3, 0, 2, 5, 0, 3, 1]));
} catch (e: unknown) {
  if (e instanceof Error) console.log('Error: ', e.message);
}

export { validateExerciseRequest, calculateExercises };

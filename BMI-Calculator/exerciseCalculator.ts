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

const validateCliInputs = (args: Array<string>): ExerciseInputs => {
  if (args.length < 4)
    throw new Error('Not enough arguments to perform this operation!');

  const setIsNaNError = () => {
    throw new Error('Invalid input, only numbers are allowed!');
  };

  if (isNaN(Number(args[2]))) setIsNaNError();
  const target = Number(args[2]);

  const dailyHours = args.slice(3).map((arg) => {
    if (isNaN(Number(arg))) setIsNaNError();
    return Number(arg);
  });
  console.log('dailyhours', dailyHours, target);

  return { target, dailyHours };
};

const calculateExercises = (
  target: number,
  exercises: Array<number>
): ExerciseStatistics => {
  const totalHours = exercises.reduce((acc, currentValue): number => {
    if (currentValue < 0 || isNaN(currentValue))
      throw new Error(
        'Exercise hours must be numbers, nagative values not allowed!'
      );
    return acc + currentValue;
  }, 0);

  const periodLength = exercises.length;
  const trainingDays: number = exercises.filter(
    (hours: number) => hours !== 0
  ).length;

  if (periodLength === 0)
    throw new Error('Operation not allowed, zero hours provided!');
  const average = totalHours / periodLength;

  // returns a value between 0 and 1; 1 => average hours equals original target (success, target met)
  const successRatio = average / target;

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
        return { rating: 1, ratingDescription: 'Bad, courage you can do it!' };
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

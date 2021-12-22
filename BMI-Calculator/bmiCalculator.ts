const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0)
    throw new Error(
      "Height and weight must be positive numbers greater than zero"
    );
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  switch (true) {
    case bmi < 18.5:
      return "Underweight (More weight needed for a healthy state)";
    case bmi >= 18.5 && bmi <= 24.9:
      return "Normal (Healthy weight)";
    case bmi >= 25 && bmi <= 29.9:
      return "Overweight (Not healthy, watch your diet!)";
    case bmi >= 30:
      return "Obese (Not healthy, incorporate exercise in your daily activities, eat healthy!)";
    default:
      throw new Error("Invalid parameters, operation not allowed!");
  }
};

try {
  console.log(calculateBmi(180, 70));
} catch (e: unknown) {
  if (e instanceof Error) console.log("BMI Error:", e.message);
}

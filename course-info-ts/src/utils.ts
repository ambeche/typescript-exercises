export const assertNever = (arg: never): never => {
  throw new Error(
    `unhandled type: ${JSON.stringify(arg)}`
  );
};
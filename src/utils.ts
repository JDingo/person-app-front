export const isString = (x: unknown): x is string => {
  return typeof x === "string";
};

export const isNumber = (x: unknown): x is string => {
  return (typeof x === "string" && !isNaN(parseInt(x))  );
};
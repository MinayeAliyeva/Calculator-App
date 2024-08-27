export const applyOperator = (values: number[], operator: string) => {
  if (operator === "√") {
    const a = values.pop()!;
    if (a < 0) {
      throw new Error("Cannot take the square root of a negative number");
    }
    values.push(Math.sqrt(a));
  } else if (operator === "^") {
    const exponent = values.pop()!;
    const base = values.pop()!;
    values.push(Math.pow(base, exponent));
  } else {
    const b = values.pop()!;
    const a = values.pop()!;
    const operations: { [key: string]: (a: number, b: number) => number } = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => {
        if (b === 0) {
          throw new Error("Cannot divide by zero");
        }
        return a / b;
      },
      "%": (a, b) => (a * b) / 100,
    };
    values.push(operations[operator](a, b));
  }
};

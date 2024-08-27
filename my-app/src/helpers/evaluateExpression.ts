export const evaluateExpression = (expression: string): number => {
  const operators: string[] = [];
  const values: number[] = [];
  let num = "";
  let isNegative = false;

  const precedence: { [key: string]: number } = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
    "^": 3,
    "√": 4,
  };

  const applyOperator = (values: number[], operator: string) => {
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

  const applyOperatorWithPrecedence = (minPrecedence: number) => {
    while (
      operators.length &&
      precedence[operators[operators.length - 1]] >= minPrecedence
    ) {
      applyOperator(values, operators.pop()!);
    }
  };

  const parseNumber = () => {
    if (num) {
      values.push(isNegative ? -parseFloat(num) : parseFloat(num));
      num = "";
      isNegative = false;
    }
  };

  const handleOperators = () => {
    while (operators.length) {
      applyOperator(values, operators.pop()!);
    }
  };

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if ("0123456789.".includes(char)) {
      num += char;
    } else {
      parseNumber();

      if (char === "-") {
        if (i === 0 || "+-*/%√(".includes(expression[i - 1])) {
          isNegative = true;
        } else {
          applyOperatorWithPrecedence(1);
          operators.push(char);
        }
      } else if ("*/".includes(char)) {
        applyOperatorWithPrecedence(2);
        operators.push(char);
      } else if ("+".includes(char)) {
        applyOperatorWithPrecedence(1);
        operators.push(char);
      } else if (char === "^") {
        applyOperatorWithPrecedence(3);
        operators.push(char);
      } else if (char === "(") {
        operators.push(char);
      } else if (char === ")") {
        while (operators[operators.length - 1] !== "(") {
          applyOperator(values, operators.pop()!);
        }
        operators.pop();
      } else if (char === "%") {
        operators.push(char);
      }
    }
  }

  parseNumber();
  handleOperators();

  const result = values.pop()!;
  if (isNaN(result) || !isFinite(result)) {
    throw new Error("Invalid result");
  }

  return Math.round(result * 1e10) / 1e10;
};

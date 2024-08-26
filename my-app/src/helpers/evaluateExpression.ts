import { Toperations, TOperators } from "../types/interface";

export const applyOperator = (values: number[], operator: string) => {
  const b = values.pop()!;
  const a = values.pop()!;

  const operations: Toperations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  values.push(operations[operator](a, b));
};

export const evaluateExpression = (expression: string) => {
  const operators: string[] = [];
  const values: number[] = [];
  let num = "";
  let isNegative = false;

  const precedence: TOperators = { "+": 1, "-": 1, "*": 2, "/": 2 };

  const applyOperatorWithPrecedence = (minPrecedence: number) => {
    while (
      operators.length &&
      precedence[operators[operators.length - 1]] >= minPrecedence
    ) {
      applyOperator(values, operators.pop()!);
    }
  };
  // 0 / -0
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if ("0123456789.".includes(char)) {
      num += char;
      if (values.length && num === "0") {
        return new Error();
      }
    } else {
      if (num) {
        values.push(isNegative ? -parseFloat(num) : parseFloat(num));
        num = "";
        isNegative = false;
      }
      if (char === "-") {
        if (i === 0 || "+-*/(".includes(expression[i - 1])) {
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
      } else if (char === "(") {
        operators.push(char);
      } else if (char === ")") {
        while (operators[operators.length - 1] !== "(") {
          applyOperator(values, operators.pop()!);
        }
        operators.pop();
      }
    }
  }

  if (num) {
    values.push(isNegative ? -parseFloat(num) : parseFloat(num));
  }

  applyOperatorWithPrecedence(1);

  return values.pop()!;
};

import { applyOperator } from "./applyOperator";

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
    //√25+6/2-3^2
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
        applyOperatorWithPrecedence(2);
        operators.push(char);
      } else if (char === "√") {
        if (i === 0 || "+-*/%(".includes(expression[i - 1])) {
          operators.push(char);
        } else {
          applyOperatorWithPrecedence(4);
          operators.push(char);
        }
      }
    }
  }

  parseNumber();
  handleOperators();

  if (values.length !== 1) {
    throw new Error("Invalid expression");
  }

  return values[0];
};

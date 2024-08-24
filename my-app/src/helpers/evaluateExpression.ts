import { IOperators } from "../types/interface";

export const applyOperator = (values: number[], operator: string) => {
  const b = values.pop();
  const a = values.pop();
  if (a === undefined || b === undefined) {
    throw new Error("Invalid expression");
  }
  switch (operator) {
    case "+":
      values.push(a + b);
      break;
    case "-":
      values.push(a - b);
      break;
    case "*":
      values.push(a * b);
      break;
    case "/":
      values.push(a / b);
      break;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
};

export const evaluateExpression = (expression: string) => {
  const operators: string[] = [];
  const values: number[] = [];
  let num = "";
  let isNegative = false;

  const getPrecedence = (op: string) => {
    const obj: IOperators = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    return obj?.[op];
  };

  const applyOperatorWithPrecedence = (minPrecedence: number) => {
    while (
      operators.length &&
      getPrecedence(operators[operators.length - 1]) >= minPrecedence
    ) {
      applyOperator(values, operators.pop()!);
    }
  };

  for (const char of expression) {
    if ("0123456789.".includes(char)) {
      num += char;
    } else {
      if (num) {
        if (isNegative) {
          values.push(-parseFloat(num));
        } else {
          values.push(parseFloat(num));
        }
        num = "";
        isNegative = false;
      }

      if (char === "-") {
        if (
          num === "" &&
          (operators.length === 0 ||
            "+-*/".includes(
              expression.charAt(values.length + operators.length - 1)
            ))
        ) {
          isNegative = true;
        } else {
          applyOperatorWithPrecedence(1);
          operators.push(char);
        }
      } else if ("*/".includes(char)) {
        applyOperatorWithPrecedence(2);
        operators.push(char);
      } else if ("+-".includes(char)) {
        applyOperatorWithPrecedence(1);
        operators.push(char);
      }
    }
  }
  if (num) {
    if (isNegative) {
      values.push(-parseFloat(num));
    } else {
      values.push(parseFloat(num));
    }
  }
  applyOperatorWithPrecedence(1);
  return values.pop()!;
};

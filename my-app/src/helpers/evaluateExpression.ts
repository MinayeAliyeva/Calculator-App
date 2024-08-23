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

    const getPrecedence = (op: string) => {
      interface IOperators {
        [key: string]: number;
      }
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
          values.push(parseFloat(num));
          num = "";
        }
        if (char === "(") {
          operators.push(char);
        } else if (char === ")") {
          while (operators.length && operators[operators.length - 1] !== "(") {
            applyOperatorWithPrecedence(1);
            applyOperator(values, operators.pop()!);
          }
          operators.pop(); // Remove '('
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
      values.push(parseFloat(num));
    }
    applyOperatorWithPrecedence(1);
    return values.pop()!;
  };
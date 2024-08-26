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
  };

  const applyOperator = (values: number[], operator: string) => {
    const b = values.pop()!;
    const a = values.pop()!;

    const operations: { [key: string]: (a: number, b: number) => number } = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => {
        if (b === 0) {
          throw new Error("Sıfıra bölme hatası");
        }
        return a / b;
      },
    };

    values.push(operations[operator](a, b));
  };

  const applyOperatorWithPrecedence = (minPrecedence: number) => {
    while (
      operators.length &&
      precedence[operators[operators.length - 1]] >= minPrecedence
    ) {
      applyOperator(values, operators.pop()!);
    }
  };

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if ("0123456789.".includes(char)) {
      num += char;
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

  const result = values.pop()!;
  if (isNaN(result) || !isFinite(result)) {
    throw new Error("Geçersiz sonuç");
  }
  return Math.round(result * 1e10) / 1e10; //1usdu10
};

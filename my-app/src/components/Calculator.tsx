import React, { useState } from "react";

const Calculator = () => {
  const [result, setResult] = useState("");
  const handleClick = (value: string): void => {
    setResult((prev) => prev + value);
  };
  console.log("result", result);
  const handleEqual = () => {
    const calcResult = calculate(result);
  };
  const calculate = (expression: any) => {
    console.log("13 expression", expression);

    const tokens = expression.match(/(\d+|\D)/g);
    /*
    ["1","+","2"]
    */
    const operations = {
      "+": (a: number, b: number) => a + b,
      "-": (a: number, b: number) => a - b,
      "*": (a: number, b: number) => a * b,
      "/": (a: number, b: number) => a / b,
    };
    let stack: any = [];
    let currOperator: any = null;
    tokens?.map((token: "+" | "-" | "*" | "/") => {
      if (operations[token]) {
        currOperator = operations[token];
        console.log("currendOperator", currOperator);
      } else {
        let value = token;
        console.log("value", value);

        if (stack.length && currOperator) {
          let operand1 = stack.pop();
          console.log("operand1", operand1);
          value = currOperator?(operand1:number, value);
        }
        stack.push(value);
      }
    });
  };
  return (
    <div className="calculator">
      <div className="result">{result}</div>
      <div className="buttons">
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button>%</button>
        <button>sqr</button>
        <button onClick={() => handleEqual()}>=</button>
      </div>
    </div>
  );
};

export default Calculator;

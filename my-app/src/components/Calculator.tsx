import React from "react";
import CalcBtn from "./Button";

const Calculator = () => {
    const handleClick=()=>{
        
    }
  return (
    <div className="calculator">
      <div className="result">Result</div>
      <div className="buttons">
        {[
          "1",
          "2",
          "3",
          "+",
          "4",
          "5",
          "6",
          "-",
          "7",
          "8",
          "9",
          "/",
          "0",
          ".",
          "%",
          "sqr",
          "=",
        ].map((btn: any) => (
          <CalcBtn onClick={()=>handleClick()} btn={btn} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;

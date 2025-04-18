import Nav from "../nav";
import { useState } from "react";
import { useMemo } from "react";
function CalculatorButton({ children, className, ...rest }) {
  return (
    <button
      className={
        "bg-gray-100 py-5 aspect-square rounded-3xl shadow-sm text-gray-600 hover:brightness-95 hover:cursor-pointer active:brightness-90 transition-all duration-100 text-3xl " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export default function Calc() {
  const [curVal, setCurVal] = useState("");
  const [prevVal, setPrevVal] = useState("");
  const [op, setOp] = useState("");

  function handleDecimalClick(i) {
    setCurVal((prev) => prev + i);
  }

  function handleClear() {
    setCurVal("");
    setPrevVal("");
    setOp("");
  }

  function handlePercent() {
    setCurVal((prev) => prev / 100);
  }
  function handleSqrt() {
    setCurVal((prev) => Math.sqrt(prev));
  }
  function handleOp(op) {
    setOp(op);
    setPrevVal(curVal);
    setCurVal("");
  }
  function handleEquals() {
    if (op === "÷") {
      setCurVal(parseFloat(prevVal) / parseFloat(curVal));
      setPrevVal("");
      setOp("");
    } else if (op === "×") {
      setCurVal(parseFloat(prevVal) * parseFloat(curVal));
      setPrevVal("");
      setOp("");
    } else if (op === "-") {
      setCurVal(parseFloat(prevVal) - parseFloat(curVal));
      setPrevVal("");
      setOp("");
    } else if (op === "+") {
      setCurVal(parseFloat(prevVal) + parseFloat(curVal));
      setPrevVal("");
      setOp("");
    }
  }
  function handleDisplay() {
    if (curVal.length === 0) {
      return "0";
    } else if (curVal === ".") {
      return "0.";
    } else if (curVal.length >= 22) {
      return "Hiba sok számjegy";
    } else {
      return curVal;
    }
  }

  return (
    <div>
      <Nav />
      <div className="w-full flex items-center justify-center relative overflow-clip mt-24">
        <div className="bg-white p-5 rounded-2xl w-1/4">
          <div className="bg-gray-100 text-black text-right text-4xl rounded-xl p-3 mb-6 shadow-sm">
            {handleDisplay()}
          </div>
          <div className="grid grid-cols-4 gap-5 text-black">
            <CalculatorButton
              className="text-red-400 bg-red-100 "
              onClick={handleClear}
            >
              C
            </CalculatorButton>
            <CalculatorButton onClick={handlePercent}>%</CalculatorButton>
            <CalculatorButton onClick={handleSqrt}>√</CalculatorButton>
            <CalculatorButton
              className="text-white bg-purple-600 "
              onClick={() => handleOp("÷")}
            >
              ÷
            </CalculatorButton>
            <CalculatorButton onClick={() => handleDecimalClick("1")}>
              1
            </CalculatorButton>
            <CalculatorButton onClick={() => handleDecimalClick("2")}>
              2
            </CalculatorButton>
            <CalculatorButton onClick={() => handleDecimalClick("3")}>
              3
            </CalculatorButton>
            <CalculatorButton
              className="text-white bg-purple-600 "
              onClick={() => handleOp("×")}
            >
              ×
            </CalculatorButton>
            <CalculatorButton onClick={() => handleDecimalClick("4")}>
              4
            </CalculatorButton>
            <CalculatorButton onClick={() => handleDecimalClick("5")}>
              5
            </CalculatorButton>
            <CalculatorButton onClick={() => handleDecimalClick("6")}>
              6
            </CalculatorButton>
            <CalculatorButton
              className="text-white bg-purple-600"
              onClick={() => handleOp("-")}
            >
              -
            </CalculatorButton>
            <CalculatorButton onClick={() => handleDecimalClick("7")}>
              7
            </CalculatorButton>
            <CalculatorButton onClick={() => handleDecimalClick("8")}>
              8
            </CalculatorButton>
            <CalculatorButton onClick={() => handleDecimalClick("9")}>
              9
            </CalculatorButton>
            <CalculatorButton
              className="text-white bg-purple-600 "
              onClick={() => handleOp("+")}
            >
              +
            </CalculatorButton>
            <button
              className="bg-gray-100 col-span-2 aspect-auto py-5 rounded-3xl shadow-sm text-gray-600 hover:brightness-95 hover:cursor-pointer active:brightness-90 transition-all duration-100 text-3xl"
              onClick={() => handleDecimalClick("0")}
            >
              0
            </button>
            <CalculatorButton onClick={() => handleDecimalClick(".")}>
              .
            </CalculatorButton>
            <CalculatorButton
              className="text-white bg-green-500 "
              onClick={handleEquals}
            >
              =
            </CalculatorButton>
          </div>
        </div>
      </div>
    </div>
  );
}

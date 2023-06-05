import React, { useReducer } from "react";
import "./Styles.css";
import DigitButton from "./Digitbutton";
import OperationButton from "./OperationButton";

export const Actions = {
  Add_Digit: "add digit",
  Choose_operation: "choose-operation",
  Clear: "clear",
  Delete_Digit: "delete-digit",
  Evaluate: "evaluate",
};

type ReducerProps = {
  type: any;
  payload?: any;
};

function reducer(state: any, { type, payload }: ReducerProps) {
  switch (type) {
    case Actions.Add_Digit:
      if (state.overwrite) {
        return {
          ...state,
          CurrentOperand: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "0" && state.CurrentOperand === "0") {
        return state;
      }

      if (payload.digit === "." && state.CurrentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        CurrentOperand: `${state.CurrentOperand || ""}${payload.digit}`,
      };

    case Actions.Clear:
      return {};

    case Actions.Choose_operation:
      if (state.CurrentOperand == null && state.PreviousOperand == null) {
        return state;
      }

      if (state.CurrentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.PreviousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          PreviousOperand: state.CurrentOperand,
          CurrentOperand: null,
        };
      }

      return {
        ...state,
        PreviousOperand: evaluate(state),
        operation: payload.operation,
        CurrentOperand: null,
      };
    case Actions.Delete_Digit:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          CurrentOperand: null,
        };
      }
      if (state.CurrentOperand == null) {
        return state;
      }
      if (state.CurrentOperand.length === 1) {
        return {
          ...state,
          CurrentOperand: null,
        };
      }
      return {
        ...state,
        CurrentOperand: state.CurrentOperand.slice(0, -1),
      };

    case Actions.Evaluate:
      if (
        state.operation == null ||
        state.CurrentOperand == null ||
        state.PreviousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        operation: null,
        CurrentOperand: evaluate(state),
      };
  }
}

type EvaluateProps = {
  CurrentOperand: string;
  PreviousOperand: string;
  operation: string;
};
function evaluate({
  CurrentOperand,
  PreviousOperand,
  operation,
}: EvaluateProps) {
  const prev = parseFloat(PreviousOperand);
  const current = parseFloat(CurrentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation: number;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      computation = prev;
    // you must write default because you will not be able to calculate computation.ToString below(example there can not be an empty box if you want somebody to take bananas from it)
  }
  return computation.toString();
}

const Integer_formatter = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand: any) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return Integer_formatter.format(integer);
  return `${Integer_formatter.format(integer)}.${decimal}`;
}

function App() {
  const [{ CurrentOperand, PreviousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-box">
      <div className="Result">
        <div className="Previous-operand">
          {formatOperand(PreviousOperand)} {operation}
        </div>
        <div className="Current-operand">{formatOperand(CurrentOperand)}</div>
      </div>

      <button
        className="Span-two-size"
        onClick={() =>
          dispatch({
            type: Actions.Clear,
          })
        }
      >
        AC
      </button>

      <button
        onClick={() =>
          dispatch({
            type: Actions.Delete_Digit,
          })
        }
      >
        DEL
      </button>

      <OperationButton operation={"/"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <button
        className="Span-two-size"
        onClick={() =>
          dispatch({
            type: Actions.Evaluate,
          })
        }
      >
        =
      </button>
    </div>
  );
}

export default App;

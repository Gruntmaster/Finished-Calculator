import { Actions } from "./App";
type DigitButtonProps = {
  digit: string;
  dispatch: any;
};

export default function DigitButton({ digit, dispatch }: DigitButtonProps) {
  return (
    <button
      onClick={() => dispatch({ type: Actions.Add_Digit, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

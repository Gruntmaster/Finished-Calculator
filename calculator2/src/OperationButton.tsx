import { Actions } from "./App";

type OperationButtonProps = {
  operation: string;
  dispatch: any;
};
export default function OperationButton({
  operation,
  dispatch,
}: OperationButtonProps) {
  return (
    <button
      onClick={() =>
        dispatch({ type: Actions.Choose_operation, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}

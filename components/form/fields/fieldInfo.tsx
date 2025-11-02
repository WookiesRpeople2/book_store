import { AnyFieldApi } from "@tanstack/react-form";
import { FC } from "react";


type Props = {
  field: AnyFieldApi;
};

export const FieldInfo: FC<Props> = ({ field }) => {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(', ')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
};

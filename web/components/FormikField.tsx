import { Field } from "formik";
import React, { FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const FormikField: FC<Props> = ({ type, name, required, children }) => {
  return (
    <div className="flex flex-col">
      <label>{children}</label>
      <Field
        type={type}
        name={name}
        className="min-w-full p-1 transition-all duration-300 rounded-sm outline-none focus:ring dark:ring-steel-500 text-steel-900"
        autoComplete="off"
        required={required}
      />
    </div>
  );
};

export default FormikField;

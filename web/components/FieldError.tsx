import React, { FC } from "react";

const FieldError: FC = ({ children }) => {
  return (
    <div className="self-start px-1 font-light text-red-300">{children}</div>
  );
};

export default FieldError;

import React from "react";

type TypographyPropsType = {
  children: string;
  size?: string;
};

const Typography: React.FC<TypographyPropsType> = ({ children, size }) => {
  return <p className={`${size}`}>{children}</p>;
};

export default Typography;

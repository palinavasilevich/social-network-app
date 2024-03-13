import { Button as NextUIButton } from "@nextui-org/react";
import React from "react";

type ButtonPropsType = {
  children: React.ReactNode;
  icon: JSX.Element;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
};

const Button: React.FC<ButtonPropsType> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return (
    <NextUIButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
    >
      {children}
    </NextUIButton>
  );
};

export default Button;

import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

type NavButtonPropsType = {
  children: React.ReactNode;
  icon: JSX.Element;
  href: string;
};

const NavButton: React.FC<NavButtonPropsType> = ({ children, icon, href }) => {
  return (
    <Button className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  );
};

export default NavButton;

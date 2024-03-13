import React from "react";

type ContainerPropsType = {
  children: React.ReactElement[] | React.ReactElement;
};

const Container = ({ children }: ContainerPropsType) => {
  return <div className="flex max-w-screen-xl mx-auto mt-10">{children}</div>;
};

export default Container;

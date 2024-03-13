import React from "react";
import { User as NextUIUSer } from "@nextui-org/react";
import { BASE_URL } from "../../constants";

type UserPropsType = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
};

const User: React.FC<UserPropsType> = ({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}) => {
  return (
    <NextUIUSer
      name={name}
      className={className}
      description={description}
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
    />
  );
};

export default User;

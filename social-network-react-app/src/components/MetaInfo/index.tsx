import React from "react";
import { IconType } from "react-icons";

type MetaInfoPropsType = {
  count: number;
  Icon: IconType;
};

const MetaInfo: React.FC<MetaInfoPropsType> = ({ count, Icon }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {count > 0 && (
        <p className="font-semibold text-default-400 text-l">{count}</p>
      )}
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon/>
      </p>
    </div>
  );
};

export default MetaInfo;

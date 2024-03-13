import React from "react";
import NavButton from "../NavButton";
import { BsPostcard } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Posts
          </NavButton>
        </li>

        <li>
          <NavButton href="following" icon={<FiUsers />}>
            Subscriptions
          </NavButton>
        </li>

        <li>
          <NavButton href="followers" icon={<FaUsers />}>
            Subscribers
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

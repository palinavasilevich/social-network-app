import React, { useEffect } from "react";
import Header from "../Header";
import Container from "../Container";
import NavBar from "../NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../features/user/userSlice";
import Profile from "../Profile";

const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">
            {!location.pathname.startsWith("/users") && <Profile />}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Layout;

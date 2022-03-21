import { NextPage } from "next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signOut } from "../app/features/auth/authSlices";
import { RootState } from "../app/store";
import Logo from "../components/Logo";

const Home: NextPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Logo />
      {auth.isAuth ? (
        <h3>Welcome back {auth.name}!</h3>
      ) : (
        <h3>Quickly Get Your Work Seen</h3>
      )}
      {auth.isAuth ? (
        <button
          onClick={() => dispatch(signOut())}
          className="py-2 rounded-sm dark:text-steel-900 dark:bg-steel-100 w-52 dark:focus:bg-steel-300"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() =>
            dispatch(
              login({
                id: 10,
                isAuth: true,
                name: "Iverson",
                token: "random-token-dummy-text",
              })
            )
          }
          className="btn-primary"
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default Home;

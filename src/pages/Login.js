import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminlogin } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      adminlogin({
        email: email,
        password: password,
      })
    );

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-7 border-all p-5 w-[400px] min-h-[400px] rounded">
        <h2 className="text-center">Sign In</h2>
        <p>Log in to your account to continue</p>
        <div>{message.message == "Rejected" ? "You are not an admin" : ""}</div>
        <form onSubmit={submitHandler} className="flex flex-col gap-7">
          <label className="inline-block font-bold" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="outline-0 p-3 rounded inline-block"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="inline-block font-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="outline-0 p-3 rounded inline-block"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="button-btn no-underline w-[100px] border-none inline-block"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

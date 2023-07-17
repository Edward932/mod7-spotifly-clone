import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  if (sessionUser) return <Redirect to="/main" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email.includes("@")) {
      setErrors("Please provide a valid email with an @");
      return;
    }


    const data = await dispatch(login(email, password));
    if (data) {
      setErrors("Provided credentials were invalid");
    }
  };

  return (
    <div className="login-form-page__outer">
      <div className="login-form-page__form-wrapper">
        <h1>Log In</h1>
        {errors ? <p className="login-form-page__errors">{errors}</p> : <p className="login-form-page__errors"></p>}
        <form
          className="login-form-page__form"
          onSubmit={handleSubmit}
        >
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;

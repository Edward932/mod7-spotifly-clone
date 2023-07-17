import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/main" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setErrors(["Please proved a valid email with an @"]);
      return
    }
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="signup-form-page__outer">
      <div className="signup-form-page__form-wrapper">
        <h1>Sign Up</h1>
        <form className="signup-form-page__form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li className="signup-form-page__errors" key={idx}>{error}</li>)}
          </ul>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength={5}
              maxLength={255}
            />
            {email.length >= 255 && <p>Max email length reached</p>}
          </label>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={2}
              maxLength={50}
            />
            {username.length >= 50 && <p>Max username length reached</p>}
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              maxLength={255}
            />
          </label>
          {password.length >= 255 && <p>Max password length reached</p>}
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              maxLength={255}
            />
          </label>
          {confirmPassword.length >= 255 && <p>Max password length reached</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;

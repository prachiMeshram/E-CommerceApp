import { useState } from "react";
import {useHistory} from "react-router-dom"
import "./login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();

    // console.log(email);

    const res = await axios.post("http://localhost:8000/api/auth/login", {
      data: { email, password },
    });
    // console.log(res.data);

    const {isAdmin} = res.data;

    if (isAdmin) {
      console.log(res.data.accessToken);

      history.push("/", {
        token: res.data.accessToken,
      });
    }
    else {
      console.log("User is not an admin");
    }

  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <span className="logo">Admin</span>
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="loginButton" onClick={(e) => onLogin(e)}>
            Sign In
          </button>
          {/* <span>
            New to Netflix? <b>Sign up now.</b>
          </span> */}
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Input } from "../components/Input";
import { Link } from "react-router-dom";
import "../scss/login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className='app__login__wrapper'>
      <div className='app__login'>
        <div className='app__login__left'>
          <h2>Pulse</h2>
          <p>
            Welcome back to Pulse, your go-to destination for social connection. We're thrilled to
            see you again! Simply enter your login credentials to dive right back into the action.
            With Pulse, you'll be able to keep up with the latest from your favorite communities,
            engage with your friends, and explore new topics that pique your interest. We can't wait
            to see what you'll discover next!
          </p>
          <span>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </span>
        </div>
        <form className='app__login__right'>
          <Input type='email' placeholder='Email' state={email} setState={setEmail} />
          <input type='password' placeholder='Password' />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

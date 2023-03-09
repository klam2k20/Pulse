import { useState } from "react";
import { Input } from "../components/Input";
import { Link } from "react-router-dom";
import "../scss/login.scss";
import Logo from "../components/Logo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className='app__login__wrapper'>
      <div className='app__login'>
        <div className='app__login__left'>
          <div className='app__login__logo'>
            <Logo />
            <span>PULSE</span>
          </div>
          <form>
            <h1>Hello Again!</h1>
            <span>Welcome back! Please enter your credentials.</span>
            <div className='app__login__form__inputs'>
              <Input
                type='email'
                placeholder='Email'
                state={email}
                setState={setEmail}
                className='top'
              />
              <Input
                type='password'
                placeholder='Password'
                state={password}
                setState={setPassword}
                className='bottom'
              />
            </div>
            <button>Login</button>
          </form>
          <span>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </span>
        </div>
        <div className='app__login__right'>
          <img src='/heart.png' />
        </div>
      </div>
    </div>
  );
}

export default Login;

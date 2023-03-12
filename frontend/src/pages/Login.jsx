import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import "../scss/login.scss";
import Logo from "../components/Logo";
import { loginUser } from "../lib/apiRequests";
import { useUser } from "../context/UserProvider";
import { toast } from "react-hot-toast";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(email, password);
      setUser(data);
      navigate("/");
      toast.success(`Welcome back, ${data.username}`);
    } catch (err) {
      console.log(`Login User: ${err}`);
      if (err.response.status === 401)
        toast.error(err.response.data.message, {
          position: "bottom-left",
        });
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/user");
      setUser(data);
      navigate("/");
      toast.success(`Welcome back, ${data.username}`);
    };

    getUser().catch((err) => {
      console.log(`Get User Profile: ${err}`);
    });
  }, []);

  return (
    <div className='app__login'>
      <div className='app__login__left'>
        <div className='app__login__logo'>
          <Logo />
          <span>PULSE</span>
        </div>
        <form onSubmit={submitForm}>
          <h1>Hello Again!</h1>
          <span>Welcome back!</span>
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
          {!email || !password ? <button disabled>Login</button> : <button>Login</button>}
        </form>
        <span>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </span>
      </div>
      <div className='app__login__right'>
        <img src='/heart.png' />
      </div>
    </div>
  );
}

export default Login;

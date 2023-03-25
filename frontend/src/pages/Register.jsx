import { useState } from "react";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Pages/register.scss";
import Logo from "../components/Logo";
import { registerUser } from "../lib/apiRequests";
import { toast } from "react-hot-toast";
import { useUser } from "../context/UserProvider";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(name, username, email, password);
      setUser(data);
      navigate("/");
      toast.success(`Welcome ${data.username}`);
    } catch (err) {
      console.log(`Register User: ${err}`);
      if (err.response.status === 409)
        toast.error(err.response.data.message, {
          position: "bottom-right",
        });
    }
  };

  return (
    <div className='app__register'>
      <div className='app__register__left'>
        <div>
          <h1> Welcome to Pulse</h1>
          <h3>The social media app that connects you to the world around you!</h3>
          <p>
            With Pulse, you can share your thoughts, ideas, and experiences with your friends and
            family, as well as meet new people who share your interests. Whether you're looking for
            inspiration, entertainment, or just a place to express yourself, Pulse is the perfect
            platform for you.
          </p>
        </div>
      </div>
      <div className='app__register__right'>
        <div className='app__register__logo'>
          <Logo />
          <span>PULSE</span>
        </div>
        <form onSubmit={submitForm}>
          <h1>Welcome to Pulse</h1>
          <span>The social media app that connects you to the world around you!</span>
          <div className='app__register__form__inputs'>
            <div>
              <Input
                type='text'
                placeholder='Name'
                state={name}
                setState={setName}
                className='top'
              />
              <Input
                type='text'
                placeholder='Username'
                state={username}
                setState={setUsername}
                className='bottom'
              />
            </div>

            <div>
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
          </div>
          {!name || !username || !email || !password ? (
            <button disabled>Sign Up</button>
          ) : (
            <button>Sign Up</button>
          )}
        </form>
        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;

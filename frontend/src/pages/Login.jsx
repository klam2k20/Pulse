import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import Logo from '../components/Logo';
import { useUser } from '../context/UserProvider';
import { loginUser } from '../lib/apiRequests';
import '../scss/Pages/auth.scss';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
      toast.success(`Welcome back, ${user.username}`);
    }
  });

  const handleChange = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormIncomplete = () => {
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$');
    return !login.email || !login.password || !emailRegex.test(login.email);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (isFormIncomplete()) return;
    try {
      const { data } = await loginUser(login.email, login.password);
      setUser(data);
      navigate('/');
      toast.success(`Welcome back, ${data.username}`);
    } catch (err) {
      console.log(`Login User Error: ${err}`);
      if (err.response.status === 401)
        toast.error('Invalid email and/or password', {
          position: 'bottom-left',
        });
    }
  };

  return (
    <div className='app__auth'>
      <div className='app__auth__form'>
        <div className='app__logo'>
          <Logo />
          <h3>PULSE</h3>
        </div>
        <form onSubmit={submitForm}>
          <h1>Hello Again!</h1>
          <span>Welcome back!</span>
          <div className='app__login__inputs'>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              state={login.email}
              setState={handleChange}
              className='top'
            />
            <Input
              type='password'
              name='password'
              placeholder='Password'
              state={login.password}
              setState={handleChange}
              className='bottom'
            />
          </div>
          <button className='primary__outline__btn' disabled={isFormIncomplete() ? 'disabled' : ''}>
            Login
          </button>
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

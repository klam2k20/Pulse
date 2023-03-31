import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import Logo from '../components/Logo';
import { useUser } from '../context/UserProvider';
import { registerUser } from '../lib/apiRequests';
import { defaultText } from '../lib/constants';
import '../scss/Pages/auth.scss';

function Register() {
  const [register, setRegister] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const { user, setUser, setError } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
      toast.success(`Welcome back, ${user.username}`);
    }
  });

  const handleChange = (e) => {
    e.preventDefault();
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormIncomplete = () => {
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$');
    return (
      !register.name ||
      !register.username ||
      !register.email ||
      !register.password ||
      !emailRegex.test(register.email)
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (isFormIncomplete()) return;
    try {
      const { data } = await registerUser(
        register.name,
        register.username,
        register.email,
        register.password
      );
      setUser(data);
      setError(null);
      navigate('/');
      toast.success(`Welcome ${data.username}`);
    } catch (err) {
      console.log(`Register User Error: ${err}`);
      if (err.response.status === 409)
        toast.error('Username and/or email already registered', {
          position: 'bottom-right',
        });
    }
  };

  return (
    <div className='app__auth'>
      <div className='app__register__left'>
        <div>
          <p>{defaultText.registerBannerText}</p>
        </div>
      </div>
      <div className='app__auth__form'>
        <div className='app__logo'>
          <Logo />
          <h3>PULSE</h3>
        </div>
        <form onSubmit={submitForm}>
          <h1>{defaultText.registerTitle}</h1>
          <span>{defaultText.registerSubTitle}</span>
          <div className='app__register__inputs'>
            <div>
              <Input
                type='text'
                name='name'
                placeholder='Name'
                state={register.name}
                setState={handleChange}
                className='top'
              />
              <Input
                type='text'
                name='username'
                placeholder='Username'
                state={register.username}
                setState={handleChange}
                className='bottom'
              />
            </div>
            <div>
              <Input
                type='email'
                name='email'
                placeholder='Email'
                state={register.email}
                setState={handleChange}
                className='top'
              />
              <Input
                type='password'
                name='password'
                placeholder='Password'
                state={register.password}
                setState={handleChange}
                className='bottom'
              />
            </div>
          </div>
          <button className='primary__outline__btn' disabled={isFormIncomplete() ? 'disabled' : ''}>
            Sign Up
          </button>
        </form>
        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;

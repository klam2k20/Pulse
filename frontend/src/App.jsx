import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, Route, Routes } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css';
import './App.scss';
import CreatePostModal from './components/Modal/CreatePostModal';
import Navbar from './components/Navbar/Navbar';
import NavFooter from './components/Navbar/NavFooter';
import AppError from './components/StatusIndicator/AppError';
import AppLoading from './components/StatusIndicator/AppLoading';
import { useUser } from './context/UserProvider';
import { Home, Login, Profile, Register } from './pages';
import Post from './pages/Post';
import './scss/Pages/layout.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/:username/post/:postId' element={<Post />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Toaster position='bottom-center' toastOptions={{ duration: 1000 }} />
    </>
  );
}

function Layout() {
  const { isLoading, error } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  return (
    <>
      {(loading || isLoading) && <AppLoading />}
      {error && (
        <AppError
          text='Something went wrong.'
          buttonText='TRY AGAIN'
          onClick={() => window.location.reload()}
        />
      )}
      {!isLoading && !loading && !error && (
        <div className='layout'>
          <Navbar openPostModal={() => setModalOpen(true)} />
          <article className='app__layout__main__wrapper'>
            <Outlet />
          </article>
          <NavFooter openPostModal={() => setModalOpen(true)} />
          <CreatePostModal isOpen={isModalOpen} close={() => setModalOpen(false)} />
        </div>
      )}
    </>
  );
}

export default App;

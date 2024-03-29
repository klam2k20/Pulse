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
import NavHeader from './components/Navbar/NavHeader';

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
  const [loading, setLoading] = useState(true);
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);

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
          <NavHeader />
          <Navbar openPostModal={() => setCreatePostOpen(true)} />
          <article className='app__layout__main__wrapper'>
            <Outlet />
          </article>
          <NavFooter openPostModal={() => setCreatePostOpen(true)} />
          <CreatePostModal isOpen={isCreatePostOpen} close={() => setCreatePostOpen(false)} />
        </div>
      )}
    </>
  );
}

export default App;

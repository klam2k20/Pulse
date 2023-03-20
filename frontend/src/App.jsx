import { Route, Routes, Outlet } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import { Home, Login, Profile, Register, Explore } from "./pages";
import { Toaster } from "react-hot-toast";
import NavFooter from "./components/Navbar/NavFooter";
import { useState } from "react";
import CreatePostModal from "./components/Modal/CreatePostModal";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/explore' element={<Explore />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Toaster position='bottom-center' toastOptions={{ duration: 1000 }} />
    </>
  );
}

function Layout() {
  const [isPostModalOpen, setIsPostModal] = useState(false);

  return (
    <div className='layout'>
      <Navbar openPostModal={() => setIsPostModal(true)} />
      <section className='app__layout__main__wrapper'>
        <Outlet />
      </section>
      <NavFooter openPostModal={() => setIsPostModal(true)} />
      <CreatePostModal isOpen={isPostModalOpen} close={() => setIsPostModal(false)} />
    </div>
  );
}

export default App;

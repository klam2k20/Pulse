import { Route, Routes, Outlet } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import { Home, Login, Profile, Register, Explore } from "./pages";
import { Toaster } from "react-hot-toast";

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
      <Toaster position='bottom-center' />
    </>
  );
}

function Layout() {
  return (
    <div className='layout'>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;

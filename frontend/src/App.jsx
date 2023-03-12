import { useEffect } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import { useUser } from "./context/UserProvider";
import { Home, Login, Profile, Register } from "./pages";
import { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Toaster position='bottom-center' />
    </>
  );
}

function Layout() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/user");
      setUser(data);
    };

    getUser().catch((err) => {
      console.log(`Get User Profile: ${err}`);
      navigate("/login");
    });
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

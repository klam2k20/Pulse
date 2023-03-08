import { useEffect } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import "./App.scss";
import { useUser } from "./context/UserProvider";
import { Home, Login, Profile, Register } from "./pages";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

function Layout() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

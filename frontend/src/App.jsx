import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import ProfilePage from "./pages/ProfilePage";

import Navbar from "./components/Navbar";
import RightSideBoxWithSearch from "./components/RightSideBoxWithSearch";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const location = useLocation();
  
  const { data: authenticateUser, isLoading } = useQuery({
    queryKey: ["authenticateUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/authenticate/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authenticateUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className='flex max-w-6xl mx-auto'>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!authenticateUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/signup' element={!authenticateUser ? <SignUpPage /> : <Navigate to='/' />} />
    
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>
      
      {!isAuthPage && <RightSideBoxWithSearch />}
      
      <Toaster />
    </div>
  );
}

export default App;

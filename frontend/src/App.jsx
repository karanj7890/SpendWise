import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import { SignupForm } from "./components/Users/Register";
import { Logo } from "./components/logo";
import {LoginForm} from "./components/Users/Login"
import { ForgotPasswordForm } from "./components/ForgetPassword";
import { useAuthStore } from "./store/useAuthStore";
import { LuLoader } from "react-icons/lu";
import { useEffect } from "react";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import Dashboard from "./components/Users/Dashboard";
import UserProfile from "./components/Users/UpdateProfile";
import { OTPVerificationForm } from "./components/Otp/OtpVerificationForm";
import { NewPasswordForm } from "./components/NewPassword/NewPasswordForm";
import { useThemeStore } from "./store/useThemeStore"; 

const AuthLayout = ({ children }) => (
  <div className="flex min-h-screen w-full">
    <div className="relative hidden w-1/2 lg:block">
      <div className="absolute inset-0 bg-black/30" />
      <img
        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        alt="Finance background"
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h1 className="text-3xl font-bold">Take control of your finances</h1>
        <p className="mt-2 text-lg">Track every penny, achieve your goals</p>
      </div>
    </div>
    <div className="flex w-full flex-1 items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          {children}
        </div>
      </div>
    </div>
  </div>
);


function App() {

  const {authUser,isCheckingAuth,checkAuth}= useAuthStore();
  const { initializeTheme } = useThemeStore(); 

  useEffect( ()=>{
    checkAuth()
  },[checkAuth,initializeTheme])

  console.log({authUser});
  

  if(isCheckingAuth && !authUser) return(

    <div className='flex items-center justify-center min-h-screen'>
      <LuLoader className="size-10 animate-spin"/>
    </div>
  )
  

  return (
    <BrowserRouter>
    {/*Navbar */}
      {authUser ? <PrivateNavbar/>: <PublicNavbar/> }
      
      <Routes>
        <Route path="/" element={authUser? <Dashboard/>:<HomePage /> } />
    
        <Route path="/login" element={
          <AuthLayout>
          <>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
             Sign in to your account 
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"> 
            Track your expenses with ease 
          </p>
            <LoginForm />
          </>
        </AuthLayout>
        } />
        <Route path="/register" element={
          <AuthLayout>
          <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Start tracking your expenses today
            </p>
            <SignupForm />
          </>
        </AuthLayout>
        } />

        <Route path="/forget-password" element={
          !authUser ? 
          <AuthLayout>
            <>
            <h2 className="text-3xl font-bold tracking-tight text-center mt-6">Forgot Password?</h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              No worries, we'll send you reset instructions.
            </p>
            <ForgotPasswordForm/>
            </>
          </AuthLayout>
          : <Navigate to="/dashboard" />
          } />
        <Route path="/add-category" element={authUser? <AddCategory/> : <Navigate to= "/login" />}/>
        <Route path="/categories" element= {authUser ? <CategoriesList/> : <Navigate to= "/login" />} />
        <Route path="/auth/update-category/:id" element= {authUser ? <UpdateCategory/> : <Navigate to= "/login" />} />
        <Route path="/add-transaction" element={authUser ? <TransactionForm/> : <Navigate to="/login"/>} />
        <Route path="/dashboard" element={authUser ? <Dashboard/>: <Navigate to="/login" />}/>
        <Route path="/profile" element={authUser ? <UserProfile/> : <Navigate to="/login" />} />
        <Route path="/otp-input" element={
          !authUser ? 
          <AuthLayout>
            <div className="mt-8">
            <OTPVerificationForm/>
            </div>
          </AuthLayout>
          : <Navigate to="/dashboard" />
          } />

         <Route path="/new-password" element={
          !authUser ? 
          <AuthLayout>
            <>
              <h2 className="text-3xl font-bold tracking-tight mt-6 text-center">Create new password</h2>
              <p className="mt-2 text-sm text-gray-600 text-center">Please create a strong password for your account</p>
            </>
            <NewPasswordForm/>
            
          </AuthLayout>
          : <Navigate to="/dashboard" />
          
         } /> 
         
      </Routes>
    </BrowserRouter>
  )
}

export default App

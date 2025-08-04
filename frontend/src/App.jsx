import { Outlet, Route, Routes} from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage/index';
import LoginPage from './pages/LoginPage/index';
import RegisterPage from './pages/RegisterPage/index';
import Navbar from './layout/NavBar/index';
import Footer from './layout/Footer/index';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full"> {/* 반드시 w-full */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


function App() {

  return (
    <Routes>
  <Route path='/' element={<Layout />}>
    <Route index element={<LandingPage />} />
    <Route path='login' element={<LoginPage />} />
    <Route path='register' element={<RegisterPage />} />
  </Route>
</Routes>

  )
}

export default App

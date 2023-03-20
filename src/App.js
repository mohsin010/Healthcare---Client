import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import ErrorPage from './components/errorPage/errorPage';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Footer from './components/footer/footer'; 
import MyPage from './components/mypage/mypage';
import Devices from './components/device/device';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route to='/' element={<Login />} /> */}
          <Route path='*' element={<ErrorPage />} />
          {/* <Route path='/'> */}
          {/* <Route path="/" components={{ main: Login, sidebar: Navbar }}/> */}
          {/* </Route>/ */}
          {/* <Route path='/' > */}
          <Route exact path='/' element={<Navbar />} />
          {/* <Route exact path='/' element={<Login />} /> */}
          <Route path='/mypage' element={<MyPage />} />

          <Route exact path='/' element={<Footer />} />

          <Route path='/home' element={<Home />} />
          <Route path='/devices' element={<Devices />} />


          {/* </Route> */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

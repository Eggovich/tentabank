import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import Browse from './pages/browse';
import Profile from './pages/profile';
import Upload from './pages/upload';
import Footer from './components/footer';
import Login from './pages/login';
import Review from './pages/review';
import Browse2 from './pages/browse2';
import Browse3 from './pages/browse3';
import Testhanna from './pages/testhanna';
import { Cookies, useCookies } from 'react-cookie';
import ActivityDetector from 'react-activity-detector'

function App() {
	const [cookies, setCookies, removeCookie] = useCookies(["user"])
	
	const onIdle = () => {
	if (cookies.loggedIn){
		removeCookie("user")
        removeCookie("username")
        removeCookie("email")
        removeCookie("password")
        removeCookie("role")
        removeCookie("user_id")
        removeCookie("loggedIn")
        removeCookie("uploads")
        window.location.reload(false);
	}}
	
	return (
	<Router>
	<ActivityDetector enabled={true} timeout={60*60*60*1000} onIdle={onIdle} name="default"/>
	<Navbar/>
		<Routes>
			<Route exact path='/*' element={<Home />} />
			<Route path='/about' element={<About/>} />
			<Route path='/upload' element={<Upload/>} />
			<Route path='/browse' element={<Browse3/>} />
			<Route path='/profile' element={<Profile/>} />
			<Route path='/login' element={<Login/>} />
			<Route path='/review' element={<Review/>} />
			<Route path='/testhanna' element={<Testhanna/>} />
		</Routes>
	<Footer/>
	</Router>
);
}

export default App;

import './App.css';
import Navbar from './components/index';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import Browse from './pages/browse';
import Profile from './pages/profile';
import Upload from './pages/upload';
import Footer from './components/footer';
import Login from './pages/login';
import Signup from './pages/signup';
import Review from './pages/review';

function App() {

return (
	<Router>
	<Navbar />
		<Routes>
			<Route exact path='/*' element={<Home />} />
			<Route path='/about' element={<About/>} />
			<Route path='/upload' element={<Upload/>} />
			<Route path='/browse' element={<Browse/>} />
			<Route path='/profile' element={<Profile/>} />
			<Route path='/login' element={<Login/>} />
			<Route path='/signup' element={<Signup/>} />
			<Route path='/review' element={<Review/>} />
		</Routes>
	<Footer />
	</Router>
);
}

export default App;

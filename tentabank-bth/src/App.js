import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/index';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import Browse from './pages/browse';
import Profile from './pages/profile';
import Upload from './pages/upload';
import Footer from './components/footer'

function App() {

return (
	<Router>
	<Navbar />
	<Footer />
	<Routes>
		<Route exact path='/' element={<Home />} />
		<Route path='/about' element={<About/>} />
		<Route path='/upload' element={<Upload/>} />
		<Route path='/browse' element={<Browse/>} />
		<Route path='/profile' element={<Profile/>} />
	</Routes>
	</Router>
);
}

export default App;

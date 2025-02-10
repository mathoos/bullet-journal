import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';


function App() {

    return (
        <Router>
            <Routes>      
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard/:title" element={<Dashboard/>} />
            </Routes>
        </Router>
    );
}


export default App;


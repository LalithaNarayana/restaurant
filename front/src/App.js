import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import WaiterPage from './components/WaiterPage';
import LineCookPage from './components/LineCookPage';

function App() {
    return (
        <Routes>  {/* Replace Switch with Routes */}
            <Route path="/" element={<MainPage />} />  
            <Route path="/waiter" element={<WaiterPage />} /> 
            <Route path="/line-cook" element={<LineCookPage />} />  
        </Routes>
    );
}

export default App;

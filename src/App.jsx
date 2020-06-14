import React from 'react';
import './App.css';

import data from './data';

import ProductTable from './ProductTable';

function App() {
    return (
        <div className="App">
            <ProductTable data={ data } />
        </div>
    );
}


export default App;

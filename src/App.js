import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import ProductReview from './components/ProductReview/ProductReview';
import { products } from './fakeData/products';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    
      
      <Router>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/review" element={<Review />} />
          <Route path="/manage" element={
            <PrivateRoute>
              <Manage />
            </PrivateRoute>
          } />
          <Route path="/shipment" element={

            <PrivateRoute>
              <Shipment />
            </PrivateRoute>

          } />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:productKey" element={<ProductReview />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>





    </userContext.Provider>
  );
}

export default App;

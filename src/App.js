import './App.scss';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
//Components
import Navbar from './Components/Navbar/Navbar';
import Category from './Components/Category/Category';
import Cart from './Components/Cart/Cart';
import Product from './Components/PDP/Product';
import routes from './JS/Router/routes';

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path={routes.home} element={<Navbar />}>
                  <Route index element={<Category />}/>
                  <Route path={routes.product} element={<Product />}/>
                  <Route path={routes.cart} element={<Cart />}/>
                  <Route path={routes.unmatch} element={<Navigate to=''/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

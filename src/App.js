import './App.scss';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
//Components
import Navbar from './Components/Navbar/Navbar';
import Category from './Components/Category/Category';
import Cart from './Components/Cart/Cart';
//GraphQL
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navbar />}>
                  <Route index element={<Category />}/>
                  <Route path='cart' element={<Cart />}/>
                  <Route path='graphQL' element={<div>{error ? 'Error' : (loading ? 'Loading...' : (JSON.stringify(data.locations)))}</div>}/>
                  <Route path='*' element={<Navigate to=''/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MovieList from '../../components/MovieList'
import MovieDetails from '../../components/MovieDetails'


import { useParams } from 'react-router-dom'
import Favorites from '../../pages/Favorites'
import FavoritesDetails from '../../pages/FavoritesDetails'
import Login from '../../pages/Login';
import CartPage from '../../components/CartPage';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import HomePage from "../../pages/HomePage"

export const ApplicationRoutes = () => {

const {id} = useParams();

  return (
    <BrowserRouter>
    <Navbar/>
        <Routes>
                <Route path='/'  element={<Login/>}/>
                <Route exact path={"/homepage"} element={<HomePage/>}/> 
                <Route path='movielist' element={<MovieList/>}/>
                <Route path={"/movie/:id"} element={<MovieDetails/>}/>
                <Route path={"/favorites"} element={<Favorites/>}/>
                <Route path={"/favorites/:id"} element={<FavoritesDetails/>}/> 
                <Route path={"/cart"} element={<CartPage/>}/> 
{/*                 <Route
                exact
                path="/"
                render={() => {
                    return (
                      this.state.isUserAuthenticated ?
                      <Redirect to="/home" /> :
                      <Redirect to="/test1" /> 
                    )
                }}
              /> */}
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
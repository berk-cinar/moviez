import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

import { VscFilter  } from 'react-icons/vsc';

import axios from 'axios';

function MovieList() {


  const items = useSelector((state) => state.allCart.items)

  const dispatch = useDispatch();



  const [movies, setMovies] = useState([]);

  const [filter, setFilter] = useState(false);

  const [filtered, setFiltered] = useState([]);

  const [search, setSearchBar] = useState('');

  const navigate = useNavigate();

  const goToSource = (id) => {
    navigate("/movie/" + id);
  }

  function filterMovies(searchTerm, movies) {
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  function filterByRating(rating) {
    let filteredMovies = [];
    if (rating === 0) {
      filteredMovies = movies;
    } else {
      filteredMovies = movies.filter(movie => movie.rating >= rating);
    }
    setFiltered(filteredMovies);
  }

  function filterByType(type) {
    let filteredMovies = [];
    if (type === "") {
      filteredMovies = movies;
    } else {
      filteredMovies = movies.filter(movie => movie.genre1 == type || movie.genre2 == type);
    }
    setFiltered(filteredMovies);
  }

  function handleRatingCheckboxChange(e) {
    const rating = Number(e.target.value);
    if (e.target.checked) {
      filterByRating(rating);
    } else {
      setFiltered(movies.filter(movie => movie.rating !== rating));
    }
  }

  function handleTypeCheckboxChange(e) {
    const type = e.target.value;
    if (e.target.checked) {
      filterByType(type)
    } else {
      setFiltered(movies.filter(movie => movie.type !== type));
    }
  }

  useEffect(() => {
    axios.get('/movies.json')
      .then(response => setMovies(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    setFiltered(filterMovies(search, movies));
    console.log(filtered)
  }, [search, movies]);

  return (
    <div>
                  <div className="ml-[25vw] flex">
              <div class="relative inset-y-0 left-8 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class=" w-5 mr-2 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearchBar(e.target.value)}
                class=" max-w-[800px] w-[50vw] placeholder:italic  text-center justify-content-center placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-6 pr-6 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                placeholder="Search for anything..." 
                name="search" />
              <br></br>
            </div>
            
            <div className="md:hidden flex">
             <div class="relative inset-y-0 left-8 flex items-center pl-3 pointer-events-none">
            <VscFilter  class=" w-5 mr-2 h-5 text-gray-500 "/>
        </div>
              <button
              onClick={() => setFilter(!filter)}
                type="text"
                class=" max-w-[800px] w-24 placeholder:italic  text-center justify-content-center placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-6 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                name="search">
                  Filters
                </button>
              <br></br>
            </div>

      {
        filter
          ?
          <>

            <div className='md:hidden grid grid-cols-2 gap-4 px-4 '>

              <div className=' '>
              <h3 class="mt-4 mb-4 font-semibold text-gray-900 dark:text-white">IMDB</h3>
            <ul class=" text-sm font-medium text-gray-900 bg-white border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">



              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleRatingCheckboxChange} type="checkbox" value="9" class="mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label class="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">+9</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleRatingCheckboxChange} type="checkbox" value="8" class="mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="react-checkbox" class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">+8</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleRatingCheckboxChange} id="angular-checkbox" type="checkbox" value="7" class="mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="angular-checkbox" class="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">+7</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleRatingCheckboxChange} id="laravel-checkbox" type="checkbox" value="6" class="mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="laravel-checkbox" class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">+6</label>
                </div>
              </li>
            </ul>
              </div>
              <div className=''>
              <h3 class="mt-4 mb-4 font-semibold text-gray-900 dark:text-white">Type</h3>
            <ul class=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleTypeCheckboxChange} id="action-checkbox" type="checkbox" value="action" class=" mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="action-checkbox" class="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">Action</label>
                </div>

              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleTypeCheckboxChange} id="drama-checkbox" type="checkbox" value="drama" class="mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="drama-checkbox" class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">Drama</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleTypeCheckboxChange} id="horror-checkbox" type="checkbox" value="horror" class="mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="horror-checkbox" class="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">Horror</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleTypeCheckboxChange} id="nature-checkbox" type="checkbox" value="nature" class="mr-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="nature-checkbox" class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">Nature2</label>
                </div>
              </li>
            </ul>
              </div>

            </div>
          </>
          :
          <>
          </>
      }
      <div className='w-full flex flex-col space-y-4 sm:flex-row static relative md:min-h-[100vh]'>



        <div className='md:w-1/5 lg:w-1/6 hidden md:block rounded-lg   h-[80vh] '>
          <label class=" pl-4 relative block">
            <span class="sr-only">Search</span>

            <span class=" inset-y-0 left-0 flex items-center ">
              <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>

          
          </label>
          <div className=' m-4'>
              <br></br>
            <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">IMDB</h3>
            <ul class=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">



              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleRatingCheckboxChange} type="checkbox" value="9" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-1 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label class="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">+9</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleRatingCheckboxChange} type="checkbox" value="8" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-1  rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="react-checkbox" class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">+8</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleRatingCheckboxChange} id="angular-checkbox" type="checkbox" value="7" class="w-4 h-4 text-blue-600 mr-1  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="angular-checkbox" class="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">+7</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleRatingCheckboxChange} id="laravel-checkbox" type="checkbox" value="6" class="w-4 h-4 text-blue-600 mr-1 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="laravel-checkbox" class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">+6</label>
                </div>
              </li>
            </ul>
            <h3 class="mt-4 mb-4 font-semibold text-gray-900 dark:text-white">Type</h3>
            <ul class=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleTypeCheckboxChange} id="vue-checkbox" type="checkbox" value="action" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-1 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="vue-checkbox" class="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">Action</label>
                </div>

              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleTypeCheckboxChange} id="react-checkbox" type="checkbox" value="drama" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-1 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="react-checkbox" class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">Drama</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleTypeCheckboxChange} id="angular-checkbox" type="checkbox" value="horror" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-1 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="angular-checkbox" class="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">Horror</label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input onChange={handleTypeCheckboxChange} id="nature-checkbox" type="checkbox" value="nature" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-1 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label for="nature-checkbox" class="w-full py-3  text-sm font-medium text-gray-900 dark:text-gray-300">Nature</label>
                </div>
              </li>
            </ul>

          </div>
        </div>

        <div className='md:w-4/5 lg:w-5/6 p-2 lg:px-16 w-full mt-10 gap-4 flex sm:px-24   grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6   ' >

          {filtered
            .map(movie => (
              <div key={movie.id}>
                <div class="bg-white border border-gray-200 rounded-lg shadow ">

                  <img onClick={() => goToSource(movie.id)} class="rounded-t-lg h-[230px] object-cover w-full" src={movie.image} alt="" />


                  <div >
                    <a href="#">
                      <h5 class="text-center min-h-[6vh] mb-2 text-md  tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>

                    </a>


                    <div>
                    </div>

                    <div className="text-center mb-2">
                      <button onClick={() => dispatch(addToCart(movie))} key={movie.id} class="mb-2 object-none object-right-bottom inline-flex items-center px-2 mt-2 py-1 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to Cart
                      </button> <br></br>
                      <button class="inline-block bg-gray-100 hover:bg-gray-100 text-gray-800 text-xs  py-1 px-2 border border-gray-200 rounded">
                        #{movie.genre1}
                      </button>
                      <button class="ml-2 inline-block bg-gray-100 hover:bg-gray-100 text-gray-800 text-xs py-1 px-2 border border-gray-200 rounded">
                        #{movie.genre2}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        </div>
      </div>
    </div>


  );
}

export default MovieList;

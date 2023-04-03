

import { addToCart } from '../features/cartSlice';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {IoMdAddCircleOutline} from "react-icons/io"
import {BiRightArrow} from "react-icons/bi"

function HomePage() {


  const [movies, setMovies] = useState([]);
  const [login, setLogin] = useState(false);

  const navigate=useNavigate();


  const goToSource=(id)=>{
        navigate("/movie/"+id);
    }

  const goToStarTrek=(id)=>{
        navigate("/movie/19");
    }



  useEffect(() => {
    axios.get('/movies.json')
      .then(response => setMovies(response.data))
      .catch(error => console.log(error));
  }, []);

   const items = useSelector((state) =>state.allCart.items)

   const dispatch = useDispatch();

  return (
    <div>
<div class="relative">
  <img class="w-full h-[40vw]   lg:h-[60vh]" src="startrek.png" alt="theoffice"/>

  <div className='text-sm lg:m-12 absolute top-6 lg:top-12 left-6 md:left-36 sm:top-12 sm left-6 text-white'>
      <p className='text-gray-300 mb-3 lg:mb-6'>Action Drama  | 2007  | USA | 142 Min </p>
      <span className='font-semibold text-lg md:text-6xl'>
      Star Trek: 
      </span> <br></br>
      <span className='font-light text-lg md:text-6xl'>
      New World
    </span> <br></br>
    <button  onClick={goToStarTrek} type="button" class="pr-2 relative bg-[#24BBF0] text-white border border-[#24BBF0] mr-4 mt-3 lg:mt-6 md:mt-12 font-medium rounded-[1.5px] text-md px-2 lg:px-5 py-1 lg:py-2.5  ">
      <BiRightArrow className='absolute top-2.3 ml-2 lg:ml-4  left-0 h-5 w-5  '/>
      <p className='ml-6'>
      Movie Page
      </p>
    </button>
  
    <a href="https://www.youtube.com/watch?v=ndtCicnVvbc"    type="button" class="pr-2 bg-black bg-opacity-50 md:bg-opacity-0 relative text-white border border-white font-medium rounded-[1.5px] text-md px-2 lg:px-5 py-1 lg:py-2.5  ">
      <IoMdAddCircleOutline className='absolute top-2.3 ml-2 lg:ml-4   left-0 h-5 w-5  '/>
      <p className='ml-6'>
  
    Watch Trailer
      </p>
    </a>
  </div>

  
  </div>
    <div className=' w-full flex justify-center items-center  p-4'>
      
<div className=' grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-6  xl:grid-cols-6 gap-4 xl:px-48  md:px-24 sm:px-16 px-4 ' >

        {movies
        .map(movie => (
          <div    key={movie.id}>
<div class="bg-red-100  bg-white border border-gray-200 rounded-lg shadow">
   
        <img  onClick={() => goToSource(movie.id)}  class="w-full rounded-t-lg h-[230px] object-cover" src={movie.image} alt="" />
    
    <div >
        <a href="#">
            <h5 class="text-center min-h-[6vh] mb-2 text-md  tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>

        </a>

{/*         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> 2021 so far, in reverse chronological order.</p> */}

{/*         <button  onClick={() => goToSource(movie.id)}   key={movie.id}   class="object-none object-right-bottom inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Watch now
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button> */}
        <div>
        </div>

<div className="text-center mb-2">
  <button onClick={() => dispatch(addToCart(movie))} key={movie.id}   class="mb-2 object-none object-right-bottom inline-flex items-center px-2 mt-2 py-1 text-sm font-medium text-center text-white bg-blue-800 rounded-[3px] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

export default HomePage;
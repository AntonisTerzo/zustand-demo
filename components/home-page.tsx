'use client'

import { useJokeStore } from "@/stores/laugh-store";
import Image from "next/image";
import { useEffect } from "react";

const HomeClient = () => {
  const { 
    joke, 
    isLoading, 
    error, 
    isLaughing, 
    fetchJoke,
    fadingIn,
    currentImage,
    setFadingIn,
    setCurrentImage
  } = useJokeStore();
  
  // Handle smooth image transitions
  useEffect(() => {
    if (isLaughing && currentImage !== "/laughing_comedian_bear.png") {
      setFadingIn(true);
      setTimeout(() => {
        setCurrentImage("/laughing_comedian_bear.png");
        setFadingIn(false);
      }, 300);
    } else if (!isLaughing && currentImage !== "/comedian_bear.png") {
      setFadingIn(true);
      setTimeout(() => {
        setCurrentImage("/comedian_bear.png");
        setFadingIn(false);
      }, 300);
    }
  }, [isLaughing, currentImage, setFadingIn, setCurrentImage]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-6 relative">
        <Image
          alt="bear_comedian"
          src={currentImage}
          width={350}
          height={350}
          priority
          className={`transition-all duration-300 ${fadingIn ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        />
      </div>
      
      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md max-w-md w-full">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading joke...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : joke ? (
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Category: {joke.category}
            </h3>
            {joke.type === 'single' ? (
              <p className="text-gray-700">{joke.joke}</p>
            ) : (
              <>
                <p className="text-gray-700 font-medium">{joke.setup}</p>
                <p className="text-gray-700 mt-2 font-semibold">{joke.delivery}</p>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">Press the button to hear a joke!</p>
        )}
      </div>
      
      <button
        onClick={fetchJoke}
        disabled={isLoading}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-blue-300 shadow-md transition-colors"
      >
        {isLoading ? 'Loading...' : 'Tell a joke'}
      </button>
    </div>
  );
};

export default HomeClient;
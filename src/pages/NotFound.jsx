import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-12">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-14 flex flex-col items-center animate-fadeIn max-w-xl w-full">
        
        {/* Lottie Animation - larger and responsive */}
        <DotLottieReact
          src="https://lottie.host/3a4d0700-c076-47ec-88f8-470b80ecd5ad/9HVxfDUeSS.lottie"
          loop
          autoplay
          style={{ width: '100%', maxWidth: 400, height: 'auto' }}
        />

        {/* Error Message */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 drop-shadow-lg text-center">
          Oops! Page Not Found
        </h1>
        <p className="text-white/80 mt-4 text-base sm:text-lg text-center max-w-md">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button - bold and animated */}
        <a
          href="/"
          className="mt-8 btn btn-primary text-lg px-10 py-3 rounded-full shadow-xl hover:scale-110 hover:rotate-1 transition duration-300 ease-in-out"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

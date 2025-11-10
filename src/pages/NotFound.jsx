import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4">Page not found.</p>
        <a href="/" className="btn btn-primary mt-6">Go Home</a>
      </div>
    </div>
  );
};
export default NotFound;

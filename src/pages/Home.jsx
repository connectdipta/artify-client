import React from 'react';

const Home = () => {
  return (
    <section className="space-y-6">
      <div className="hero bg-base-200 rounded-xl">
        <div className="hero-content text-center py-12">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">Welcome to Artify</h1>
            <p className="py-4">Discover, share, and celebrate creative artworks.</p>
            <a href="/explore" className="btn btn-primary">Explore Artworks</a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

import HeroSlider from '../components/HeroSlider';
import FeaturedArtworks from '../components/FeaturedArtworks';

const ArtistSpotlight = () => (
  <section className="bg-base-200 p-8 md:p-16 rounded-2xl">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Artist of the Week</h2>
      <p className="text-lg text-base-content/80 mb-6">
        Discover the vibrant and expressive world of 'PixelDreamer', our featured artist. 
        Their collection explores the intersection of nature and technology.
      </p>
      <div className="avatar mb-4">
        <div className="w-24 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
          <img src="httpsT://i.pravatar.cc/150?u=artist-of-week" alt="Artist of the Week" />
        </div>
      </div>
      <h4 className="font-semibold text-xl">PixelDreamer</h4>
      <Link 
        to="/explore?artist=PixelDreamer" 
        className="btn btn-secondary rounded-full mt-6"
      >
        View Their Gallery
      </Link>
    </div>
  </section>
);

const CallToAction = () => (
  <section className="text-center p-8 md:p-16">
    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      Share Your Vision
    </h2>
    <p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
      Have a masterpiece you're ready to share? Join our community of creators 
      and get your artwork featured in front of thousands of art lovers.
    </p>
    <Link 
      to="/add-artwork" 
      className="btn btn-primary btn-lg rounded-full hover:scale-105 transition-transform"
    >
      Upload Your Art
    </Link>
  </section>
);

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      
      <HeroSlider />

      <div className="container mx-auto px-4">
        <FeaturedArtworks />
      </div>

      <div className="container mx-auto px-4">
        <ArtistSpotlight />
      </div>

      <div className="container mx-auto px-4">
        <CallToAction />
      </div>
      
    </div>
  );
}
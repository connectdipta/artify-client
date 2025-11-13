import React from 'react';
import { Link } from 'react-router-dom';
import { Fade, Slide } from "react-awesome-reveal";
import Marquee from "react-fast-marquee";
import HeroSlider from '../components/HeroSlider';
import FeaturedArtworks from '../components/FeaturedArtworks';
import { FiCamera, FiEdit, FiCodepen, FiImage, FiUsers, FiHeart } from 'react-icons/fi';

const CommunityStats = () => (
  <section className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      Our Community in Numbers
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <Fade direction="up" delay={0} triggerOnce>
        <div className="p-8 bg-primary text-primary-content rounded-2xl shadow-lg">
          <FiUsers className="text-5xl mx-auto mb-4" />
          <h3 className="text-4xl font-bold">1,200+</h3>
          <p className="opacity-80">Active Artists</p>
        </div>
      </Fade>
      <Fade direction="up" delay={100} triggerOnce>
        <div className="p-8 bg-secondary text-secondary-content rounded-2xl shadow-lg">
          <FiImage className="text-5xl mx-auto mb-4" />
          <h3 className="text-4xl font-bold">5,400+</h3>
          <p className="opacity-80">Artworks Posted</p>
        </div>
      </Fade>
      <Fade direction="up" delay={200} triggerOnce>
        <div className="p-8 bg-accent text-accent-content rounded-2xl shadow-lg">
          <FiHeart className="text-5xl mx-auto mb-4" />
          <h3 className="text-4xl font-bold">28,000+</h3>
          <p className="opacity-80">Total Likes</p>
        </div>
      </Fade>
    </div>
  </section>
);

const categories = [
  { name: "Painting", icon: FiImage, link: "/explore?category=Painting" },
  { name: "Digital Art", icon: FiCodepen, link: "/explore?category=Digital Art" },
  { name: "Photography", icon: FiCamera, link: "/explore?category=Photography" },
  { name: "Sculpture", icon: FiEdit, link: "/explore?category=Sculpture" },
];

const categoryColors = ["primary", "secondary", "accent", "neutral"];

const ArtCategories = () => (
  <section className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      Explore by Category
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((cat, index) => (
        <Fade key={index} direction="up" delay={index * 100} triggerOnce>
          <Link to={cat.link} className="group">
            <div 
              className={`card bg-${categoryColors[index % 4]} text-${categoryColors[index % 4]}-content shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="card-body items-center text-center">
                <cat.icon className="text-5xl transition-all duration-300 group-hover:scale-125" />
                <h3 className="card-title mt-4">{cat.name}</h3>
                <p className="opacity-80">View the gallery</p>
              </div>
            </div>
          </Link>
        </Fade>
      ))}
    </div>
  </section>
);

const artists = [
  { name: "PixelDreamer", img: "https://i.pinimg.com/1200x/65/2a/ec/652aec00e482bcee4d6714b15e9946d8.jpg", art: "Digital" },
  { name: "ChromaFlow", img: "https://i.pinimg.com/736x/37/ed/bf/37edbf3f9d50c9337daf61d85fc03f93.jpg", art: "Painting" },
  { name: "UrbanLens", img: "https://i.pinimg.com/1200x/48/d9/f3/48d9f32efbaa6bdf1ce09d087e73c11d.jpg", art: "Photography" },
  { name: "SculptCraft", img: "https://i.pinimg.com/1200x/41/cb/9f/41cb9f860907cbf4fb5635e73815e89e.jpg", art: "Sculpture" },
];

const TopArtists = () => (
  <section className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      Top Artists This Week
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {artists.map((artist, index) => (
        <Slide key={index} direction="up" delay={index * 100} triggerOnce>
          <div className="card bg-base-200 shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/30">
            <figure className="h-70">
              <img src={artist.img} alt={artist.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">{artist.name}</h3>
              <span className="badge badge-secondary badge-outline">{artist.art}</span>
            </div>
          </div>
        </Slide>
      ))}
    </div>
  </section>
);

const testimonials = [
  {
    name: "Elena Rodriguez",
    title: "Digital Artist",
    img: "https://i.pravatar.cc/150?u=testimonial1",
    quote: "Artify gave my work the visibility I was dreaming of. The community is so supportive and the UI is beautiful!"
  },
  {
    name: "Marcus Chen",
    title: "Photographer",
    img: "https://i.pravatar.cc/150?u=testimonial2",
    quote: "I love the 'My Gallery' feature. It's like having my own professional portfolio, and the feedback is invaluable."
  },
  {
    name: "Sophie Dubois",
    title: "Painter",
    img: "https://i.pravatar.cc/150?u=testimonial3",
    quote: "The 'Explore' page is my favorite. I've discovered so many inspiring artists. A fantastic platform for art lovers."
  },
  {
    name: "David Kim",
    title: "Sculptor",
    img: "https://i.pravatar.cc/150?u=testimonial4",
    quote: "Adding my 3D sculptures was a breeze. The details page shows them off perfectly. Highly recommend!"
  },
];

const Testimonials = () => (
  <section className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      What Our Community Says
    </h2>
    <Marquee pauseOnHover={true} speed={50}>
      {testimonials.map((item, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl mx-4">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={item.img} alt={item.name} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm opacity-70">{item.title}</p>
              </div>
            </div>
            <div className="rating rating-sm my-2 text-secondary">
              <input type="radio" className="mask mask-star-2" disabled />
              <input type="radio" className="mask mask-star-2" disabled />
              <input type="radio" className="mask mask-star-2" disabled />
              <input type="radio" className="mask mask-star-2" disabled />
              <input type="radio" className="mask mask-star-2" defaultChecked />
            </div>
            <p className="text-base-content/80">{item.quote}</p>
          </div>
        </div>
      ))}
    </Marquee>
  </section>
);

export default function Home() {
  return (
    <div className="pb-16"> 
      
      <div className="pb-16 md:pb-24">
        <HeroSlider />
      </div>

      <div className="bg-base-200 py-16 md:py-24">
        <Fade direction="up" triggerOnce>
          <div className="container mx-auto px-4">
            <FeaturedArtworks />
          </div>
        </Fade>
      </div>
      
      <div className="py-16 md:py-24">
        <CommunityStats />
      </div>

      <div className="bg-base-200 py-16 md:py-24">
        <ArtCategories />
      </div>

      <div className="py-16 md:py-24">
        <TopArtists />
      </div>

      <div className="bg-base-200 py-16 md:py-24">
         <Fade direction="up" triggerOnce>
           <Testimonials />
         </Fade>
      </div>
      
    </div>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { FiArrowRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const swiperStyles = `
  :root {
    --swiper-theme-color: oklch(65% 0.45 260); 
  }
  .swiper-pagination-bullet {
    background-color: white;
    opacity: 0.6;
  }
  .swiper-pagination-bullet-active {
    background-color: var(--swiper-theme-color) !important;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: var(--swiper-theme-color) !important;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    width: 40px !important;
    height: 40px !important;
    transition: all 0.2s ease-in-out;
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.25rem !important;
    font-weight: 900;
  }
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background-color: white;
    transform: scale(1.1);
  }
`;

const slides = [
  {
    image: "https://i.pinimg.com/1200x/bd/11/15/bd1115329e697cf41a21bae1ac712f33.jpg",
    title: "Abstract Dreams",
    description: "Explore the surreal world of color and form.",
    buttonText: "Explore Now",
    buttonLink: "/explore",
  },
  {
    image: "https://i.pinimg.com/1200x/da/89/6f/da896f60e3cc1ff0efec65e9a2dbf6b2.jpg",
    title: "Digital Renaissance",
    description: "Celebrate the fusion of technology and creativity.",
    buttonText: "See The Gallery",
    buttonLink: "/explore",
  },
  {
    image: "https://i.pinimg.com/1200x/d2/ca/11/d2ca119bc2804c1f665c1a2049dce134.jpg",
    title: "Share Your Vision",
    description: "Join our community and upload your own masterpieces.",
    buttonText: "Add Artwork",
    buttonLink: "/add-artwork",
  },
];

const SlideContent = ({ title, description, buttonText, buttonLink }) => {
  const [titleText] = useTypewriter({
    words: [title],
    loop: 1,
    typeSpeed: 70,
  });

  const [descText] = useTypewriter({
    words: [description],
    loop: 1,
    typeSpeed: 30,
    delaySpeed: 1500,
  });

  return (
   <div className="hero-content text-center text-neutral-content">
     <div className="max-w-md">
       <h1 className="mb-5 text-6xl text-[#F5B027] md:text-7xl font-bold  bg-clip-text  drop-shadow-lg">
         {titleText}
       </h1>
       
       <p className="mb-5 text-xl drop-shadow-md">
         {descText}
       </p>
       
       <Link
         to={buttonLink}
         className="btn btn-primary btn-lg rounded-full shadow-lg hover:scale-105 transition-transform"
       >
         {buttonText}
         <FiArrowRight className="ml-1" />
       </Link>
     </div>
   </div>
  );
};

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="container mx-auto px-4 pt-4">
      <style>{swiperStyles}</style>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        effect={'fade'}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="w-full h-[500px] md:h-[700px] rounded-2xl shadow-xl"
        onActiveIndexChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero w-full h-full"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
              {index === activeIndex && (
                <SlideContent 
                  title={slide.title}
                  description={slide.description}
                  buttonText={slide.buttonText}
                  buttonLink={slide.buttonLink}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
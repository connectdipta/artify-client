import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    image: "/images/art1.jpg",
    title: "🎨 Abstract Dreams",
    description: "Explore the surreal world of color and form.",
  },
  {
    image: "/images/art2.jpg",
    title: "🧑‍🎨 Meet Dipto",
    description: "Discover expressive portraits from rising talents.",
  },
  {
    image: "/images/art3.jpg",
    title: "💻 Digital Renaissance",
    description: "Celebrate the fusion of technology and creativity.",
  },
];

const Home = () => {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to Artify</h1>
      <p className="text-center text-lg text-base-content mb-10">
        Discover, share, and celebrate creative artworks from around the world.
      </p>

      {/* 🎨 Auto Slider */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-lg shadow-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
                <h2 className="text-xl font-bold">{slide.title}</h2>
                <p className="text-sm">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;

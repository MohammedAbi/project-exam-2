import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

const slides = [
  {
    title: "Your Luxury Hotel for Vacation",
    bg: "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    btnText: "See our rooms",
  },
  {
    title: "Discover Stunning Venues",
    bg: "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    btnText: "Explore Venues",
  },
  {
    title: "Book Your Perfect Getaway",
    bg: "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    btnText: "Start Booking",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect="fade"
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="heroSlider h-[500px] md:h-[600px] lg:h-[860px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="h-full relative flex justify-center items-center"
        >
          {/* Text Content */}
          <div className="absolute top-1/2 md:top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-white text-center px-4 flex flex-col justify-center items-center">
            <div className="uppercase tracking-[4px] md:tracking-[6px] mb-3 md:mb-5 text-sm md:text-base text-white drop-shadow-lg">
              Just Enjoy and Relax
            </div>
            <h1 className="text-white sm:text-[24px] md:text-[32px] lg:text-[68px] uppercase tracking-[2px] max-w-[90%] md:max-w-[920px] leading-tight mb-5 md:mb-8 drop-shadow-lg">
              {slide.title}
            </h1>
            <button
              onClick={() => {
                const element = document.getElementById("rooms-title");
                if (element) {
                  const isMobile = window.innerWidth < 768;
                  const yOffset = isMobile ? -85 : -120;

                  const y =
                    element.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow transition"
            >
              {slide.btnText}
            </button>
          </div>

          {/* Background Image */}
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={slide.bg}
            alt="Hero Background"
          />

          {/* Overlay */}
          <div className="absolute w-full h-full bg-black/70"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

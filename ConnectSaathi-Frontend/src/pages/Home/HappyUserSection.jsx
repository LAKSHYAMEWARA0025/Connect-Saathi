import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const reviews = [
  {
    name: "Aditi Sharma",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Aditi",
    review:
      "ConnectSaathi made it so easy to find the right teammates for my hackathon project! Smooth and seamless experience.",
  },
  {
    name: "Rohan Mehta",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Rohan",
    review:
      "Loved how I could quickly create a community and find like-minded folks to collaborate with. Highly recommend!",
  },
  {
    name: "Sneha Patel",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Sneha",
    review:
      "The UI is amazing and intuitive. I was able to connect with talented people within minutes!",
  },
  {
    name: "Ankit Verma",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Ankit",
    review:
      "Brilliant platform for discovering and building with tech communities. Kudos to the team!",
  },
  {
    name: "Priya Singh",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya",
    review:
      "Forming a team was never this easy. Loved the design and experience of ConnectSaathi!",
  },
];

export default function HappyUserSection() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.9;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    let newScrollPos =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    // Clamp newScrollPos between 0 and maxScrollLeft
    if (newScrollPos < 0) newScrollPos = 0;
    if (newScrollPos > maxScrollLeft) newScrollPos = maxScrollLeft;

    container.scrollTo({ left: newScrollPos, behavior: "smooth" });
  };

  return (
    <section className="bg-[#ade8f4] py-16" id="happy-users">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#03045e] text-center mb-12">
        What Our Happy Users Say
      </h2>

      <div className="relative px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-[#0077b6] transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6 text-[#0077b6]" />
        </button>

        {/* Reviews Slider */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth no-scrollbar gap-6 pb-4 scroll-snap-x mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {reviews.map(({ name, image, review }, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] rounded-2xl p-5 flex gap-4 items-start
                         transform transition-transform duration-300 ease-in-out
                         bg-gradient-to-br from-[#0077b6ff] via-[#00b4d8ff] to-[#90e0efff]
                         shadow-lg
                         hover:scale-105 hover:shadow-2xl
                         text-white
                         drop-shadow-md
                         scroll-snap-align-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                src={image}
                alt={name}
                className="w-14 h-14 rounded-full object-contain flex-shrink-0 bg-white border-2 border-white/60 p-0.5"
              />
              <div>
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  {name}
                </h3>
                <p className="text-white text-sm sm:text-base mt-2">{review}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-[#0077b6] transition-colors"
        >
          <ChevronRightIcon className="w-6 h-6 text-[#0077b6]" />
        </button>
      </div>
    </section>
  );
}

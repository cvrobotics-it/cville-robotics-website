"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Gallery() {
  const gallery = [
    {
      title: "2023-2024 FTC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2022-2023 FRC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2022-2023 FTC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2021-2022 FRC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2019-2020 FRC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2019-2020 FTC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2018-2019 FRC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2018-2019 FTC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2017-2018 FRC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "STEM Maker Fair",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2017-2018 FTC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2016-2017 FRC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2016-2017 FTC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "2015-2016 FRC",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "Outreach",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
    {
      title: "Life at Robotics",
      images: [
        "https://picsum.photos/id/14/2500/1667",
        "https://picsum.photos/id/15/2500/1667",
        "https://picsum.photos/id/8/5000/3333",
        "https://picsum.photos/id/9/5000/3269",

        "https://picsum.photos/id/12/2500/1667",
        "https://picsum.photos/id/13/2500/1667",
      ],
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-neutral mb-12">
          Photos
        </h1>
        <div className="space-y-12">
          {gallery.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-primary text-center">
                {section.title}
              </h2>
              {/* Centered Carousel */}
              <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                  <Carousel
                    infiniteLoop
                    dynamicHeight={false}
                    autoPlay
                    interval={3000}
                    showArrows
                    showIndicators
                    swipeable
                    transitionTime={700}
                  >
                    {section.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="w-full h-64 flex items-center justify-center"
                      >
                        {/* Ensure the image is centered vertically and horizontally */}
                        <img
                          src={image}
                          alt={`${section.title} Image ${idx + 1}`}
                          width={500}
                          height={300}
                          className="rounded-lg object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

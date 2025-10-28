"use client";
import React from "react";
import {

FaPaintBrush,
FaLightbulb,
FaUtensils,
FaCamera,
FaWhatsapp,
} from "react-icons/fa";

type Service = {
id: string;
image: string;
title: string;
subtitle?: string;
icon?: React.ElementType;
description: string;
link?: string;
buttonText?: string;
};

const services: Service[] = [
{
  id: "decoration",
  image: "/images/services/web-development.jpg",
  title: "Event Decoration",
  subtitle: "Elegant & Thematic Designs",
  icon: FaPaintBrush,
  description:
    "Transform your event space with our exquisite decoration services — custom themes, luxe details, and flawless installation to bring your vision to life.",
  link: "/portfolio/decoration",
  buttonText: "View Portfolio",
},
{
  id: "lighting",
  image: "/images/services/lighting.jpg",
  title: "Lighting & AV",
  subtitle: "Ambience & Sound",
  icon: FaLightbulb,
  description:
    "Professional lighting and audio-visual setups that create atmosphere and ensure every moment is seen and heard clearly.",
  link: "/portfolio/lighting",
  buttonText: "See Setups",
},
{
  id: "catering",
  image: "/images/services/catering.jpg",
  title: "Catering",
  subtitle: "Gourmet Menus",
  icon: FaUtensils,
  description:
    "Curated menus and impeccable service — from canapé receptions to plated dinners, tailored to your tastes and dietary needs.",
  link: "/portfolio/catering",
  buttonText: "Explore Menus",
},
{
  id: "photography",
  image: "/images/services/photography.jpg",
  title: "Photography & Videography",
  subtitle: "Capture Every Moment",
  icon: FaCamera,
  description:
    "Cinematic photo and video coverage that preserves the emotion and detail of your event for years to come.",
  link: "/portfolio/photography",
  buttonText: "View Work",
},
];

function truncate(text: string, max = 140) {
return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export default function Services() {
const whatsappLink =
  "https://wa.me/1234567890?text=Hi!%20I'd%20like%20to%20see%20your%20full%20catalog.";

return (
  <section className="px-6 py-10 max-w-7xl mx-auto font-sans lg:h-screen">
    <header className="mb-8 text-center">
      <h2 className="text-3xl font-semibold mb-2">Our Services</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Explore our curated services — bespoke decoration, lighting & AV,
        catering, and media coverage. Click any card to learn more.
      </p>
    </header>

    <div
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="list"
    >
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <article
            key={s.id}
            role="listitem"
            aria-labelledby={`svc-${s.id}-title`}
            className="group bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow -z-10"
          >
            <div className="relative w-full pt-[56%] bg-gray-50">
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {Icon && (
                <div className="absolute left-4 top-4 bg-white/90 rounded-full p-2 border border-gray-100 text-blue-600 shadow-sm">
                  <Icon className="w-5 h-5" aria-hidden />
                </div>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col">
              {s.subtitle && (
                <p className="text-sm text-blue-600 font-medium mb-1">
                  {s.subtitle}
                </p>
              )}

              <h3
                id={`svc-${s.id}-title`}
                className="text-lg font-semibold text-gray-900 mb-2"
              >
                {s.title}
              </h3>

              <p className="text-sm text-gray-600 flex-1 mb-4">
                {truncate(s.description, 140)}
              </p>

              <div className="mt-auto flex items-center gap-3">
                <a
                  href={s.link ?? "#"}
                  className="inline-flex items-center px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                >
                  {s.buttonText ?? "Learn More"}
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                  aria-label={`Contact about ${s.title} on WhatsApp`}
                >
                  <FaWhatsapp className="mr-2 text-green-600" />
                  Contact
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>

    <div className="mt-8 flex justify-center">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-5 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700"
      >
        <FaWhatsapp className="w-5 h-5" />
        View Full Catalog on WhatsApp
      </a>
    </div>
  </section>
);
}
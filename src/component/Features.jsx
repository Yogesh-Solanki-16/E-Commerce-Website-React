import React from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = () => {
  return (
    <section className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div data-aos="zoom-in-up" className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4"
            >
              <feature.icon
                className="w-10 h-10 text-red-500 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {feature.text}
                </p>
                <p className="text-sm text-gray-600">{feature.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
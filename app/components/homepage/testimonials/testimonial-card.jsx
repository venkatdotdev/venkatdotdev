import * as React from 'react';
import Image from 'next/image';

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-[#2F2F2F] border-[#1b2c68a0] relative rounded-lg shadow-lg w-[300px] mx-2">
      {/* Gradient Borders */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-4">
        {/* Header with Image and Name */}
        <div className="flex items-start space-x-4">
          <Image
            src={testimonial.image}
            alt={`${testimonial.name}'s Image`}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-[#16f2b3] text-lg font-semibold">{testimonial.name}</p>
            <p className="text-gray-400 text-sm">{testimonial.position}</p>
          </div>
        </div>
        {/* Message */}
        <p className="mt-4 text-gray-300 text-sm italic">{`"${testimonial.message}"`}</p>
        {/* Date */}
        <p className="mt-2 text-[#ffbf00] text-xs text-right">{testimonial.date}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;

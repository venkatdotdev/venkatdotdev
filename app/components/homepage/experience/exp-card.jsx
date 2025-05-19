import * as React from 'react';
import Image from 'next/image';
import { FaCode } from 'react-icons/fa';

function ExpCard({ exp }) {
  return (
    <div className="bg-[#2F2F2F] border-[#1b2c68a0] relative rounded-lg">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
  <div className="flex items-center space-x-2">
    {/* First set of 3 divs */}
    <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
    <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
    <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-[#23950A]"></div>

    {/* Image and company */}
    <div className="flex items-center space-x-2">
      <Image
        src={exp.image}  // Company logo image URL
        alt="Company Logo"
        width={50}        // Image size width
        height={50}       // Image size height
        className="rounded-full"  // Optional: makes the logo circular
      />
      <p className="text-center ml-3 text-[#fff] text-base lg:text-xl">
        {exp.company}
      </p>
    </div>
  </div>
</div>


      <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-white">job</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-gray-400">{'{'}</span>
          </div>

          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">myRole:</span>
            <span className="text-orange-400">{exp.title}</span>
            <span className="text-gray-400">,</span>
          </div>

          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">duration:</span>
            <span className="text-orange-400">{exp.duration}</span>
            <span className="text-gray-400">,</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-white">tools:</span>
            <span className="text-gray-400">{` ['`}</span>
            {
              exp.tools.map((tag, i) => (
                <React.Fragment key={i}>
                  <span className="text-amber-300">{tag}</span>
                  {
                    exp.tools?.length - 1 !== i &&
                    <span className="text-gray-400">{`', '`}</span>
                  }
                </React.Fragment>
              ))
            }
            <span className="text-gray-400">{"],"}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-white">Description:</span>
            <span className="text-cyan-400">{' ' + exp.description}</span>
            <span className="text-gray-400"></span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-white">Responsibilities:</span>
            <span className="text-cyan-400">{' ' + exp.keyresponsibilities}</span>
            <span className="text-gray-400"></span>
          </div>
          <div><span className="text-gray-400">{`};`}</span></div>
        </code>
      </div>
    </div>
  );
};

export default ExpCard;

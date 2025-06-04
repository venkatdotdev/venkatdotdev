// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";


function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative ">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#2F2F2F] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#2F2F2F]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-bold mb-5 text-[#008080] text-xl uppercase">
            Who am I?
          </p>
          <p className="text-black text-justify text-sm lg:text-lg mb-6">
            {personalData.description}
          </p>

          <p className="text-black  text-justify text-sm lg:text-lg">
            {personalData.description2}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <Image
            src="https://cryptexblobs.blob.core.windows.net/venkat/08.jpg"
            width={370}
            height={300}
            alt="VENKATRAMAN NAGARAJAN"
            className="rounded-lg transition-all duration-1000 hover:scale-110 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
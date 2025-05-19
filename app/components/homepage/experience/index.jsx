import { experiences } from "@/utils/data/experience"; // Assuming you have project data
import Image from "next/image";
import { FaCode } from "react-icons/fa";
import ExpCard from "./exp-card.jsx"

function Experience() {
  return (
    <div id='expereince' className="relative z-50  my-12 lg:my-24">
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl  opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#2F2F2F] absolute left-0  w-fit text-white px-5 py-3 text-xl rounded-md">
            EXPERIENCE
          </span>
          <span className="w-full h-[2px] bg-[#2F2F2F]"></span>
        </div>
      </div>

      <div className="pt-24">
        <div className="flex flex-col gap-6">
          {experiences.map((experience, index) => (
            <div
              id={`sticky-card-${index + 1}`}
              key={index}
              className="sticky-card w-full mx-auto max-w-2xl sticky"
            >
              <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
                <ExpCard exp={experience} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;

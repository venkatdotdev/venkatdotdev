"use client";
import { educations } from "@/utils/data/educations";
import Image from "next/image";
import { BsCalendar3, BsMortarboardFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

const degreeColors = [
  { accent: 'from-[#054bad] to-violet-500', badge: 'bg-violet-50 text-violet-700 border-violet-200', gpaColor: 'text-[#054bad]' },
  { accent: 'from-teal-500 to-[#008080]',   badge: 'bg-teal-50  text-teal-700  border-teal-200',   gpaColor: 'text-teal-600'   },
];

function Education() {
  return (
    <div id="education" className="relative z-50 my-12 lg:my-24">
      <div className="flex items-center gap-4 mb-10">
        <span className="bg-[#0f1117] w-fit text-white px-5 py-3 text-xl font-bold rounded-md tracking-wide font-mono">
          &gt; EDUCATION
        </span>
        <span className="flex-1 h-[2px] bg-gradient-to-r from-[#054bad]/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educations.map((edu, index) => {
          const c = degreeColors[index % degreeColors.length];
          return (
            <div key={edu.id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">

              {/* Gradient top bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${c.accent}`} />

              <div className="p-6">
                {/* Duration pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                    <BsCalendar3 size={10} />
                    {edu.duration}
                  </span>
                  <MdVerified size={18} className="text-gray-300 group-hover:text-[#054bad] transition-colors duration-300" />
                </div>

                {/* Degree + institution row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BsMortarboardFill size={16} className="text-[#054bad] shrink-0" />
                      <span className={`text-[11px] font-semibold uppercase tracking-wider border px-2 py-0.5 rounded-full ${c.badge}`}>
                        {index === 0 ? 'Post Graduate' : 'Under Graduate'}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-gray-900 leading-snug mb-1">
                      {edu.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-snug mb-3">
                      {edu.institution}
                    </p>
                    <p className={`text-sm font-bold ${c.gpaColor}`}>
                      {edu.gpa}
                    </p>
                  </div>

                  {/* University logo */}
                  <div className="shrink-0 h-20 w-20 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden p-1">
                    <Image
                      src={edu.image}
                      alt={edu.institution}
                      width={72}
                      height={72}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Education;

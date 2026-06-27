"use client";

import { useState } from "react";
import Image from "next/image";
import { skillGroups } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import { VscFolder, VscFolderOpened } from "react-icons/vsc";
import { BsChevronRight, BsRobot } from "react-icons/bs";
import { SiGithub } from "react-icons/si";

const aiIcons = {
  'GitHub Copilot': <SiGithub size={16} />,
  'Claude':         <BsRobot size={16} />,
  'ChatGPT':        <BsRobot size={16} />,
};

const colorMap = {
  sky: {
    text: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-500/30",
    activeSidebar: "bg-sky-500/10 border-l-2 border-l-sky-400 text-sky-300",
    folder: "text-sky-400",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-500/30",
    activeSidebar: "bg-violet-500/10 border-l-2 border-l-violet-400 text-violet-300",
    folder: "text-violet-400",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-500/30",
    activeSidebar: "bg-amber-500/10 border-l-2 border-l-amber-400 text-amber-300",
    folder: "text-amber-400",
  },
  green: {
    text: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-500/30",
    activeSidebar: "bg-green-500/10 border-l-2 border-l-green-400 text-green-300",
    folder: "text-green-400",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-500/30",
    activeSidebar: "bg-pink-500/10 border-l-2 border-l-pink-400 text-pink-300",
    folder: "text-pink-400",
  },
};

function SkillPill({ skill, color }) {
  const img = skillsImage(skill);
  const c = colorMap[color];
  const aiIcon = aiIcons[skill];
  return (
    <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-default
      hover:scale-105 transition-all duration-200 hover:shadow-lg
      ${c.bg} ${c.border}`}>
      {aiIcon ? (
        <span className={c.text}>{aiIcon}</span>
      ) : img?.src ? (
        <Image src={img.src} alt={skill} width={20} height={20} className="w-5 h-5 object-contain" />
      ) : (
        <span className={`text-xs font-mono font-bold ${c.text}`}>&lt;/&gt;</span>
      )}
      <span className={`text-sm font-mono font-medium ${c.text}`}>{skill}</span>
    </div>
  );
}

function Skills() {
  const [active, setActive] = useState("languages");
  const activeGroup = skillGroups.find((g) => g.key === active);
  const c = colorMap[activeGroup.color];

  return (
    <div id="skills" className="relative z-50 my-12 lg:my-24">
      <div className="flex items-center gap-4 mb-10">
        <span className="bg-[#0f1117] w-fit text-white px-5 py-3 text-xl font-bold rounded-md tracking-wide font-mono">
          &gt; SKILLS
        </span>
        <span className="flex-1 h-[2px] bg-gradient-to-r from-[#054bad]/50 to-transparent" />
      </div>

      {/* Terminal window */}
      <div className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl bg-[#0a0e1a]">

        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-5 py-3 bg-[#111520] border-b border-white/5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
          <div className="ml-3 flex items-center gap-2 font-mono text-[12px]">
            <span className="text-green-400">venkat</span>
            <span className="text-gray-600">@</span>
            <span className="text-sky-400">portfolio</span>
            <span className="text-gray-600">:</span>
            <span className="text-violet-400">~/skills</span>
          </div>
          <span className="ml-auto font-mono text-[11px] text-gray-600 hidden sm:block">
            — skills explorer
          </span>
        </div>

        {/* Split pane */}
        <div className="flex flex-col sm:flex-row min-h-[280px]">

          {/* Sidebar */}
          <div className="sm:w-52 shrink-0 border-b sm:border-b-0 sm:border-r border-white/5 bg-[#0d1120] p-3">
            <p className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-3 px-2">
              Explorer
            </p>
            <div className="flex items-center gap-1 font-mono text-[11px] text-gray-500 mb-2 px-2">
              <BsChevronRight size={10} className="rotate-90" />
              <span className="tracking-wider">SKILLS</span>
            </div>

            <div className="flex sm:flex-col flex-row flex-wrap gap-0.5 pl-0 sm:pl-3">
              {skillGroups.map((group) => {
                const isActive = active === group.key;
                const gc = colorMap[group.color];
                return (
                  <button
                    key={group.key}
                    onClick={() => setActive(group.key)}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[12px] font-mono transition-all duration-200 text-left
                      ${isActive
                        ? gc.activeSidebar
                        : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                      }`}
                  >
                    {isActive
                      ? <VscFolderOpened size={14} className={gc.folder} />
                      : <VscFolder size={14} />
                    }
                    {group.label}
                  </button>
                );
              })}
            </div>

            {/* Bottom stats */}
            <div className="hidden sm:block mt-auto pt-6 px-2 font-mono text-[10px] text-gray-700">
              <div>{skillGroups.reduce((a, g) => a + g.skills.length, 0)} skills total</div>
              <div>{activeGroup.skills.length} in this group</div>
            </div>
          </div>

          {/* Content pane */}
          <div className="flex-1 p-6">
            {/* File header bar */}
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
              <div className={`text-[11px] font-mono px-3 py-1 rounded-full border ${c.bg} ${c.border} ${c.text}`}>
                {activeGroup.label}.ts
              </div>
            </div>

            <p className={`font-mono text-[12px] mb-5 ${c.text} opacity-50`}>
              {activeGroup.comment}
            </p>

            <div className="flex flex-wrap gap-3">
              {activeGroup.skills.map((skill) => (
                <SkillPill key={skill} skill={skill} color={activeGroup.color} />
              ))}
            </div>

            {/* Blinking cursor at bottom */}
            <div className="flex items-center gap-1 mt-8 font-mono text-[12px] text-gray-600">
              <span>{active}.ts</span>
              <span className="text-gray-700">·</span>
              <span>{activeGroup.skills.length} exports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;

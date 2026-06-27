"use client";
import Image from "next/image";
import { experiences } from "@/utils/data/experience";

function fakeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = Math.imul(31, h) + str.charCodeAt(i) | 0; }
  return Math.abs(h).toString(16).substring(0, 7).padEnd(7, "0");
}

function splitResponsibilities(text) {
  if (!text) return [];
  return text.split(/\.(?=[A-Z])/).map(s => s.trim().replace(/\.$/, "")).filter(s => s.length > 10);
}

const commits = [
  { branch: "HEAD → main", tag: "ups-healthcare",        lineColor: "#22c55e", tagBg: "bg-green-500/15  border-green-500/40  text-green-300",  headBg: "bg-emerald-500/20 border-emerald-400/50 text-emerald-300", feat: "healthcare" },
  { branch: "origin/ltimindtree",                        tag: "v3-ltimindtree",  lineColor: "#f59e0b", tagBg: "bg-amber-500/15  border-amber-500/40  text-amber-300",  headBg: null, feat: "cloud" },
  { branch: "origin/datasoftware",                       tag: "v2-datasoftware", lineColor: "#a78bfa", tagBg: "bg-violet-500/15 border-violet-500/40 text-violet-300", headBg: null, feat: "retail" },
  { branch: "origin/netmeds",                            tag: "v1-netmeds",      lineColor: "#f472b6", tagBg: "bg-pink-500/15   border-pink-500/40   text-pink-300",   headBg: null, feat: "ecommerce" },
];

function CommitEntry({ exp, meta, isLast }) {
  const hash    = fakeHash(exp.company);
  const bullets = splitResponsibilities(exp.keyresponsibilities);
  const isHead  = !!meta.headBg;

  return (
    <div className="flex gap-0">
      {/* ── Graph column ── */}
      <div className="flex flex-col items-center w-8 shrink-0 select-none">
        {/* commit dot */}
        <div
          className="h-3 w-3 rounded-full mt-[5px] z-10 shrink-0 ring-2 ring-[#0a0e1a]"
          style={{ backgroundColor: meta.lineColor }}
        />
        {/* connector line */}
        {!isLast && (
          <div className="flex-1 w-px mt-1" style={{ background: `linear-gradient(to bottom, ${meta.lineColor}88, ${meta.lineColor}22)` }} />
        )}
      </div>

      {/* ── Commit body ── */}
      <div className="flex-1 pb-9 pl-4 min-w-0">

        {/* commit hash + branch labels */}
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="font-mono text-amber-400 text-[13px]">commit <span className="opacity-80">{hash}</span></span>
          {isHead && (
            <span className={`font-mono text-[11px] border rounded px-2 py-0.5 ${meta.headBg}`}>
              HEAD → main
            </span>
          )}
          <span className={`font-mono text-[11px] border rounded px-2 py-0.5 ${meta.tagBg}`}>
            {meta.branch}
          </span>
          {isHead && (
            <span className="flex items-center gap-1 font-mono text-[10px] text-green-300 bg-green-500/10 border border-green-500/25 rounded px-2 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              ACTIVE
            </span>
          )}
        </div>

        {/* author + date */}
        <div className="font-mono text-[11px] text-gray-600 leading-relaxed">
          <span className="text-gray-500">Author: </span>Venkatraman Nagarajan
        </div>
        <div className="font-mono text-[11px] text-gray-600 mb-3 leading-relaxed">
          <span className="text-gray-500">Date:   </span>{exp.duration}
        </div>

        {/* commit message line */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-9 w-9 rounded-md border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center shrink-0">
            <Image src={exp.image} alt={exp.company} width={32} height={32} className="object-contain" />
          </div>
          <p className="font-mono text-white text-sm font-semibold leading-snug">
            <span className="text-sky-400">feat({meta.feat})</span>
            <span className="text-gray-500">: </span>
            {exp.title} — {exp.company}
          </p>
        </div>

        {/* diff-style responsibilities */}
        {bullets.length > 0 && (
          <div className="space-y-[3px] mb-3 pl-1">
            {bullets.map((b, i) => (
              <div key={i} className="flex gap-2 font-mono text-[12px] leading-relaxed">
                <span className="text-green-400 shrink-0 select-none">+</span>
                <span className="text-green-300/80">{b}.</span>
              </div>
            ))}
            <div className="flex gap-2 font-mono text-[12px]">
              <span className="text-gray-600 shrink-0 select-none">~</span>
              <span className="text-gray-600 italic">{exp.tools.length} technologies modified</span>
            </div>
          </div>
        )}

        {/* "files changed" footer */}
        <div className="font-mono text-[11px] text-gray-600 mb-2">
          {bullets.length} insertions(+) · {exp.tools.length} files changed
        </div>

        {/* tech as diff file names */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {exp.tools.map((tool, i) => (
            <span key={i} className="font-mono text-[11px] text-sky-400/80 hover:text-sky-300 transition-colors cursor-default">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <div id="experience" className="relative z-50 my-12 lg:my-24">
      <div className="flex items-center gap-4 mb-10">
        <span className="bg-[#0f1117] w-fit text-white px-5 py-3 text-xl font-bold rounded-md tracking-wide font-mono">
          &gt; EXPERIENCE
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
            <span className="text-violet-400">~/career</span>
          </div>
          <span className="ml-auto font-mono text-[11px] text-gray-600 hidden sm:block">git log --graph --decorate --format=fuller</span>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7">

          {/* prompt line */}
          <div className="flex items-center gap-2 mb-7 font-mono text-[13px]">
            <span className="text-green-400">$</span>
            <span className="text-gray-300">git log</span>
            <span className="text-amber-400">--graph</span>
            <span className="text-amber-400">--decorate</span>
            <span className="text-amber-400">--format=fuller</span>
            <span className="text-gray-400">career.json</span>
          </div>

          {/* commits */}
          {experiences.map((exp, index) => (
            <CommitEntry
              key={exp.id}
              exp={exp}
              meta={commits[index] ?? commits[commits.length - 1]}
              isLast={index === experiences.length - 1}
            />
          ))}

          {/* blinking cursor */}
          <div className="flex items-center gap-2 font-mono text-[13px] mt-1">
            <span className="text-green-400">$</span>
            <span className="h-4 w-2 bg-green-400/70 animate-pulse rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;

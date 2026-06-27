import * as React from 'react';
import Image from 'next/image';
import { BsCalendar3 } from 'react-icons/bs';
import { VscTriangleRight } from 'react-icons/vsc';

function splitResponsibilities(text) {
  if (!text) return [];
  return text
    .split(/\.(?=[A-Z])/)
    .map((s) => s.trim().replace(/\.$/, ''))
    .filter((s) => s.length > 10);
}

export function FeaturedExpCard({ exp }) {
  const bullets = splitResponsibilities(exp.keyresponsibilities);

  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0f1e] via-[#0f1a35] to-[#0d1420] border border-[#054bad]/25 shadow-2xl mb-6 relative">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/3 w-64 h-32 bg-[#054bad]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-24 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative p-6 sm:p-8">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
              <Image src={exp.image} alt={exp.company} width={48} height={48} className="object-contain" />
            </div>
            <div>
              <p className="text-white text-xl font-black tracking-tight">{exp.company}</p>
              <p className="text-sky-400 text-sm font-mono mt-0.5">{exp.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs font-mono">
              <BsCalendar3 size={11} />
              {exp.duration}
            </div>
            <span className="flex items-center gap-1.5 text-green-300 bg-green-400/10 border border-green-400/25 rounded-full px-3 py-1.5 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              CURRENT ROLE
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#054bad]/50 via-white/10 to-transparent mb-6"></div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6">{exp.description}</p>

        {/* Responsibilities in 2-col grid */}
        {bullets.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <VscTriangleRight size={12} className="mt-1 shrink-0 text-[#054bad]" />
                <span>{b}.</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {exp.tools.map((tool, i) => (
            <span key={i}
              className="text-[11px] font-mono font-medium bg-white/5 hover:bg-[#054bad]/20 border border-white/10 hover:border-[#054bad]/40 text-gray-300 hover:text-sky-300 px-3 py-1 rounded-md transition-colors duration-200 cursor-default">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CompactExpCard({ exp }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col group">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg border border-gray-100 bg-gray-50 overflow-hidden flex items-center justify-center shrink-0">
          <Image src={exp.image} alt={exp.company} width={32} height={32} className="object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm leading-snug truncate">{exp.company}</p>
          <p className="text-[#054bad] text-[11px] font-mono mt-0.5 truncate">{exp.title}</p>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono mb-3">
        <BsCalendar3 size={9} />
        {exp.duration}
      </div>

      {/* Description — clipped */}
      <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">{exp.description}</p>

      {/* Tech — show first 5 */}
      <div className="flex flex-wrap gap-1 pt-3 border-t border-dashed border-gray-100">
        {exp.tools.slice(0, 5).map((tool, i) => (
          <span key={i}
            className="text-[10px] font-mono bg-gray-50 border border-gray-200 text-gray-600 group-hover:border-[#054bad]/30 group-hover:text-[#054bad] px-2 py-0.5 rounded transition-colors duration-200">
            {tool}
          </span>
        ))}
        {exp.tools.length > 5 && (
          <span className="text-[10px] text-gray-400 font-mono px-1 py-0.5">+{exp.tools.length - 5}</span>
        )}
      </div>
    </div>
  );
}

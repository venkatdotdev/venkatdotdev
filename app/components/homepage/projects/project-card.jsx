import { VscRepo, VscCode } from 'react-icons/vsc';
import { BsStarFill } from 'react-icons/bs';

function ProjectCard({ project }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#1e2840] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-[#0a0e1a] flex flex-col group">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 font-mono text-[12px] min-w-0">
            <VscRepo size={13} className="text-gray-600 shrink-0" />
            <span className="text-gray-600">venkatase</span>
            <span className="text-gray-700">/</span>
            <span className="text-gray-200 font-semibold truncate">{project.name}</span>
          </div>
          <BsStarFill size={12} className="text-amber-400 shrink-0 mt-0.5" />
        </div>

        {project.role && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-sky-300 bg-sky-400/10 border border-sky-400/20 px-2.5 py-1 rounded-full">
            <VscCode size={11} />
            {project.role}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="px-5 py-4 flex-1">
        <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-4">
          {project.description}
        </p>
      </div>

      {/* Tech tags — unified green monospace */}
      <div className="px-5 pb-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
        {project.tools.map((tool, i) => (
          <span key={i}
            className="font-mono text-[11px] text-green-400/80 border border-green-400/15 bg-green-400/5 group-hover:border-green-400/30 group-hover:text-green-300 px-2 py-0.5 rounded transition-colors duration-200">
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;

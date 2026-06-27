import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

const Projects = () => {
  return (
    <div id="projects" className="relative z-50 my-12 lg:my-24">
      <div className="flex items-center gap-4 mb-10">
        <span className="bg-[#0f1117] w-fit text-white px-5 py-3 text-xl font-bold rounded-md tracking-wide font-mono">
          &gt; PROJECTS
        </span>
        <span className="flex-1 h-[2px] bg-gradient-to-r from-[#054bad]/50 to-transparent"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

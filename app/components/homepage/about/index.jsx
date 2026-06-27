import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { BsBriefcaseFill, BsBuildingsFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { HiOutlineCode } from "react-icons/hi";
import { TbCloudCode, TbBrandAzure, TbApi } from "react-icons/tb";
import { SiDotnet } from "react-icons/si";
import { BsRobot } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";

const stats = [
  { label: 'Years Experience',    value: '10+', icon: <HiOutlineCode size={20} />,    gradient: 'from-blue-500 to-cyan-400' },
  { label: 'Companies',           value: '4',   icon: <BsBuildingsFill size={18} />,  gradient: 'from-violet-500 to-purple-400' },
  { label: 'Projects Delivered',  value: '10+', icon: <BsBriefcaseFill size={18} />,  gradient: 'from-teal-500 to-green-400' },
  { label: 'Certifications',      value: '2',   icon: <MdVerified size={20} />,       gradient: 'from-orange-500 to-amber-400' },
];

const highlights = [
  {
    icon: <SiDotnet size={18} />,
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    label: '.NET Core & C#',
    detail: '10+ years — enterprise APIs, microservices, clean architecture',
  },
  {
    icon: <TbBrandAzure size={18} />,
    color: 'text-[#0078d4]',
    bg: 'bg-blue-50',
    label: 'Azure Cloud',
    detail: 'AZ-900 certified — Service Bus, AKS, Functions, Azure DevOps',
  },
  {
    icon: <TbApi size={18} />,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    label: 'Microservices & APIs',
    detail: 'Event-driven architecture, REST APIs, high-throughput distributed systems',
  },
  {
    icon: <VscGraph size={18} />,
    color: 'text-green-600',
    bg: 'bg-green-50',
    label: 'Data & Performance',
    detail: 'SQL Server, MongoDB — query optimisation for high-volume workloads',
  },
  {
    icon: <BsRobot size={18} />,
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    label: 'AI-Assisted Development',
    detail: 'GitHub Copilot & Claude — daily pair programming and code review',
  },
  {
    icon: <TbCloudCode size={18} />,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    label: 'Healthcare & Supply Chain',
    detail: 'WMS platforms, logistics systems, regulated-domain software delivery',
  },
];

function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-20 relative">
      {/* Side label */}
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#0f1117] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md font-bold tracking-widest">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#0f1117]"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        {/* Photo column */}
        <div className="flex justify-center order-1 lg:order-2 lg:sticky lg:top-24">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-[#054bad] via-violet-500 to-[#008080] opacity-70 blur-sm"></div>
            <div className="relative rounded-2xl p-1 bg-white">
              <Image
                src={personalData.profile}
                width={340}
                height={380}
                alt="Venkatraman Nagarajan"
                className="rounded-xl object-cover shadow-xl"
                style={{ aspectRatio: '3/4', objectPosition: 'top' }}
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#054bad] to-[#008080] flex items-center justify-center">
                <HiOutlineCode size={20} className="text-white" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-gray-900 leading-none">10+</p>
                <p className="text-xs text-gray-500">Years of Experience</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl border border-gray-100 px-3 py-2 flex items-center gap-1.5">
              <MdVerified size={18} className="text-[#0078d4]" />
              <span className="text-xs font-bold text-gray-700">Azure &amp; GitHub Certified</span>
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="order-2 lg:order-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#008080] mb-2">Get to know me</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Who am I?
          </h2>

          {/* One-liner quote */}
          <blockquote className="border-l-4 border-[#054bad] pl-4 mb-6 italic text-gray-500 text-sm leading-relaxed">
            &ldquo;I architect enterprise systems that are built to last — not just to ship.&rdquo;
          </blockquote>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Senior Full Stack Engineer with 10+ years delivering enterprise-grade software across
            financial services, retail, and healthcare domains. I specialise in <strong className="text-gray-800">.NET Core, C#,
            Azure cloud services, and microservices</strong> — with a strong track record of building secure,
            scalable, high-performance systems that hold up under real-world pressure.
          </p>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow duration-200">
                <div className={`shrink-0 h-8 w-8 rounded-lg ${h.bg} ${h.color} flex items-center justify-center`}>
                  {h.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-snug">{h.label}</p>
                  <p className="text-xs text-gray-500 leading-snug mt-0.5">{h.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label}
                className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 p-4 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className={`inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br ${stat.gradient} text-white mb-2`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 leading-tight mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;

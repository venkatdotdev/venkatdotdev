// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { HiOutlineChip } from "react-icons/hi";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
        priority
      />

      <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-12 gap-y-8">
        {/* LEFT — intro text */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">

          <div className="mb-4 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-[#054bad]">Available for opportunities</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 lg:text-5xl lg:leading-[1.15]">
            Hi, I&apos;m <br />
            <span className="bg-gradient-to-r from-[#054bad] to-[#008080] bg-clip-text text-transparent">
              Venkatraman
            </span>
          </h1>

          <p className="mt-3 text-lg font-semibold text-gray-600 lg:text-xl">
            Senior Full Stack Engineer
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-[#008080]">Cloud &amp; .NET Specialist</span>
          </p>

          <p className="mt-4 text-gray-500 text-sm lg:text-base leading-relaxed max-w-md">
            10+ years building enterprise systems across FinTech, Healthcare &amp; Retail.
            Expert in <strong className="text-gray-700">.NET Core</strong>, <strong className="text-gray-700">Azure</strong> cloud, and <strong className="text-gray-700">microservices</strong> architecture.
          </p>

          {/* Tech pill strip */}
          <div className="mt-5 flex flex-wrap gap-2">
            {['C# / .NET Core', 'Azure', 'React', 'Microservices', 'SQL', 'Docker'].map((t) => (
              <span key={t} className="text-xs font-medium bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full shadow-sm">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Link href={personalData.linkedIn} target="_blank" aria-label="LinkedIn"
              className="flex items-center gap-2 text-sm font-semibold bg-[#0a66c2] text-white px-4 py-2 rounded-full hover:opacity-90 transition-all duration-200">
              <BsLinkedin size={16} />
              <span>LinkedIn</span>
            </Link>
            <Link href={personalData.github} target="_blank" aria-label="GitHub"
              className="flex items-center gap-2 text-sm font-semibold bg-[#171515] text-white px-4 py-2 rounded-full hover:opacity-90 transition-all duration-200">
              <BsGithub size={16} />
              <span>GitHub</span>
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link href="#contact"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#054bad] to-[#008080] rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:opacity-95 transition-all duration-300">
              <RiContactsFill size={16} />
              <span>Contact Me</span>
            </Link>
            <Link href={personalData.resume} target="_blank"
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#054bad] rounded-full text-[#054bad] text-sm font-semibold hover:bg-blue-50 transition-all duration-300">
              <MdDownload size={16} />
              <span>Resume</span>
            </Link>
          </div>
        </div>

        {/* RIGHT — code card */}
        <div className="order-1 lg:order-2 relative">
          {/* Glow blob behind card */}
          <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 via-violet-400/20 to-teal-400/20 rounded-2xl blur-2xl -z-10"></div>

          <div className="bg-[#0f1117] border border-[#1e2533] rounded-2xl shadow-2xl overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1e2533] bg-[#0a0e17]">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="ml-3 text-xs text-gray-500 font-mono">profile.ts</span>
              <span className="ml-auto flex items-center gap-1 text-xs text-green-400 font-mono">
                <HiOutlineChip size={12} />
                <span>TypeScript</span>
              </span>
            </div>

            <div className="px-5 lg:px-8 py-6 lg:py-8 font-mono text-xs md:text-sm leading-7 overflow-x-auto">
              <div>
                <span className="text-pink-400">const </span>
                <span className="text-sky-300">engineer</span>
                <span className="text-pink-400"> = </span>
                <span className="text-gray-500">{'{'}</span>
              </div>
              {[
                { key: 'name',         val: '"Venkatraman Nagarajan"',   color: 'text-amber-300' },
                { key: 'experience',   val: '"10+ Years"',               color: 'text-green-400' },
                { key: 'currentRole',  val: '"Senior Full Stack Dev"',   color: 'text-amber-300' },
              ].map(({ key, val, color }) => (
                <div key={key} className="ml-6">
                  <span className="text-sky-400">{key}</span>
                  <span className="text-gray-500">: </span>
                  <span className={color}>{val}</span>
                  <span className="text-gray-500">,</span>
                </div>
              ))}

              <div className="ml-6">
                <span className="text-sky-400">stack</span>
                <span className="text-gray-500">{": ['"}
                </span>
                {['C#', '.NET Core', 'React', 'Azure', 'SQL'].map((s, i, a) => (
                  <span key={s}>
                    <span className="text-amber-300">{s}</span>
                    {i < a.length - 1 && <span className="text-gray-500">{"', '"}</span>}
                  </span>
                ))}
                <span className="text-gray-500">{"'],"}
                </span>
              </div>

              <div className="ml-6">
                <span className="text-sky-400">domains</span>
                <span className="text-gray-500">{": ['"}
                </span>
                {['FinTech', 'Healthcare WMS', 'Retail ERP'].map((d, i, a) => (
                  <span key={d}>
                    <span className="text-green-400">{d}</span>
                    {i < a.length - 1 && <span className="text-gray-500">{"', '"}</span>}
                  </span>
                ))}
                <span className="text-gray-500">{"'],"}
                </span>
              </div>

              <div className="ml-6">
                <span className="text-sky-400">cloud</span>
                <span className="text-gray-500">: </span>
                <span className="text-amber-300">&quot;Azure · AWS · GCP&quot;</span>
                <span className="text-gray-500">,</span>
              </div>
              <div className="ml-6">
                <span className="text-sky-400">architecture</span>
                <span className="text-gray-500">: </span>
                <span className="text-violet-400">&quot;Microservices &amp; Cloud-Native&quot;</span>
                <span className="text-gray-500">,</span>
              </div>
              <div className="ml-6">
                <span className="text-sky-400">certifications</span>
                <span className="text-gray-500">{": ['"}
                </span>
                <span className="text-amber-300">AZ-900</span>
                <span className="text-gray-500">{"', '"}</span>
                <span className="text-amber-300">GitHub Foundations</span>
                <span className="text-gray-500">{"'],"}
                </span>
              </div>
              <div className="ml-6">
                <span className="text-sky-400">available</span>
                <span className="text-gray-500">: </span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-500">,</span>
              </div>
              <div><span className="text-gray-500">{'}'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

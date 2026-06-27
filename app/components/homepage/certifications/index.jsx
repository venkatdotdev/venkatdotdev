'use client';
// @flow strict

import { certifications } from '@/utils/data/certifications';
import { personalData } from '@/utils/data/personal-data';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';
import { TbBrandAzure } from 'react-icons/tb';
import { HiExternalLink } from 'react-icons/hi';
import { MdVerified } from 'react-icons/md';

const IssuerIcon = ({ category, size = 24 }) => {
  if (category === 'azure') {
    return <TbBrandAzure size={size} className="text-[#0078d4]" />;
  }
  return <SiGithub size={size} className="text-[#171515]" />;
};

function CertCard({ cert }) {
  const isLive = cert.verified && cert.badgeId && !cert.badgeId.startsWith('YOUR_');

  if (isLive) {
    return (
      <div
        className="rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
        style={{ border: `1px solid ${cert.accentColor}40` }}
      >
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(to right, ${cert.accentColor}, #7c3aed)` }}
        />
        <div className="p-5 flex flex-col items-center gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
              <IssuerIcon category={cert.category} size={22} />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
              <MdVerified size={13} />
              <span>Verified</span>
            </div>
          </div>

          {cert.imageUrl ? (
            <div className="relative w-[160px] h-[160px] my-2">
              <Image
                src={cert.imageUrl}
                alt={cert.title}
                fill
                className="object-contain drop-shadow-md"
                sizes="160px"
              />
            </div>
          ) : (
            <div className="w-[160px] h-[160px] my-2 flex items-center justify-center bg-gray-50 rounded-xl">
              <IssuerIcon category={cert.category} size={64} />
            </div>
          )}

          <div className="text-center">
            <p className="text-sm font-bold text-gray-800 leading-snug">{cert.title}</p>
            <p className="text-xs text-gray-400 mt-1">{cert.issuer} · {cert.issuedYear}</p>
          </div>

          <Link
            href={cert.credlyUrl}
            target="_blank"
            className="flex items-center gap-1 text-xs font-semibold hover:underline transition-colors"
            style={{ color: cert.accentColor }}
          >
            <span>View on Credly</span>
            <HiExternalLink size={12} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(to right, ${cert.accentColor}, #7c3aed)` }}
      />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <IssuerIcon category={cert.category} size={26} />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
            <span>Coming Soon</span>
          </div>
        </div>

        <p className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-[#054bad] transition-colors">
          {cert.title}
        </p>
        <p className="text-xs text-gray-500 mb-4">{cert.issuer} · {cert.issuedYear}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-md text-white"
            style={{ backgroundColor: cert.accentColor }}
          >
            {cert.shortTitle}
          </span>
          <Link
            href={cert.credlyUrl}
            target="_blank"
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#054bad] transition-colors"
          >
            <span>View Profile</span>
            <HiExternalLink size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Certifications() {
  return (
    <div id="certifications" className="relative z-50 my-12 lg:my-24">
      <div className="flex items-center gap-4 mb-10">
        <span className="bg-[#0f1117] w-fit text-white px-5 py-3 text-xl font-bold rounded-md tracking-wide">
          CERTIFICATIONS
        </span>
        <span className="flex-1 h-[2px] bg-gradient-to-r from-[#0f1117] to-transparent"></span>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-gray-500 text-sm">
          Verified credentials from Microsoft and GitHub via Credly
        </p>
        <Link
          href={personalData.credlyProfile}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#054bad] hover:underline"
        >
          <span>View all on Credly</span>
          <HiExternalLink size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert) => (
          <CertCard key={cert.id} cert={cert} />
        ))}
      </div>
    </div>
  );
}

export default Certifications;

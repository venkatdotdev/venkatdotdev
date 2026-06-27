"use client";
import { useState } from "react";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsLink45Deg, BsWhatsapp, BsCheckLg } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'LinkedIn',
      icon: <BiLogoLinkedin size={16} />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`,
      color: 'bg-[#0a66c2] hover:bg-[#084e96] text-white',
    },
    {
      label: 'X / Twitter',
      icon: <FiTwitter size={14} />,
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      color: 'bg-[#0f1117] hover:bg-black text-white',
    },
    {
      label: 'WhatsApp',
      icon: <BsWhatsapp size={15} />,
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      color: 'bg-[#25d366] hover:bg-[#1eb554] text-white',
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${l.color}`}
        >
          {l.icon}
          {l.label}
        </a>
      ))}
      <button
        onClick={copyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
          ${copied
            ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
          }`}
      >
        {copied ? <BsCheckLg size={13} /> : <BsLink45Deg size={14} />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}

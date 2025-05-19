// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#2F2F2F] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#2F2F2F]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />
        <div className="lg:w-3/4 ">
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="text-sm md:text-xl flex items-center gap-3">
              <MdAlternateEmail
                 className="bg-[#58504A] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-white cursor-pointer"
                size={36}
              />
              <span className="text-[#046a38] text-xl font-bold">{personalData.email}</span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <CiLocationOn
                 className="bg-[#BF211E] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-white cursor-pointer"
                size={36}
              />
              <span className="text-[#046a38] text-xl font-bold">
                {personalData.address}
              </span>
            </p>
          </div>
          <div className="mt-8 lg:mt-16 flex items-center gap-5 lg:gap-10">
            <Link target="_blank" href={personalData.github}>
              <IoLogoGithub
                 className="bg-[#171515] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-white cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href={personalData.linkedIn}>
              <BiLogoLinkedin
                className="bg-[#0a66c2] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-white cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href={personalData.twitter}>
              <FaXTwitter
                 className="bg-[#1DA1F2] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-white cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href={personalData.stackOverflow}>
              <FaStackOverflow
                 className="bg-[#F48024] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-white cursor-pointer"
                size={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
// @flow strict
import Link from "next/link";


function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className=" text-[#3F926B] text-3xl font-bold">
            
          </Link>
        </div>

        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-md opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about">
              <div className="text-md text-[#054bad] transition-colors duration-300 hover:text-green-600 font-bold">ABOUT</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience">
            <div className="font-bold text-md text-[#054bad] transition-colors duration-300 hover:text-green-600">EXPERIENCE</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills">
            <div className="font-bold text-md text-[#054bad] transition-colors duration-300 hover:text-green-600">SKILLS</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects">
            <div className="font-bold text-md text-[#054bad] transition-colors duration-300 hover:text-green-600">PROJECTS</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education">
            <div className=" font-bold text-md text-[#054bad] transition-colors duration-300 hover:text-green-600">EDUCATION</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#testimonials">
            <div className=" font-bold text-md text-[#054bad] transition-colors duration-300 hover:text-green-600">TESTIMONIALS</div></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
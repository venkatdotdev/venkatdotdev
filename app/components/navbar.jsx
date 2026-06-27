// @flow strict
import Link from "next/link";

const navLinks = [
  { href: '/#about', label: 'ABOUT' },
  { href: '/#experience', label: 'EXPERIENCE' },
  { href: '/#skills', label: 'SKILLS' },
  { href: '/#projects', label: 'PROJECTS' },
  { href: '/#certifications', label: 'CERTIFICATIONS' },
  { href: '/#education', label: 'EDUCATION' },
  { href: '/#contact', label: 'CONTACT' },
  { href: '/blog', label: 'BLOG' },
];

function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex shrink-0 items-center">
          <Link href="/" className="text-[#054bad] text-2xl font-extrabold tracking-tight">
            VN
          </Link>
        </div>

        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-md opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="block px-3 py-2 no-underline outline-none hover:no-underline"
                href={link.href}
              >
                <div className="text-sm font-bold text-[#054bad] transition-colors duration-300 hover:text-[#008080]">
                  {link.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

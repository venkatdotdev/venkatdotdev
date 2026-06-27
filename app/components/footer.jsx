// @flow strict
function Footer() {
  return (
    <div className="relative border-t bg-[#0f1117] border-[#1e2533] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8">
        <div className="flex justify-center">
          <div className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()}{' '}
            <span className="text-white font-semibold">VENKATRAMAN NAGARAJAN</span>. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 font-mono">
            Senior Full Stack Engineer &middot; Chennai, India
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

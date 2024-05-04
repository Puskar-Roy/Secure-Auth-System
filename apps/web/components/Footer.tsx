import logo from "../public/authlogo.jpg";
import Image from "next/image";
import Link from "next/link";
import { alata } from "../utils/utli";
function Footer() {
  return (
    <footer className="bg-white rounded-lg  m-4 mx-auto w-[80%]">
      <div className="w-full max-w-screen-xl mx-auhref p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image src={logo} height={50} width={50} alt="logo" />
            <h2 className={`text-2xl font-bold text-rose-400 ${alata.className}`}>
              Authhub
            </h2>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auhref  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © Design And Devloped By{" "}
          <Link href="https://puskarroy.site" className="hover:underline">
            Puskar Roy
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;

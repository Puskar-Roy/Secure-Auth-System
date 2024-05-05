"use client";
import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import logo from "../public/authlogo.jpg";
import Image from "next/image";
import { NavbarItems } from "../interfaces";
import { useAuthContext } from "../hooks/useAuthContext";
import Link from "next/link";
import { alata } from "../utils/utli";
import { NavbarData } from "../utils/utli";
import { NavItem } from "../utils/NavItem";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { state } = useAuthContext();
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);

  const toogleMenu = () => {
    setToggle(!toggle);
  };

  const handleClick = () => {
    router.push("/change-password");
    setToggle(!toggle);
  };

  return (
    <header className="shadow-lg flex justify-between items-center ">
      <nav className="flex justify-between items-center w-[80%] mx-auto my-[30px]">
        <Link href="/" className="z-20 flex items-center gap-2">
          <Image src={logo} height={50} width={50} alt="logo" />
          <h2 className={`text-2xl font-bold text-rose-400 ${alata.className}`}>
            Authhub
          </h2>
        </Link>

        <div className="sm:hidden">
          {toggle ? (
            <IoMdCloseCircle
              onClick={toogleMenu}
              className=" text-sky-400 text-3xl"
            />
          ) : (
            <HiOutlineMenuAlt3
              onClick={toogleMenu}
              className="text-rose-400 text-3xl"
            />
          )}
        </div>
        <div
          className={
            toggle
              ? "sm:hidden absolute top-0 left-0 h-screen w-[300px] flex justify-center items-center  backdrop-blur-[150px] rounded-2xl transition-all duration-400 z-[100]"
              : "sm:hidden absolute top-0 left-[-100%] h-screen w-[300px] flex justify-center items-center  backdrop-blur-[1px] rounded-2xl transition-all duration-400 z-[100]"
          }
        >
          <ul className="flex flex-col gap-[30px]">
            {!state.user &&
              NavbarData.map(({ href, tags }: NavbarItems) => (
                <NavItem
                  closeNav={toogleMenu}
                  key={href}
                  href={href}
                  tags={tags}
                />
              ))}
            {state.user && (
              <div className="flex flex-col gap-[30px]">
                <div
                  onClick={handleClick}
                  className={`hover:text-rose-500 text-base font-medium cursor-pointer ${alata.className}`}
                >
                  Change Password
                </div>
                <div className={`hover:text-rose-500 text-base font-medium cursor-pointer ${alata.className}`}>
                  {state.user.email}
                </div>
              </div>
            )}
          </ul>
        </div>
        <div className="hidden sm:block">
          <ul className="list-none flex gap-x-12">
            {!state.user &&
              NavbarData.map(({ href, tags }: NavbarItems) => (
                <NavItem key={href} href={href} tags={tags} />
              ))}

            {state.user && (
              <div className="list-none flex gap-x-12">
                <div
                  onClick={handleClick}
                  className={`hover:text-rose-500 text-base font-medium cursor-pointer ${alata.className}`}
                >
                  Change Password
                </div>
                <div className={`hover:text-rose-500 text-base font-medium cursor-pointer ${alata.className}`}>
                  {state.user.email}
                </div>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

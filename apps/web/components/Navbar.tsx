"use client";
import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
// import logo from "/logo1.png";
import { NavbarItems } from "../interfaces";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Link from "next/link";

export const NavbarData: NavbarItems[] = [
  {
    href: "/login",
    tags: "Login",
  },
  {
    href: "/register",
    tags: "Register",
  },
];

const NavItem = ({ href, tags, closeNav }: NavbarItems) => {
  return (
    <li
      onClick={closeNav}
      className="hover:text-rose-500 font-semibold text-lg gabarito-regular"
    >
      <Link href={href}>{tags}</Link>
    </li>
  );
};

const Navbar = () => {
  const { logout } = useLogout();
  const { state } = useAuthContext();

  const [toggle, setToggle] = useState<boolean>(false);
  const toogleMenu = () => {
    setToggle(!toggle);
  };
  const handleClick = () => {
    logout();
    setToggle(!toggle);
  };
  return (
    <header className="shadow-lg flex justify-between items-center ">
      <nav className="flex justify-between items-center w-[80%] mx-auto my-[30px]">
        <Link href="/" className="z-20 flex items-center gap-1">
          <h2 className="text-2xl font-bold text-rose-400 ubuntu-bold">
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
            {/* {state.user?.role === `${import.meta.env.VITE_ROLE}` ? (
              <div className="flex flex-col gap-[30px]">
                <NavItem
                  closeNav={toogleMenu}
                  href="/viewAttendance"
                  tags="View Attendance"
                />
                <NavItem
                  closeNav={toogleMenu}
                  href="/usersAttendance"
                  tags="Manage Attendance"
                />
                <NavItem
                  closeNav={toogleMenu}
                  href="/countAttendance"
                  tags="Take Attendance"
                />
              </div>
            ) : null} */}
            {state.user && (
              <div className="flex flex-col gap-[30px]">
                <div className="hover:text-rose-500 font-semibold text-lg gabarito-regular cursor-pointer">
                  {state.user.email}
                </div>
                <div
                  onClick={handleClick}
                  className="hover:text-rose-500 font-semibold text-lg gabarito-regular cursor-pointer"
                >
                  Logout
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
            {/* {state.user?.role === `${import.meta.env.VITE_ROLE}` ? (
              <div className="list-none flex gap-x-12">
                <NavItem href="/viewAttendance" tags="View Attendance" />
                <NavItem href="/usersAttendance" tags="Manage Attendance" />
                <NavItem href="/countAttendance" tags="Take Attendance" />
              </div>
            ) : null} */}
            {state.user && (
              <div className="list-none flex gap-x-12">
                <div className="hover:text-rose-500 font-semibold text-lg gabarito-regular cursor-pointer">
                  {state.user.email}
                </div>
                <div
                  onClick={handleClick}
                  className="hover:text-rose-500 font-semibold text-lg gabarito-regular cursor-pointer"
                >
                  Logout
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

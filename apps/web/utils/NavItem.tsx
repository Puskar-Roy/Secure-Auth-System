import Link from "next/link";
import { alata } from "./utli";
import { NavbarItems } from "../interfaces";
export const NavItem = ({ href, tags, closeNav }: NavbarItems) => {
  return (
    <li
      onClick={closeNav}
      className={`hover:text-rose-500 text-base font-medium ${alata.className}`}
    >
      <Link href={href}>{tags}</Link>
    </li>
  );
};

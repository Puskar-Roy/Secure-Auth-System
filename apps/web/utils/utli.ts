import { Alata } from "next/font/google";
import { NavbarItems } from "../interfaces";
export const alata = Alata({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});


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
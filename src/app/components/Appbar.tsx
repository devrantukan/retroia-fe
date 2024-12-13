"use client";
import { HomeModernIcon } from "@heroicons/react/16/solid";
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Button,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Appbar = () => {
  //  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useReducer(
    (current) => !current,
    false
  );

  const pathname = usePathname();
  console.log(pathname);
  return (
    <Navbar
      className="shadow-md bg-blue-950  w-full flex justify-between "
      maxWidth={"full"}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <Link
            href={"/"}
            className="flex items-center text-primary-400 hover:text-primary-600 transition-colors"
          >
            <Image
              src={"/retroia-logo.png"}
              width={128}
              height={96}
              alt="Retroia Logo"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 text-white" justify="end">
        <NavbarItem isActive={pathname === "/ofislerimiz"}>
          <Link
            href="/ofislerimiz"
            {...(pathname === "/ofislerimiz"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
          >
            Ofislerimiz
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/danismanlarimiz"}>
          <Link
            href="/danismanlarimiz"
            {...(pathname === "/danismanlarimiz"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
          >
            Danışmanlarımız
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === "/gayrimenkul-danismani-basvuru-formu"}
        >
          <Link
            {...(pathname === "/gayrimenkul-danismani-basvuru-formu"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href="/gayrimenkul-danismani-basvuru-formu"
          >
            Danışman ol
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === "/gayrimenkullerinizi-satalim-kiralayalim"}
        >
          <Link
            {...(pathname === "/gayrimenkullerinizi-satalim-kiralayalim"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href="/gayrimenkullerinizi-satalim-kiralayalim"
          >
            Retroia ile Sat Kirala
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="text-center py-24">
        <NavbarItem isActive={pathname === "/ofislerimiz"} className="h-1/4">
          <Link
            href="/ofislerimiz"
            {...(pathname === "/ofislerimiz"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Ofislerimiz
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === "/danismanlarimiz"}
          className="h-1/4"
        >
          <Link
            href="/danismanlarimiz"
            {...(pathname === "/danismanlarimiz"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Danışmanlarımız
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === "/gayrimenkul-danismani-basvuru-formu"}
          className="h-1/4"
        >
          <Link
            {...(pathname === "/gayrimenkul-danismani-basvuru-formu"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href="/gayrimenkul-danismani-basvuru-formu"
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Danışman ol
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === "/gayrimenkullerinizi-satalim-kiralayalim"}
          className="h-1/4"
        >
          <Link
            {...(pathname === "/gayrimenkullerinizi-satalim-kiralayalim"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href="/gayrimenkullerinizi-satalim-kiralayalim"
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Retroia ile Sat Kirala
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};
export default Appbar;

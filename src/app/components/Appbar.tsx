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

const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar
      className="shadow-md bg-blue-950  w-full flex justify-between "
      onMenuOpenChange={setIsMenuOpen}
      maxWidth={"full"}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
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
        <NavbarItem>
          <Link color="foreground" href="/ofislerimiz">
            Ofislerimiz
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/danismanlarimiz" aria-current="page">
            Danışmanlarımız
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/gayrimenkul-danismani-basvuru-formu">
            Danışman ol
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/gayrimenkullerinizi-satalim-kiralayalim"
          >
            Retroia ile Sat Kirala
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarItem>
          <Link color="foreground" href="/ofislerimiz">
            Ofislerimiz
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/danismanlarimiz" aria-current="page">
            Danışmanlarımız
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/gayrimenkul-danismani-basvuru-formu">
            Danışman ol
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/gayrimenkullerinizi-satalim-kiralayalim"
          >
            Retroia ile Sat Kirala
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Appbar;

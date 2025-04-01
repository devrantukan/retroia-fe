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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getRoute } from "@/utils/routes";

const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useReducer(
    (current) => !current,
    false
  );

  const pathname = usePathname();

  return (
    <Navbar
      className="shadow-md bg-blue-950  w-full flex justify-between"
      maxWidth={"full"}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="center" className="w-full">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand className="w-full flex lg:justify-start justify-center mr-12">
          <Link
            href={"/emlak/"}
            className="flex items-center text-primary-400 hover:text-primary-600 transition-colors"
          >
            <Image
              src={"/emlak/retroia-logo.png"}
              width={125}
              height={80}
              alt="Retroia Logo"
              className="h-[40px] sm:w-full"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 text-white" justify="end">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="bg-transparent text-md text-white p-0 data-[hover=true]:bg-transparent"
                variant="light"
              >
                Portföylerimiz
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Portföy seçenekleri"
            className="text-primary"
          >
            <DropdownItem key="konut" href={"/emlak/konut/satilik/"}>
              Satılık Konutlar
            </DropdownItem>
            <DropdownItem key="ticari" href={"/emlak/ticari/satilik/"}>
              Satılık Ticari Gayrimenkuller
            </DropdownItem>
            <DropdownItem key="arsa" href={"/emlak/arsa-arazi/satilik/"}>
              Satılık Arsalar
            </DropdownItem>
            <DropdownItem key="konut" href={"/emlak/konut/kiralik/"}>
              Kiralık Konutlar
            </DropdownItem>
            <DropdownItem key="ticari" href={"/emlak/ticari/kiralik/"}>
              Kiralık Ticari Gayrimenkuller
            </DropdownItem>
            <DropdownItem key="arsa" href={"/emlak/arsa-arazi/kiralik/"}>
              Kiralık Arsalar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem isActive={pathname === getRoute("/ofislerimiz")}>
          <Link href={getRoute("/ofislerimiz/")}>Ofislerimiz</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === getRoute("/danismanlarimiz")}>
          <Link
            href={getRoute("/danismanlarimiz/")}
            {...(pathname === getRoute("/danismanlarimiz")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
          >
            Danışmanlarımız
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={
            pathname === getRoute("/gayrimenkul-danismani-basvuru-formu")
          }
        >
          <Link
            {...(pathname === getRoute("/gayrimenkul-danismani-basvuru-formu")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href={getRoute("/gayrimenkul-danismani-basvuru-formu/")}
          >
            Danışman ol
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={
            pathname === getRoute("/gayrimenkullerinizi-satalim-kiralayalim")
          }
        >
          <Link
            {...(pathname ===
            getRoute("/gayrimenkullerinizi-satalim-kiralayalim")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href={getRoute("/gayrimenkullerinizi-satalim-kiralayalim/")}
          >
            Retroia ile Sat Kirala
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="text-center py-24">
        <NavbarMenuItem className="h-1/4">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="text-3xl text-blue-950 bg-transparent w-full"
                variant="light"
              >
                Portföylerimiz
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Portföy seçenekleri">
              <DropdownItem key="konut" href={getRoute("/konut/satilik")}>
                Satılık Konutlar
              </DropdownItem>
              <DropdownItem key="ticari" href={getRoute("/ticari/satilik")}>
                Satılık Ticari Gayrimenkuller
              </DropdownItem>
              <DropdownItem key="arsa" href={getRoute("/arsa-arazi/satilik")}>
                Satılık Arsalar
              </DropdownItem>
              <DropdownItem key="konut" href={getRoute("/konut/kiralik")}>
                Kiralık Konutlar
              </DropdownItem>
              <DropdownItem key="ticari" href={getRoute("/ticari/kiralik")}>
                Kiralık Ticari Gayrimenkuller
              </DropdownItem>
              <DropdownItem key="arsa" href={getRoute("/arsa-arazi/kiralik")}>
                Kiralık Arsalar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
        <NavbarItem
          isActive={pathname === getRoute("/ofislerimiz")}
          className="h-1/4"
        >
          <Link
            href={getRoute("/ofislerimiz")}
            {...(pathname === getRoute("/ofislerimiz")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Ofislerimiz
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === getRoute("/danismanlarimiz")}
          className="h-1/4"
        >
          <Link
            href={getRoute("/danismanlarimiz")}
            {...(pathname === getRoute("/danismanlarimiz")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Danışmanlarımız
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={
            pathname === getRoute("/gayrimenkul-danismani-basvuru-formu")
          }
          className="h-1/4"
        >
          <Link
            {...(pathname === getRoute("/gayrimenkul-danismani-basvuru-formu")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href={getRoute("/gayrimenkul-danismani-basvuru-formu/")}
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Danışman ol
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={
            pathname === getRoute("/gayrimenkullerinizi-satalim-kiralayalim")
          }
          className="h-1/4"
        >
          <Link
            {...(pathname ===
            getRoute("/gayrimenkullerinizi-satalim-kiralayalim")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href={getRoute("/gayrimenkullerinizi-satalim-kiralayalim/")}
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

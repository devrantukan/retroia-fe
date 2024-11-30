import Button from "../components/Button";
import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookBoxLine,
  RiGithubLine,
  RiTwitterXLine,
} from "@remixicon/react";
import Image from "next/image";

interface propertyPages {
  id: number;
  page: string;
  href: string;
}

const propertyPages = [
  { id: 0, page: "Satılık Konutlar", href: "/konut/satilik" },
  { id: 1, page: "Satılık Ticari Gayrimenkuller", href: "/ticari/satilik" },
  { id: 2, page: "Satılık Arsalar", href: "/arsa-arazi/satilik" },
];

const cooperatePages = [
  { id: 0, page: "Ofislerimiz", href: "/ofislerimiz" },
  { id: 1, page: "Danışmanlarımız", href: "/danismanlarimiz" },
  { id: 2, page: "Danışman Ol", href: "/gayrimenkul-danismani-basvuru-formu" },
  {
    id: 3,
    page: "Gayrimenkulünüzü Satalım / Kiralayalım",
    href: "/gayrimenkullerinizi-satalim-kiralayalim",
  },
];

const aboutPages = [
  { id: 0, page: "Hakkımızda", href: "/" },
  { id: 1, page: "KVKK ve Aydınlatma Metni", href: "/features/grid" },
  { id: 2, page: "KVKK Bilgi Başvuru Formu", href: "/pricing/tiers" },
  { id: 3, page: "Yasal Uyarı ve Kullanım Koşulları", href: "/team" },
];

const socialLinks = [
  { id: 0, Icon: RiYoutubeLine, href: "/" },
  { id: 1, Icon: RiInstagramLine, href: "/" },
  { id: 2, Icon: RiFacebookBoxLine, href: "/" },
  { id: 3, Icon: RiGithubLine, href: "/" },
  { id: 4, Icon: RiTwitterXLine, href: "/" },
];

const classes = {
  pageLink:
    "text-neutral-600 inline-flex hover:text-neutral-900 focus:outline-none focus:rounded focus:ring focus:ring-indigo-200",
  socialIcon: "link--md link--secondary",
  socialLink:
    "inline-flex focus:outline-none focus:rounded focus:ring focus:ring-indigo-200",
};

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="flex flex-col border border-t-gray-300 text-sm font-medium p-6 w-full w-screen-sm md:w-screen-md"
    >
      <div className="w-full flex flex-row justify-between">
        <nav
          aria-label="Social media links"
          className="flex flex-col items-baseline h-full"
        >
          <Image
            src={"/retroia-logo-dark.png"}
            width={128}
            height={96}
            alt="Retroia Logo"
          />
          <ul className="flex flex-row flex-nowrap gap-x-4  h-[110px] items-end">
            {socialLinks.map(({ id, Icon, href }) => (
              <li key={id}>
                <a href={href} className={classes.socialLink}>
                  <Icon className={classes.socialIcon} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav
          aria-label="Footer navigation"
          className="flex flex-row gap-8 mt-4"
        >
          <div>
            <p className="mb-4  text-blue-950">GAYRİMENKULLER</p>
            <ul className="flex flex-col flex-nowrap gap-x-4 md:gap-x-6 font-light">
              {propertyPages.map(({ id, page, href }) => (
                <li key={id} className="mb-2">
                  <Button classes={classes.pageLink} href={href} text={page} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-blue-950">BİRLİKTE ÇALIŞALIM</p>
            <ul className="flex flex-col flex-nowrap gap-x-4 md:gap-x-6 font-light">
              {cooperatePages.map(({ id, page, href }) => (
                <li key={id} className="mb-2">
                  <Button classes={classes.pageLink} href={href} text={page} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-blue-950">HAKKIMIZDA</p>
            <ul className="flex flex-col flex-nowrap gap-x-4 md:gap-x-6 font-light">
              {aboutPages.map(({ id, page, href }) => (
                <li key={id} className="mb-2">
                  <Button classes={classes.pageLink} href={href} text={page} />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <p className="mt-4 text-neutral-900 font-normal">
        &copy; 2025 Retroia All rights reserved.
      </p>
    </footer>
  );
}

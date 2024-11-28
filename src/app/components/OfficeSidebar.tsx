"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import {
  ArrowCircleRight,
  Compass,
  PhoneCall,
  MapPin,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

import ShowContactDetailsButton from "./ShowContactDetailsButton";
import { useRouter } from "next/navigation";

interface Props {
  office: any;
}

const OfficeSidebar = ({ office }: Props) => {
  const router = useRouter();

  return (
    <div className="p-4 flex flex-col justify-start w-full lg:w-1/4 ">
      <Image
        src="https://dummyimage.com/640x4:3"
        alt=""
        width={640}
        height={450}
        className="mb-4"
      />
      <hr />
      <ShowContactDetailsButton
        phone={office.phone}
        fax={office.fax}
        email={office.email}
      />
      <p className="text-lg font-medium mx-4 text-slate-600 text-center capitalize my-2">
        {office.streetAddress}
      </p>
      <p className="text-sm text-center font-medium capitalize">
        {office.neighborhood.neighborhood_name.toLocaleLowerCase("tr")} /{" "}
        {office.district.district_name.toLocaleLowerCase("tr")} /{" "}
        {office.city.city_name.toLocaleLowerCase("tr")} /{" "}
        {office.country.country_name}
      </p>

      <Button
        className="mt-4 bg-blue-950 text-white font-bold text-md"
        onClick={() => window.location.assign("?tab=contact-us")}
      >
        <MapPin width={20} height={20} />
        Ofis Konumu
      </Button>
      <Button className="mt-4 bg-blue-950 text-white font-bold text-md">
        <Compass width={20} height={20} />
        Yol Tarifi Al
      </Button>
      <div className="bg-blue-200 mt-4 rounded-lg p-4">
        <p className="font-bold mb-2">Aramıza Katıl</p>
        <p>Gayrimenkul Danışmanı Olmak İster misiniz?</p>
        <Link href={"/gayrimenkul-danismani-basvuru-formu"}>
          <Button className="mt-4 bg-blue-950 text-white font-bold text-md">
            Danışman Ol
            <ArrowCircleRight width={24} height={24} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OfficeSidebar;

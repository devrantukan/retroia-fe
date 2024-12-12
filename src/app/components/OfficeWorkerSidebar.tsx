import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import {
  ArrowCircleRight,
  Compass,
  PhoneCall,
  MapPin,
  XLogo,
  FacebookLogo,
  LinkedinLogo,
  InstagramLogo,
  Globe,
} from "@phosphor-icons/react/dist/ssr";
import ShowContactDetailsButton from "./ShowContactDetailsButton";

interface Props {
  officeWorker: any;
}

const OfficeWorkerSidebar = ({ officeWorker }: Props) => {
  return (
    <div className="p-4 flex flex-col justify-start w-full lg:w-1/4 ">
      <Image src={officeWorker.avatarUrl} alt="" width={640} height={800} />
      <hr />
      <p className="text-xl font-bold text-center mt-2">
        {officeWorker.name} {officeWorker.surname}
      </p>
      <p className="text-lg font-normal text-center">{officeWorker.title}</p>
      <p className="text-lg font-bold text-center text-blue-950 hover:text-blue-600">
        <Link
          href={`/ofis/${officeWorker.office.id}/${officeWorker.office.slug}`}
        >
          {officeWorker.office.name}
        </Link>
      </p>
      <div className="m-4">
        <ul className="flex flex-row gap-x-2 justify-between">
          {officeWorker.xAccountId && (
            <li key={1}>
              <Link
                target="_blank"
                href={`https://x.com/${officeWorker.xAccountId}`}
              >
                <XLogo
                  width={32}
                  height={32}
                  className="border rounded-2xl p-1 hover:bg-slate-200"
                />
              </Link>
            </li>
          )}
          {officeWorker.facebookAccountId && (
            <li key={2}>
              <Link
                target="_blank"
                href={`https://facebook.com/${officeWorker.facebookAccountId}`}
              >
                <FacebookLogo
                  width={32}
                  height={32}
                  className="border rounded-2xl p-1 hover:bg-slate-200"
                />
              </Link>
            </li>
          )}
          {officeWorker.linkedInAccountId && (
            <li key={3}>
              <Link
                target="_blank"
                href={`https://linkedin.com/${officeWorker.linkedInAccountId}`}
              >
                <LinkedinLogo
                  width={32}
                  height={32}
                  className="border rounded-2xl p-1 hover:bg-slate-200"
                />
              </Link>
            </li>
          )}
          {officeWorker.instagramAccountId && (
            <li key={4}>
              <Link
                target="_blank"
                href={`https://instagram.com/${officeWorker.instagramAccountId}`}
              >
                <InstagramLogo
                  width={32}
                  height={32}
                  className="border rounded-2xl p-1 hover:bg-slate-200"
                />
              </Link>
            </li>
          )}
          {officeWorker.webUrl && (
            <li key={5}>
              <Link target="_blank" href={`${officeWorker.webUrl}`}>
                <Globe
                  width={32}
                  height={32}
                  className="border rounded-2xl p-1 hover:bg-slate-200"
                />
              </Link>
            </li>
          )}
        </ul>
      </div>

      <hr className="mb-0 mt-4" />
      <Button className="mt-4 bg-blue-950 text-white font-bold text-md">
        <MapPin width={20} height={20} />
        Ofis Konumu
      </Button>
      <p className="text-lg font-medium mx-4 text-slate-600 text-center capitalize my-2">
        {officeWorker.office.streetAddress}
      </p>
      <p className="text-sm text-center font-medium capitalize">
        {officeWorker.office.neighborhood.neighborhood_name.toLocaleLowerCase(
          "tr"
        )}{" "}
        / {officeWorker.office.district.district_name.toLocaleLowerCase("tr")} /{" "}
        {officeWorker.office.city.city_name.toLocaleLowerCase("tr")} /{" "}
        {officeWorker.office.country.country_name}
      </p>
      <hr className="mb-0 mt-4" />
      <Button className="mt-4 bg-blue-950 text-white font-bold text-md">
        <Link
          target="_blank"
          href={`https://www.google.com/maps?daddr=${officeWorker.office.latitude},${officeWorker.office.longitude}`}
          className="flex flex-row gap-x-1 justify-center items-center"
        >
          <Compass width={20} height={20} />
          Yol Tarifi Al
        </Link>
      </Button>
      <hr className="mb-2 mt-4" />
      <ShowContactDetailsButton
        phone={officeWorker.office.phone}
        fax={officeWorker.office.fax}
        email={officeWorker.office.email}
      />
      <hr className="mb-0 mt-4" />
      <div className="bg-blue-200 mt-4 rounded-lg p-4">
        <p className="font-bold">Taşınmaz Ticareti Yetki Belgesi No</p>
        <p>{officeWorker.companyLegalName}</p>
        <p className="font-bold">İşletme Ünvanı</p>
        <p>{officeWorker.commercialDocumentId}</p>
      </div>
      <hr className="mb-0 mt-4" />
      <div className="bg-blue-200 mt-4 rounded-lg p-4">
        <p className="font-bold mb-2">Yorum Yaz</p>
        <p>Danışmanın verdiği hizmeti değerlendirin.</p>

        <Button className="mt-4 bg-blue-950 text-white font-bold text-md">
          Yorum Yaz <ArrowCircleRight width={24} height={24} />
        </Button>
      </div>
    </div>
  );
};

export default OfficeWorkerSidebar;

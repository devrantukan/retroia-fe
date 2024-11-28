import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import {
  ArrowCircleRight,
  Compass,
  PhoneCall,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

interface Props {
  officeWorker: any;
}

const OfficeWorkerSidebar = ({ officeWorker }: Props) => {
  return (
    <div className="p-4 flex flex-col justify-start w-full lg:w-1/4 ">
      <Image
        src="https://dummyimage.com/640x4:3"
        alt=""
        width={640}
        height={450}
      />
      <hr />
      <p className="text-xl font-bold text-center">
        {officeWorker.name} {officeWorker.surname}
      </p>
      <p className="text-xl font-bold text-center">{officeWorker.title}</p>
      <p className="text-xl font-bold text-center">
        {officeWorker.office.name}
      </p>

      <Button className="mt-4">
        <MapPin width={20} height={20} />
        Ofis Konumu
      </Button>
      <Button className="mt-4">
        <Compass width={20} height={20} />
        Yol Tarifi Al
      </Button>
      <Button className="mt-4">
        <PhoneCall width={20} height={20} />
        İletişim Bilgilerini Göster
      </Button>
      <div className="bg-blue-200 mt-4 rounded-lg p-4">
        <p className="font-bold mb-2">Yorum Yaz</p>
        <p>Danışmanın verdiği hizmeti değerlendirin.</p>

        <Button className="mt-4">
          Yorum Yaz <ArrowCircleRight width={24} height={24} />
        </Button>
      </div>
    </div>
  );
};

export default OfficeWorkerSidebar;

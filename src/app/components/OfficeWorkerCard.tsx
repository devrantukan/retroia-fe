import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Button, Card } from "@nextui-org/react";
import { Envelope, PhoneCall } from "@phosphor-icons/react/dist/ssr";

interface Props {
  officeWorker: any;
  index: number;
}

const OfficeWorkerCard = ({ officeWorker, index }: Props) => {
  return (
    <Card key={index} className="w-[300px] h-[400px] px-4 m-2 pb-2">
      <Link
        href={`ofis/${officeWorker.office.id}/${officeWorker.office.slug}/${officeWorker.role.slug}/${officeWorker.id}/${officeWorker.slug}`}
      >
        <Image
          src={`${officeWorker.avatarUrl}`}
          alt={""}
          width={640}
          height={800}
          className="object-fill cursor-pointer w-[70%]  mx-auto mb-4 "
        />
        <h2 className="text-lg font-semibold text-left text-blue-950 mb-2">
          {officeWorker.name} {officeWorker.surname}
        </h2>
        <p className="font-semilight text-sm">{officeWorker.role?.title}</p>
        <div className="flex flex-row items-center gap-x-1 text-gray-600 text-sm">
          <Envelope width={20} height={20} />
          {officeWorker.email}
        </div>
        <div className="flex flex-row items-center gap-x-1 mb-2 text-gray-600 text-sm">
          <PhoneCall width={20} height={20} />
          {officeWorker.phone}
        </div>
        <p className="font-semibold text-md">{officeWorker.office?.name}</p>
      </Link>
    </Card>
  );
};

export default OfficeWorkerCard;

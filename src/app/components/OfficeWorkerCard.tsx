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
  console.log(officeWorker);
  return (
    <Card key={index} className="lg:w-1/3 w-full px-4 m-2 pb-2">
      <Link href={`/danisman/${officeWorker.id}/${officeWorker.slug}`}>
        <Image
          src={`${officeWorker.avatarUrl}`}
          alt={""}
          width={400}
          height={540}
          className=" cursor-pointer w-2/3  mx-auto mb-4 "
        />
        <h2 className="text-lg font-semibold text-left text-blue-950">
          {officeWorker.name} {officeWorker.surname}
        </h2>
        <p>{officeWorker.title}</p>
        <div className="flex flex-row items-center gap-x-1">
          <Envelope width={20} height={20} />
          {officeWorker.email}
        </div>
        <div className="flex flex-row items-center gap-x-1 mb-2">
          <PhoneCall width={20} height={20} />
          {officeWorker.phone}
        </div>
        <p>{officeWorker.office?.name}</p>
      </Link>
    </Card>
  );
};

export default OfficeWorkerCard;

import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Button, Card } from "@nextui-org/react";
import { Envelope, PhoneCall } from "@phosphor-icons/react/dist/ssr";

interface Props {
  officeWorker: any;
  index: number;
}

const OfficeWorkerCardLight = ({ officeWorker, index }: Props) => {
  console.log(officeWorker);
  return (
    <Card
      key={index}
      className="lg:w-1/3 w-full m-2 pb-2 rounded-none border-0 shadow-none"
    >
      <Link
        href={`/danisman/${officeWorker.id}/${officeWorker.slug}`}
        className="flex flex-col"
      >
        <div className="w-full ">
          <Image
            src={`${officeWorker.avatarUrl}`}
            alt={""}
            width={400}
            height={540}
            className="cursor-pointer rounded-lg max-h-[300px] "
          />
        </div>
        <h2 className="text-lg font-semibold text-left text-blue-950">
          {officeWorker.name} {officeWorker.surname}
        </h2>
        <p>{officeWorker.title}</p>

        <p>{officeWorker.office?.name}</p>
      </Link>
    </Card>
  );
};

export default OfficeWorkerCardLight;

import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Button, Card } from "@nextui-org/react";
import { ArrowCircleRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import OfficeWorkerAvatars from "./OfficeWorkerAvatars";

interface Props {
  office: any;
  key: number;
}

const OfficeCard = ({ office, key }: Props) => {
  console.log(office);
  return (
    <Card className="p-2 pb-4 mx-2 ">
      <Link href={`/ofis/${office.id}/${office.slug}`}>
        <Image
          src={`${office.avatarUrl}`}
          alt={""}
          width={400}
          height={540}
          className="rounded-xl cursor-pointer aspect-square  mx-auto mb-4 "
        />
        <div className="flex flex-row">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold text-left">{office.name}</h2>

            <p>{office.email}</p>
            <p>{office.phone}</p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <OfficeWorkerAvatars members={office.workers} />
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default OfficeCard;

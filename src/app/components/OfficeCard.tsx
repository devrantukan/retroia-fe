import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Button, Card } from "@nextui-org/react";
import { ArrowCircleRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";

interface Props {
  office: any;
  key: number;
}

const OfficeCard = ({ office, key }: Props) => {
  return (
    <Card className="lg:w-1/5 w-full p-2 pb-4 mr-4">
      <Link href={`/ofis/${office.id}/${office.slug}`}>
        <Image
          src={`${office.avatarUrl}`}
          alt={""}
          width={400}
          height={540}
          className="rounded-xl cursor-pointer aspect-square  mx-auto mb-4 "
        />
        <h2 className="text-lg font-semibold text-left">{office.name}</h2>

        <p>{office.email}</p>
        <p>{office.phone}</p>
      </Link>
    </Card>
  );
};

export default OfficeCard;

import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Card } from "@nextui-org/react";

interface Props {
  officeWorker: any;
  index: number;
}

const OfficeWorkerCardLight = ({ officeWorker, index }: Props) => {
  return (
    <Card
      key={index}
      className=" w-full m-2 pb-2 rounded-none border-0 shadow-none"
    >
      <Link
        href={
          officeWorker.roleId === 8 ||
          officeWorker.roleId === 9 ||
          officeWorker.roleId === 10
            ? "#"
            : `/emlak/ofis/${officeWorker.office.id}/${officeWorker.office.slug}/${officeWorker.role.slug}/${officeWorker.id}/${officeWorker.slug}`
        }
        className="flex flex-col"
      >
        <div className="h-3/4 overflow-hidden">
          <Image
            src={`${officeWorker.avatarUrl}`}
            alt={""}
            width={640}
            height={800}
            className="cursor-pointer rounded-lg   object-fill "
          />
        </div>
        <div className="pl-4">
          <h2 className="text-lg font-semibold text-left text-blue-950">
            {officeWorker.name} {officeWorker.surname}
          </h2>
          <p>{officeWorker.role?.title}</p>

          <p>{officeWorker.office?.name}</p>
        </div>
      </Link>
    </Card>
  );
};
export default OfficeWorkerCardLight;

"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import PropertyCard from "./PropertyCard";

export default function HomepageRentalList({
  properties,
}: {
  properties: any[];
}) {
  const [selected, setSelected] = React.useState("konut");
  return (
    <>
      <div className="flex flex-col lg:w-full items-start  mx-6 lg:mr-0 p-6 pt-8   rounded-xl bg-gradient-to-r from-blue-950 from-40% via-sky-500 via-70% to-sky-200 to-90% lg:mb-0 mb-6">
        <h2 className="absolute lg:text-xl text-lg font-semibold text-white mb-6 mt-2">
          Kiralık Gayrimenkuller
        </h2>
        <div className="flex flex-col w-full">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key.toString())}
            className="w-full flex justify-end"
          >
            <Tab key="konut" title="Konut">
              <Card>
                <CardBody className="grid grid-cols-1 lg:h-[720px] h-full gap-x-4">
                  {properties
                    .filter((property) => property.contract.slug === "kiralik")
                    .filter((property) => property.type.slug == "konut")
                    .slice(0, 4)
                    .map((property, index) => (
                      <PropertyCard property={property} key={index} />
                    ))}
                  <Button className="bg-blue-950">
                    <Link
                      href={`/konut/kiralik`}
                      className="text-white font-bold flex flex-row"
                    >
                      <span className="mr-4">Daha Fazla Görüntüle</span>
                      <ArrowCircleRight width={20} height={20} />
                    </Link>
                  </Button>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="ticari" title="Ticari">
              <Card>
                <CardBody className="grid grid-cols-1 lg:h-[720px] h-full gap-x-4">
                  {properties
                    .filter((property) => property.contract.slug === "kiralik")
                    .filter((property) => property.type.slug == "ticari")
                    .slice(0, 4)
                    .map((property, index) => (
                      <PropertyCard property={property} key={index} />
                    ))}
                  <Button className="bg-blue-950">
                    <Link
                      href={`/ticari/kiralik`}
                      className="text-white font-bold flex flex-row"
                    >
                      <span className="mr-4">Daha Fazla Görüntüle</span>
                      <ArrowCircleRight width={20} height={20} />
                    </Link>
                  </Button>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="arsa-arazi" title="Arsa Arazi">
              <Card>
                <CardBody className="grid grid-cols-1 lg:h-[720px] h-full gap-x-4">
                  {properties
                    .filter((property) => property.contract.slug === "kiralik")
                    .filter((property) => property.type.slug == "arsa-arazi")
                    .slice(0, 4)
                    .map((property, index) => (
                      <PropertyCard property={property} key={index} />
                    ))}
                  <Button className="bg-blue-950">
                    <Link
                      href={`/arsa-arazi/kiralik`}
                      className="text-white font-bold flex flex-row"
                    >
                      <span className="mr-4">Daha Fazla Görüntüle</span>
                      <ArrowCircleRight width={20} height={20} />
                    </Link>
                  </Button>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

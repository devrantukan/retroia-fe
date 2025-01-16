"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import PropertyCard from "./PropertyCard";

export default function HomepageForSaleList({
  properties,
}: {
  properties: any[];
}) {
  const [selected, setSelected] = React.useState("konut");
  return (
    <>
      <div className="flex flex-col lg:w-full items-start lg:mx-6 lg:p-6 p-4 pt-8 lg:rounded-xl rounded-none bg-gradient-to-r from-blue-950 from-40% via-sky-500 via-70% to-sky-200 to-90%">
        <h2 className="lg:absolute relative lg:text-xl text-lg font-semibold text-white mb-6 mt-2">
          Satılık Gayrimenkuller
        </h2>
        <div className="flex flex-col w-full ">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key.toString())}
            className="w-full flex justify-end"
          >
            <Tab key="konut" title="Konut">
              <Card>
                <CardBody className="grid grid-cols-1 lg:h-[900px] h-full gap-x-4 justify-start ">
                  <div className="flex flex-col justify-start">
                    {properties
                      .filter(
                        (property) => property.contract.slug === "satilik"
                      )
                      .filter((property) => property.type.slug == "konut")
                      .slice(0, 5)
                      .map((property, index) => (
                        <PropertyCard property={property} key={index} />
                      ))}
                  </div>
                  <div className="flex items-end ">
                    <Button className="bg-blue-950 w-full">
                      <Link
                        href={`/konut/satilik`}
                        className="text-white font-bold flex flex-row"
                      >
                        <span className="mr-4">Daha Fazla Görüntüle</span>
                        <ArrowCircleRight width={20} height={20} />
                      </Link>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="ticari" title="Ticari">
              <Card>
                <CardBody className="grid grid-cols-1 lg:h-[900px] h-full gap-x-4">
                  <div className="flex flex-col justify-start">
                    {properties
                      .filter(
                        (property) => property.contract.slug === "satilik"
                      )
                      .filter((property) => property.type.slug == "ticari")
                      .slice(0, 5)
                      .map((property, index) => (
                        <PropertyCard property={property} key={index} />
                      ))}
                  </div>
                  <div className="flex items-end ">
                    <Button className="bg-blue-950 w-full">
                      <Link
                        href={`/ticari/satilik`}
                        className="text-white font-bold flex flex-row"
                      >
                        <span className="mr-4">Daha Fazla Görüntüle</span>
                        <ArrowCircleRight width={20} height={20} />
                      </Link>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="arsa-arazi" title="Arsa Arazi">
              <Card>
                <CardBody className="grid grid-cols-1 lg:h-[900px] h-full gap-x-4">
                  <div className="flex flex-col justify-start">
                    {properties
                      .filter(
                        (property) => property.contract.slug === "satilik"
                      )
                      .filter((property) => property.type.slug == "arsa-arazi")
                      .slice(0, 5)
                      .map((property, index) => (
                        <PropertyCard property={property} key={index} />
                      ))}
                  </div>
                  <div className="flex items-end ">
                    <Button className="bg-blue-950 w-full">
                      <Link
                        href={`/arsa-arazi/satilik`}
                        className="text-white font-bold flex flex-row"
                      >
                        <span className="mr-4">Daha Fazla Görüntüle</span>
                        <ArrowCircleRight width={20} height={20} />
                      </Link>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function HomepageForSaleList() {
  const [selected, setSelected] = React.useState("konut");
  return (
    <>
      <div className="flex flex-col items-start mx-6 p-6 pt-8 h-[500px] w-full rounded-xl bg-gradient-to-r from-blue-950 from-30% via-sky-500 via-60% to-sky-200 to-90%">
        <h2 className="absolute text-2xl text-white mb-6">
          Satılık Gayrimenkuller
        </h2>
        <div className="flex flex-col items-end">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key.toString())}
          >
            <Tab key="konut" title="Konut">
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="ticari" title="Ticari">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="arsa-arazi" title="Arsa Arazi">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>

        <Button className="bg-white">
          <Link
            href="/gayrimenkul-danismani-basvuru-formu"
            className="text-blue-950 font-bold flex flex-row"
          >
            <span className="mr-4">Daha Fazla Görüntüle</span>
            <ArrowCircleRight width={20} height={20} />
          </Link>
        </Button>
      </div>
    </>
  );
}

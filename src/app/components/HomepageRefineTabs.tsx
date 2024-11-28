"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

const HomepageRefineTabs = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-medium text-left text-slate-600  mb-2">
        Doğru Gayrimenkulün Olduğu Yerde
      </h1>
      <h1 className="text-xl mb-12 font-light text-left text-slate-600">
        Hayallerinizdeki gayrimenkulü bulmanıza yardımcı olurken, en karlı{" "}
        <br />
        yatırımı da yapmanızı sağlamak için doğru mülk nerede ise biz oradayız.
      </h1>
      <div className=" flex flex-col justify-between  h-[400px] w-[700px] ">
        <div className="flex flex-col">
          <Tabs aria-label="Options">
            <Tab key="properties" title="Konut">
              <Card className="bg-slate-300 h-[300px]">
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="about-us" title="Ticari">
              <Card className="bg-slate-300">
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="our-office" title="Arsa/Arazi">
              <Card className="bg-slate-300">
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="propertyId" title="İlan No">
              <Card className="bg-slate-300">
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomepageRefineTabs;

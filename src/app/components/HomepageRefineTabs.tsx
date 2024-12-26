"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { HomepageRefineForm } from "./forms/HomepageRefineForm";

const HomepageRefineTabs = () => {
  return (
    <div className="flex flex-col w-full z-40">
      <h1 className="text-3xl font-medium text-left text-slate-600  mb-2">
        Doğru Gayrimenkulün Olduğu Yerde
      </h1>
      <h1 className="text-xl mb-8 font-light text-left text-slate-600">
        Hayallerinizdeki gayrimenkulü bulmanıza yardımcı olurken, en karlı{" "}
        <br />
        yatırımı da yapmanızı sağlamak için doğru mülk nerede ise biz oradayız.
      </h1>
      <div className="flex flex-col justify-between lg:h-[400px] lg:w-[700px] h-auto ">
        <div className="flex flex-col">
          <Tabs aria-label="Options">
            <Tab key="properties" title="Konut">
              <Card className="bg-slate-300 ">
                <CardBody>
                  <HomepageRefineForm propertyType={"konut"} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="about-us" title="Ticari">
              <Card className="bg-slate-300">
                <CardBody>
                  <HomepageRefineForm propertyType={"ticari"} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="our-office" title="Arsa/Arazi">
              <Card className="bg-slate-300">
                <CardBody>
                  <HomepageRefineForm propertyType={"arsa-arazi"} />
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

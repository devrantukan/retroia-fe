"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardBody } from "@nextui-org/react";

import OfficeWorkerCard from "./OfficeWorkerCard";

export default function HomepageAgentSlider({ agents }: { agents: any[] }) {
  return (
    <>
      <div className="flex justify-left  p-6 m-6 items-center bg-gradient-to-r from-blue-950 via-sky-300 to-sky-250 rounded-xl mb-8 ">
        <Carousel
          opts={{
            loop: true,
          }}
          autoplay={true}
          autoplayInterval={5000}
          className="w-full "
        >
          <CarouselContent className="-ml-1">
            {agents.map((agent, index) => (
              <CarouselItem
                key={index}
                className="pl-1 mx-4 md:basis-1/2 lg:basis-1/4"
              >
                <OfficeWorkerCard officeWorker={agent} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}

"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { HomepageRefineForm } from "./forms/HomepageRefineForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Create schema
const propertySearchSchema = z.object({
  propertyId: z
    .string()
    .min(1, "İlan numarası gereklidir")
    .regex(/^\d+$/, "Sadece sayı giriniz")
    .transform(Number),
});

type PropertySearchForm = z.infer<typeof propertySearchSchema>;

const HomepageRefineTabs = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PropertySearchForm>({
    resolver: zodResolver(propertySearchSchema),
  });

  return (
    <div className="flex flex-col w-full z-30 lg:ml-[8%]">
      <h1 className="text-3xl font-bold text-left text-slate-600  mb-4">
        Doğru Gayrimenkulün Olduğu Yerde
      </h1>
      <h1 className="text-xl mb-8 font-normal text-left text-slate-600">
        Hayallerinizdeki gayrimenkulü bulmanıza yardımcı olurken, en karlı{" "}
        <br />
        yatırımı da yapmanızı sağlamak için doğru mülk nerede ise biz oradayız.
      </h1>
      <div className="flex flex-col justify-between lg:h-[400px] lg:w-[40%]  h-auto ">
        <div className="flex flex-col">
          <Tabs aria-label="Options" variant="solid" color="primary">
            <Tab key="properties" title="Konut">
              <Card className="bg-[#172554]">
                <CardBody>
                  <HomepageRefineForm propertyType={"konut"} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="about-us" title="Ticari">
              <Card className="bg-[#172554]">
                <CardBody>
                  <HomepageRefineForm propertyType={"ticari"} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="our-office" title="Arsa/Arazi">
              <Card className="bg-[#172554]">
                <CardBody>
                  <HomepageRefineForm propertyType={"arsa-arazi"} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="propertyId" title="İlan No">
              <Card className="bg-[#172554]">
                <CardBody>
                  <form
                    onSubmit={handleSubmit(async (data) => {
                      try {
                        const API_URL =
                          process.env.NEXT_PUBLIC_API_URL || "/emlak/api";
                        const response = await fetch(
                          `${API_URL}/properties/check/${data.propertyId}/`
                        );
                        const result = await response.json();

                        if (result.exists) {
                          router.push(`/emlak/portfoy/${data.propertyId}`);
                        } else {
                          setError("propertyId", {
                            type: "manual",
                            message: "Bu ilan numarası mevcut değil",
                          });
                        }
                      } catch (error) {
                        setError("propertyId", {
                          type: "manual",
                          message: "Bir hata oluştu, lütfen tekrar deneyin",
                        });
                      }
                    })}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="İlan numarasını giriniz"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("propertyId")}
                      />
                      {errors.propertyId && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.propertyId.message}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#BFAA8B] hover:bg-[#eb5626] text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                    >
                      İlan Ara
                    </button>
                  </form>
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

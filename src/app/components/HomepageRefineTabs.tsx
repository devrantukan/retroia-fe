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
    <div className="flex flex-col w-full z-30">
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
                  <form
                    onSubmit={handleSubmit(async (data) => {
                      try {
                        const response = await fetch(
                          `/api/properties/check/${data.propertyId}`
                        );
                        const result = await response.json();

                        if (result.exists) {
                          router.push(`/portfoy/${data.propertyId}`);
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
                    <div>
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
                      className="w-full bg-[#FF6634] hover:bg-[#eb5626] text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
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

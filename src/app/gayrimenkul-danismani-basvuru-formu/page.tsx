import ProspectAgentForm from "../components/forms/ProspectAgentForm";

import { Metadata } from "next";
import GoogleReCaptchaWrapper from "../components/GoogleReCaptchaWrapper";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title:
    "Retroia Gayrimenkul, Real Estate - Gayrimenkul Danışmanı Başvuru Formu",
  description:
    "Retroia Gayrimenkul, Real Estate - Gayrimenkul Danışmanı Başvuru Formu",
};

const ProspectAgentPage = async () => {
  const countries = await prisma.country.findMany();

  let cities: Record<string, string[]> = {};

  for (const country of countries) {
    const citiesData = await prisma.city.findMany({
      where: {
        country_id: country.country_id,
      },
    });
    const cityNames = citiesData.map((city) => city.city_name);
    cities[country.country_id] = cityNames;
  }

  //console.log(districts);

  return (
    <div>
      <GoogleReCaptchaWrapper>
        <ProspectAgentForm cities={cities} />
      </GoogleReCaptchaWrapper>
    </div>
  );
};
export default ProspectAgentPage;

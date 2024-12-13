import ProspectAgentForm from "../components/forms/ProspectAgentForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Retroia Gayrimenkul, Real Estate - Gayrimenkul Danışmanı Başvuru Formu",
  description:
    "Retroia Gayrimenkul, Real Estate - Gayrimenkul Danışmanı Başvuru Formu",
};

const ProspectAgentPage = async () => {
  return (
    <div>
      <ProspectAgentForm />
    </div>
  );
};
export default ProspectAgentPage;

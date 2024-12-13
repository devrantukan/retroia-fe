import { Metadata } from "next";
import ProspectCustomerForm from "../components/forms/ProspectCustomerForm";
export const metadata: Metadata = {
  title: "Retroia Gayrimenkul, Real Estate - Gayrimenkul Satış / Kiralama",
  description:
    "Retroia Gayrimenkul, Real Estate - Gayrimenkul Satış / Kiralama",
};
const ProspectCustomerPage = async () => {
  return (
    <div>
      <ProspectCustomerForm />
    </div>
  );
};
export default ProspectCustomerPage;

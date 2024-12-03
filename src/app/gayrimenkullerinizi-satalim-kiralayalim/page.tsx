import { ImagesSlider } from "@/app/components/ImageSlider";
import PageTitle from "@/app/components/pageTitle";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OfficeCard from "../components/OfficeCard";
import ProspectCustomerForm from "../components/forms/ProspectCustomerForm";

const ProspectCustomerPage = async () => {
  return (
    <div>
      <ProspectCustomerForm />
    </div>
  );
};
export default ProspectCustomerPage;

import { Card, Image } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";

const ProjectCard = ({ project, showAvatar }: any) => {
  return (
    <Card className="w-full flex lg:flex-row mb-4" shadow="md">
      <Link
        className="hover:text-primary-500 transition-colors w-4/5"
        href={`/project/${project.id}`}
      >
        <div className="flex lg:flex-row ">
          <Image
            radius="none"
            src={
              project.id === 1
                ? project.images[0].url
                : `/images/${Math.floor(Math.random() * 9 + 1)}.jpg`
            }
            className="object-fill w-64 h-48"
            alt={project.name}
          />
          <div className="flex flex-col mt-2">
            <div className="p-4 h-full">
              <p className="text-slate-600">
                {project.location.country} / {project.location.city} /{" "}
                {project.location.district} / {project.location.neighborhood}
              </p>
              <p className="text-primary-600 text-xl font-bold">
                {project.name}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-200 p-4 flex justify-start">
              <p className="text-2xl lining-nums font-semibold tracking-wider">
                {/* {project.price.toLocaleString("tr-TR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })} */}
              </p>
              <span className="text-lg">₺</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="w-1/5 flex items-center flex-col my-auto  hover:bg-slate-100 hover:cursor-pointer rounded-xl mr-4">
        {/* <Avatar
          showFallback
          name={property.agent?.name + " " + property.agent?.surname}
          src="https://images.unsplash.com/broken"
        />
        <p>
          {property.agent?.name} {property.agent?.surname}
        </p>
        <p>{property.agent?.office.title}</p> */}
        {/* {showAvatar == true && (
          <Link
            href={`/danisman/${property.agentId}/${property.agent.slug}`}
            className="flex justify-center items-center flex-col my-6"
          >
            <Avatar
              showFallback
              name={property.agent?.name + " " + property.agent?.surname}
              src={property.agent?.avatarUrl}
              className="h-16 w-16 mb-2"
            />
            <p className="font-bold">
              {property.agent.name} {property.agent.surname}
            </p>
            <p className="font-light">{property.agent.office.name}</p>
          </Link>
        )} */}
      </div>
    </Card>
  );
};

export default ProjectCard;

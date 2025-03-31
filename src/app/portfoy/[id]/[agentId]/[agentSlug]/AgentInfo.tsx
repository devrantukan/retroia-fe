import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, EnvelopeSimple, Phone } from "@phosphor-icons/react";

interface AgentInfoProps {
  agent: {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    office: {
      id: number;
      slug: string;
    };
    role: {
      slug: string;
    };
    slug: string;
  };
}

const AgentInfo = ({ agent }: AgentInfoProps) => {
  return (
    <div className="flex items-start space-x-3 p-2 justify-between">
      <div className="flex-shrink-0 w-24 h-24">
        {agent.avatarUrl ? (
          <Image
            src={agent.avatarUrl}
            alt={agent.name}
            width={64}
            height={64}
            className="rounded-full object-cover border border-gray-300"
          />
        ) : (
          <User name={agent.name} className="text-gray-400" />
        )}
      </div>

      <div className="flex-grow">
        <h3 className="text-base font-semibold mb-2 text-right">
          <Link
            href={`/emlak/ofis/${agent.office.id}/${agent.office.slug}/${agent.role.slug}/${agent.id}/${agent.slug}`}
          >
            {agent.name} {agent.surname}
          </Link>
        </h3>

        <div className="space-y-1 text-right">
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center text-blue-600 hover:text-blue-800 justify-end text-sm"
          >
            <EnvelopeSimple size={20} weight="light" className="mr-2" />
            {agent.email}
          </a>

          <a
            href={`tel:${agent.phone}`}
            className="flex items-center text-blue-600 hover:text-blue-800 justify-end text-sm"
          >
            <Phone size={20} weight="light" className="mr-2" />
            {agent.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgentInfo;

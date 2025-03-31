import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string; agentSlug?: string } }
) {
  try {
    const agent = await prisma.officeWorker.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        office: true,
        role: true,
      },
    });

    console.log("Raw agent data:", JSON.stringify(agent, null, 2));

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Transform the data to include slug
    const transformedAgent = {
      ...agent,
      slug: params.agentSlug || agent.slug,
      office: {
        ...agent.office,
        slug: agent.office.name.toLowerCase().replace(/\s+/g, "-"),
      },
      role: {
        ...agent.role,
        slug: agent.role.slug,
      },
    };

    console.log(
      "Transformed agent data:",
      JSON.stringify(transformedAgent, null, 2)
    );

    return NextResponse.json(transformedAgent);
  } catch (error) {
    console.error("Error fetching agent:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

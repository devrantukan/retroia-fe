
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const Typesense = require('typesense');

const client = new Typesense.Client({
  nodes: [
    {
      host: "search.m1nd.xyz",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: "xyz",
  connectionTimeoutSeconds: 6,
});

async function createCollection() {
  const collectionSchema = {
    name: "posts",
    fields: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { facet: true, name: "price", type: "int32" },
      { facet: true, name: "contract", type: "string" },
      { facet: true, name: "tags", type: "string[]", optional: true},
      { facet: true, name: "type", type: "string" },
      { facet: true, name: "neighborhood", type: "string" },
      { facet: true, name: "district", type: "string" },
      { facet: true, name: "city", type: "string" },
      { facet: true, name: "country", type: "string" },
      { facet: true, name: "bedrooms", type: "int32" },
      { facet: true, name: "bathrooms", type: "int32" },
      { facet: true, name: "area", type: "int32" },
      { facet: true, name: "hasBalcony", type: "bool" },
      { facet: true, name: "hasSwimmingPool", type: "bool" },
      { facet: true, name: "hasGardenYard", type: "bool" },
      { facet: true, name: "parkingSpots", type: "int32" },
     
      { name: "published_date", type: "int32" }
    ],
    default_sorting_field: "published_date"
  };

  return await client.collections().create(collectionSchema);
}

async function insertData(item) {
  const samplePost = {
    id: item.id.toString(),
    title: item.name,
    description: "A deep dive into integrajting Typesense search engine with Next.js using Docker.",
    price: item.price,
    tags: ["Typesense", "Next.js", "Docker"],
    type: item.type.value,
    contract: item.contract.value,
    neighborhood: item.location.neighborhood,
    district: item.location.district,
    city: item.location.city,
    country: item.location.country,
    bedrooms: item.feature.bedrooms,
    bathrooms: item.feature.bathrooms,
    area: item.feature.area,
    hasBalcony: item.feature.hasBalcony,
    hasSwimmingPool: item.feature.hasSwimmingPool,
    hasGardenYard: item.feature.hasGardenYard,
    parkingSpots: item.feature.parkingSpots,
    agentId: item.agent.id,
    agentName: item.agent.name, 
    agentSurname: item.agent.surname,
    agentAvatarUrl: item.agent.avatarUrl,
    agentSlug: item.agent.slug,
    agentOffice: item.agent.office,
    published_date: Math.floor(new Date("2023-08-24").getTime() / 1000)  // Convert to Unix timestamp. In Typesense, only integer or float fields can be used as sorting fields.
  };

  console.log(samplePost)

  return await client.collections("posts").documents().create(samplePost);
}

async function main() {
  await createCollection();

  const properties = await prisma.property.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      type: true,
      contract: true,
      images: {
        select: {
          url: true,
        },
      },
      location: {
        select: {
          neighborhood: true,
          district: true,
          city: true,
          country: true,
        },
      },
      feature: {
        select: {
          bedrooms: true,
          bathrooms: true,
          area: true,
          hasBalcony: true,
          hasSwimmingPool: true,
          hasGardenYard: true,
          parkingSpots: true,
        },
      },
      agent: {
        select: {
          id: true,
          name: true,
          surname: true,
          office: true,
          avatarUrl: true,
          slug: true,
        }
      }
      
    },
  });

  console.log(properties);
  properties.map(async item => {
    // Add your logic here
    await insertData(item);
  });

  
  console.log("Typesense data initialization complete!");
}
main();
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
      { name: "title", type: "string", "sort": true },
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
      { facet: true, name: "floor", type: "int32" },
      { name: "_geoloc", type: "geopoint" },
      
     
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
    floor: item.feature.floor,
    agentId: item.agent.id,
    agentName: item.agent.name, 
    images: item.images,
    agentSurname: item.agent.surname,
    agentAvatarUrl: item.agent.avatarUrl,
    agentSlug: item.agent.slug,
    agentRoleSlug: item.agent.role.slug,
    agentOffice: item.agent.office,
    published_date: Math.floor(new Date(item.updatedAt).getTime() / 1000),
    
    "category1": [item.contract.value],
    
    _geoloc: [
      parseFloat(item.location.latitude) || 0,
      parseFloat(item.location.longitude) || 0
    ],
    'location': {
      latitude: parseFloat(item.location.latitude),
      longitude: parseFloat(item.location.longitude)
    },
    // "categories.lvl1": `${item.contract.value} > ${item.type.value}`,
    // "categories.lvl2": `${item.contract.value} > ${item.type.value} > ${item.country}`,
    // "categories.lvl3": `${item.contract.value} > ${item.type.value} > ${item.country} > ${item.city}`
  };

  console.log('Location data being inserted:', samplePost.location); // Debug log
  return await client.collections("posts").documents().create(samplePost);
}
async function main() {
  await createCollection();

  const properties = await prisma.property.findMany({
    where: {
      publishingStatus: "PUBLISHED",
    },
    select: {
      id: true,
      name: true,
      price: true,
      type: true,
      contract: true,
      updatedAt: true,

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
          latitude: true,
          longitude: true,
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
          floor: true,
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
          role: {
            select: {
              slug: true,
            },
          },
        }
      }
      
    },
  });


  properties.map(async item => {
    // Add your logic here
    await insertData(item);
  });

  
  console.log("Typesense data initialization complete!");
}
main();
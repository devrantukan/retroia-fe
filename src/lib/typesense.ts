import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz", // Use the same you've defined in docker-compose
    nodes: [
      {
        host: "search.m1nd.xyz",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title",
  },
});

export default typesenseInstantsearchAdapter;

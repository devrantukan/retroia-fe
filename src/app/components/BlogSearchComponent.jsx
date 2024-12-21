"use client"
import React from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Stats,
  SortBy,
  Breadcrumb,
  Pagination,
  Configure,
  RangeInput,
  RangeSlider
} from "react-instantsearch-dom";
import typesenseInstantsearchAdapter from "../../lib/typesense"; // adjust the path based on your directory structure
import PropertySearchCard from "../components/PropertySearchCard";
import 'instantsearch.css/themes/satellite.css';
import { SearchDrawer } from "./SearchDrawer";
import { Button } from "@nextui-org/react";


const searchClient = typesenseInstantsearchAdapter.searchClient;



const BlogHitComponent = ({ hit }) => {
  return (
    <div className=" w-full">
      <PropertySearchCard property={hit} key={hit.id} />

    </div>
  );
};



const BlogSearchComponent = ({type, contract, country, city, district, neighborhood }) => {
  const postCollection = `posts`;

   const [isOpen, setIsOpen] = React.useState(false);

   const handleClick = () => {
    setIsOpen(true);
   };

  console.log('parameters1:', contract, type, country, city , district, neighborhood )

  let url = `type:=${type}&&contract:=${contract}`

  if(country) {

    url += `&&country:=${country}`;
    if(city) {
      url += `&&city:=${city}`;
      if(district) {
        url += `&&district:=${district}`;
        if(neighborhood) {
          url += `&&neighborhood:=${neighborhood}`;
        }
      }

    }
  }

  console.log('url',url)



  // const filters = country ? `type:=${type}&&contract:=${contract}&&country:=${country}` : `type:=${type}&&contract:=${contract}`
 const filters = url
console.log(filters)
  return (
    <InstantSearch
      indexName={postCollection}
      searchClient={searchClient}
      
    >
            <Configure
        analytics={false}
  
       filters={filters}
        hitsPerPage={8}
      />

      <div style={{ padding: "2%" }} className={`bg-white mr-4 gap-y-2 rounded-xl ${isOpen === true ? '' : 'hidden'} lg:block  `}>
            <h3>Contract</h3>
            <RefinementList attribute="contract" />
            <h3>Type</h3>
            <RefinementList attribute="type" />
            <h3>Ülke</h3>
            <RefinementList attribute="country" searchable={true}  />
            <h3>Şehir</h3>
            <RefinementList attribute="city" searchable={true} />
            <h3>İlçe</h3>
            <RefinementList attribute="district"  searchable={true}/>
            <h3>Mahalle</h3>
            <RefinementList attribute="neighborhood"  searchable={true}  />
       
       
            <h3>Oda sayısı</h3>
            <RefinementList attribute="bedrooms"  />
            <h3>Banyo sayısı</h3>
            <RefinementList attribute="bathrooms" />
            <h3>Yüzme Havuzu</h3>
            <RefinementList attribute="hasSwimmingPool" />
            <h3>Fiyat</h3>
           
            <RangeInput attribute="price" />
        <SearchBox />
       
      </div>

      <div className="flex w-full" >
        <main style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="w-full ">
          <div style={{ padding: "2%" }}>

  
          <Stats />
<Button onClick={handleClick} > show panel </Button>
            <SortBy
              defaultRefinement={postCollection}
              items={[
                { value: postCollection, label: "Latest" },
                { value: `${postCollection}_title_asc`, label: "Title A-Z" },
                { value: `${postCollection}_title_desc`, label: "Title Z-A" },
              ]}
            />
          

          </div>
          <Hits hitComponent={BlogHitComponent} />
          <Pagination  />
        </main>
      </div>
    </InstantSearch>
  );
};export default BlogSearchComponent;

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
  RangeSlider, 
  HierarchicalMenu,
  ClearRefinements
} from "react-instantsearch-dom";
import typesenseInstantsearchAdapter from "../../lib/typesense"; // adjust the path based on your directory structure
import PropertySearchCard from "../components/PropertySearchCard";
import 'instantsearch.css/themes/satellite.css';
import { SearchDrawer } from "./SearchDrawer";
import { Button } from "@nextui-org/react";

import {
  GoogleMapsLoader,
  GeoSearch,
  Control,
  Marker,
} from 'react-instantsearch-dom-maps';





const searchClient = typesenseInstantsearchAdapter.searchClient;



const BlogHitComponent = ({ hit }) => {
  return (
    <div className=" w-full">
      <PropertySearchCard property={hit} showAvatar={true} key={hit.id} />

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

  const transformItems = (items) => {
    return items.map((item) => ({
      ...item,
    
    })).sort((a, b) => a.label < b.label ? -1 : 1);
  };



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
      

      <div  className={`bg-white mr-4 gap-y-2 p-4 rounded-xl ${isOpen === true ? '' : 'hidden'} lg:block  `}>

            <ClearRefinements
              translations={{
                reset: 'Tüm Filtreleri Temizle',
              }}
            />
            <h3>Contract</h3>
            <RefinementList attribute="contract" className="mb-4"/> 
            <h3>Type</h3>
            <RefinementList attribute="type" className="mb-4"/>
            <h3>Ülke</h3> 
            <RefinementList 
              attribute="country" 
              className="mb-4" 
              searchable={true}   
              translations={{
                showMore(expanded) {
                  return expanded ? 'Show less' : 'Show more';
                },
                noResults: 'No results',
                submitTitle: 'Submit your search query.',
                resetTitle: 'Clear your search query.',
                placeholder: 'Arama...',
              }}
            transformItems={transformItems} />
            <h3>Şehir</h3>
            <RefinementList 
              attribute="city" 
              className="mb-4" 
              searchable={true} 
              transformItems={transformItems}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Show less' : 'Show more';
                },
                noResults: 'No results',
                submitTitle: 'Submit your search query.',
                resetTitle: 'Clear your search query.',
                placeholder: 'Arama...',
              }}
               />
            <h3>İlçe</h3>
            <RefinementList 
              attribute="district" 
              className="mb-4"  
              searchable={true} 
              transformItems={transformItems}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Show less' : 'Show more';
                },
                noResults: 'No results',
                submitTitle: 'Submit your search query.',
                resetTitle: 'Clear your search query.',
                placeholder: 'Arama...',
              }}
              />
            <h3>Mahalle</h3>
            <RefinementList 
              attribute="neighborhood"  
              className="mb-4"
              searchable={true}  
              transformItems={transformItems}
              translations={{
                showMore(expanded) {
                  return expanded ? 'Show less' : 'Show more';
                },
                noResults: 'No results',
                submitTitle: 'Submit your search query.',
                resetTitle: 'Clear your search query.',
                placeholder: 'Arama...',
              }}
              /> 
       
       
            <h3>Oda sayısı</h3>
            <RefinementList attribute="bedrooms" className="mb-4" transformItems={transformItems}  />
            <h3>Banyo sayısı</h3>
            <RefinementList attribute="bathrooms" className="mb-4" transformItems={transformItems}/>
            {/* <h3>Yüzme Havuzu</h3>
            <RefinementList attribute="hasSwimmingPool" className="mb-4" transformItems={transformItems}/> */}
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
              container = '#sort-by'
              defaultRefinement={postCollection}
              items={[
                { value: postCollection, label: "Yayınlanma Tarihi En Yeni" },
                { value: `${postCollection}/sort/published_date:desc`, label: "Yayınlanma Tarihi En Eski" },
                { value: `${postCollection}/sort/title:asc`, label: "Başlık A-Z" },
                { value: `${postCollection}/sort/title:desc`, label: "Başlık Z-A" },
                { value: `${postCollection}/sort/price:desc`, label: "Fiyat Azalan" },
                { value: `${postCollection}/sort/price:asc`, label: "Fiyat Artan" },
              ]}
            />
          

          </div>
          {/* <div className="h-[500px]" style={{ height: 500 }}>
  <GoogleMapsLoader 
    apiKey="AIzaSyDMTvXdDIxkmlxtPmBRBEUvpwX1PtWQTr4"
    endpoint="https://maps.googleapis.com/maps/api/js?v=weeklyloading=async"
    >
    {google => (
      <GeoSearch 
      mapTypeId={google.maps.MapTypeId.SATELLITE}
      google={google} 
      initialPosition={{
        lat: 48.88038,
        lng: 2.32695,
      }}>
        {({ hits }) => (
          <div>
            <Control />
            {hits.map(hit => (
              <Marker key={hit.objectID} hit={hit} />
            ))}
          </div>
        )}
      </GeoSearch>
    )}
  </GoogleMapsLoader>
</div> */}
          <Hits hitComponent={BlogHitComponent} />
          <Pagination  />
        </main>
      </div>
    </InstantSearch>
  );
};export default BlogSearchComponent;
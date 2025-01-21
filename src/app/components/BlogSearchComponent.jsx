"use client"
import React, { useState } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Stats,
  SortBy,
  Pagination,
  Configure,
  RangeInput,
  connectStateResults,
  ClearRefinements,
} from "react-instantsearch-dom";
import typesenseInstantsearchAdapter from "../../lib/typesense"; // adjust the path based on your directory structure
import PropertySearchCard from "../components/PropertySearchCard";
import 'instantsearch.css/themes/satellite.css';
import { SearchDrawer } from "./SearchDrawer";
import { Button } from "@nextui-org/react";
import { CaretUp, CaretDown } from "@phosphor-icons/react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Modal } from "@nextui-org/react";

const searchClient = typesenseInstantsearchAdapter.searchClient;

const BlogHitComponent = ({ hit }) => {
  return (
    <div className=" w-full">
      <PropertySearchCard property={hit} showAvatar={true} key={hit.id} />
    </div>
  );
};

const NoResultsStateResults = connectStateResults(({ searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;
  return hasResults ? (
    <div className="bg-white mr-4 gap-y-2 p-4 rounded-xl lg:block">
      {/* ... refinements ... */}
    </div>
  ) : null;
});

const NoResults = connectStateResults(({ searchResults, searching }) => {
  if (searching) return null;
  if (searchResults && searchResults.nbHits === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4">
        <style jsx global>{`
          .ais-RefinementList, .ais-SearchBox, .ais-ClearRefinements {
            display: none !important;
          }
        `}</style>
        
        <div className="text-center mb-12 w-full max-w-4xl mx-auto">
          <div className="text-3xl font-bold text-gray-800 mb-4">
            Arama sonucu bulunamadı
          </div>
          <div className="text-gray-500 text-lg mb-8">
            &ldquo;{searchResults?.query}&rdquo; için sonuç bulunamadı
          </div>
          <div className="text-gray-600">
            Öneriler:
            <ul className="list-disc list-inside mt-2">
              <li>Yazım hatası olmadığından emin olun</li>
              <li>Daha genel arama terimleri kullanın</li>
              <li>Filtreleri temizleyip tekrar deneyin</li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Benzer İlanlar
          </h3>
          <InstantSearch 
            searchClient={searchClient} 
            indexName={postCollection}
          >
            <Configure 
              hitsPerPage={3} 
              filters="type:konut"
            />
            <Hits hitComponent={BlogHitComponent} />
          </InstantSearch>
        </div>
      </div>
    );
  }
  return null;
});

const PaginationWithResults = connectStateResults(({ searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;
  return hasResults ? (
    <Pagination
      // ... pagination props ...
    />
  ) : null;
});

const MapResults = connectStateResults(({ searchResults }) => {
  if (!searchResults) return null;

  // Debug log
  //console.log('Search results locations:', searchResults.hits.map(hit => hit.location));

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    margin: '20px 0'
  };

  // Validate and find first valid location
  const validLocations = searchResults.hits.filter(hit => 
    hit.location &&
    typeof hit.location.latitude === 'number' &&
    typeof hit.location.longitude === 'number'
  );

  //console.log('Valid locations:', validLocations.map(hit => hit.location)); // Debug log

  const center = validLocations.length > 0 ? {
    lat: validLocations[0].location.latitude,
    lng: validLocations[0].location.longitude
  } : {
    lat: 41.0082,
    lng: 28.9784
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
      >
        {validLocations.map((hit) => (
          <Marker
            key={hit.objectID}
            position={{
              lat: hit.location.latitude,
              lng: hit.location.longitude
            }}
            onClick={() => {
              console.log('Property clicked:', hit);
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
});

const BlogSearchComponent = ({ type, contract, country, city, district, neighborhood }) => {
  const postCollection = `posts`;

   const [isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
    setIsOpen(!isOpen);
   };

  //console.log('parameters1:', contract, type, country, city , district, neighborhood )

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

  //console.log('url',url)

  const transformItems = (items) => {
    return items.map((item) => ({
      ...item,
    
    })).sort((a, b) => a.label < b.label ? -1 : 1);
  };



  // const filters = country ? `type:=${type}&&contract:=${contract}&&country:=${country}` : `type:=${type}&&contract:=${contract}`
 const filters = url
//console.log(filters)
  return (
    <InstantSearch
      indexName={postCollection}
      searchClient={searchClient}
      initialUiState={{
        [postCollection]: {
          refinementList: {
            type: type ? [type] : [],
            contract: contract ? [contract] : [],
            country: country ? [country] : [],
            city: city ? [city] : [],
            district: district ? [district] : [],
            neighborhood: neighborhood ? [neighborhood] : []
          }
        }
      }}
    >
      <Configure
        analytics={false}
        filters={filters}
        hitsPerPage={8}
        getRankingInfo={true}
        aroundLatLngViaIP={true}
        typoTolerance={true}
      />
      <div className="flex flex-col lg:flex-row">

      <div  className={`bg-white mr-4 gap-y-2 p-4 rounded-xl ${isOpen ? '' : 'hidden'} lg:block  `}>

            <ClearRefinements
              translations={{
                reset: 'Tüm Filtreleri Temizle',
              }}
            />
            <h3>Hizmet Tipi</h3>
            <RefinementList 
              attribute="contract" 
              className="mb-4"
              defaultRefinement={contract ? [contract] : []}
              transformItems={items => 
                items.map(item => ({
                  ...item,
                  isRefined: item.label === contract
                }))
              }
            /> 
            <h3>Gayrimenkul Tipi</h3>
            <RefinementList 
              attribute="type" 
              className="mb-4"
              defaultRefinement={type ? [type] : []}
              transformItems={items => 
                items.map(item => ({
                  ...item,
                  isRefined: item.label === type
                }))
              }
            />
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
           
            <RangeInput 
              attribute="price" 
              className="mb-4"
              translations={{
                submit: 'Uygula',
                separator: 'ile',
                currency: '₺',
                placeholder: 'Fiyat giriniz'
              }}
            />
        <SearchBox 
          translations={{
            placeholder: 'Ara...',
            submitTitle: 'Aramayı başlat',
            resetTitle: 'Aramayı temizle'
          }}
        />
       
      </div>

      <div className="flex w-full" >
        <main style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="w-full ">
          <div style={{ padding: "2%" }}  className="w-full">

  
          <Stats 
          className="mb-2"  
            translations={{
              stats(nbHits, processingTimeMS) {
                return `${nbHits.toLocaleString('tr-TR')} sonuç bulundu ${processingTimeMS.toLocaleString('tr-TR')} milisaniyede`;
              }
            }}
          />
<Button 
  onClick={handleClick} 
  className="lg:hidden flex items-center gap-2 mb-2"
>
  {isOpen ? 'Filtreleri Gizle' : 'Sonuçları Filtrele'}
  {isOpen ? <CaretUp size={20} /> : <CaretDown size={20} />}
</Button>
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
          <div className="w-full ">
            <MapResults />
          </div>
          <Hits hitComponent={BlogHitComponent} className= "w-full" />
          <Pagination
            className="flex justify-center items-center gap-2 my-4"
            translations={{
              previous: '‹',
              next: '›',
              first: '«',
              last: '»',
              page: (page) => page,
              ariaPrevious: 'Önceki sayfa',
              ariaNext: 'Sonraki sayfa',
              ariaFirst: 'İlk sayfa',
              ariaLast: 'Son sayfa',
              ariaPage: (page) => `${page}. sayfa`,
            }}
            padding={2}
            showFirst={false}
            showLast={false}
            totalPages={5}
          />
        </main>
      </div>
      </div>
    </InstantSearch>

  );
};export default BlogSearchComponent;
"use client"
import React, { useState, useRef, useEffect } from "react";
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
  connectRange,
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
      className="flex justify-center mt-4"
      padding={2}
      showFirst={false}
      showLast={false}
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

const ScrollableResults = ({ searchResults }) => {
  const searchResultsRef = useRef(null);

  useEffect(() => {
    if (searchResults?.page) {
      // Get viewport height
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      
      // Get element position
      const element = searchResultsRef.current;
      const elementPosition = element?.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;

      // Calculate offset based on viewport height
      const offset = vh < 800 ? -100 : -150; // Smaller offset for mobile

      window.scrollTo({
        top: offsetPosition + offset,
        behavior: 'smooth'
      });
    }
  }, [searchResults?.page]);

  return <div ref={searchResultsRef} />;
};

const ConnectedScrollableResults = connectStateResults(ScrollableResults);

const CustomRangeInput = connectRange(({ 
  currentRefinement, 
  refine, 
  min, 
  max, 
  attribute,
  className 
}) => {
  const [localMin, setLocalMin] = useState(currentRefinement.min || min);
  const [localMax, setLocalMax] = useState(currentRefinement.max || max);

  useEffect(() => {
    if (min && max) {
      setLocalMin(min);
      setLocalMax(max);
    }
  }, [min, max]);

  const handleSubmit = (e) => {
    e.preventDefault();
    refine({ min: localMin, max: localMax });
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className || ''}`}>
      <div className="flex gap-2">
        <input
          type="number"
          value={localMin || ''}
          onChange={(e) => setLocalMin(parseInt(e.target.value))}
          placeholder="Min"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={localMax || ''}
          onChange={(e) => setLocalMax(parseInt(e.target.value))}
          placeholder="Max"
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Uygula
      </button>
    </form>
  );
});

const BlogSearchComponent = ({ type, contract, country, city, district, neighborhood, min, max }) => {
  const postCollection = `posts`;
  const [isOpen, setIsOpen] = useState(false);
  const searchResultsRef = useRef(null);
  const [priceRange, setPriceRange] = useState({
    min: min ? parseInt(min) : undefined,
    max: max ? parseInt(max) : undefined
  });

  console.log('BlogSearchComponent params:', { min, max, priceRange });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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

  // Add price range filter if min/max are provided
  if (min || max) {
    let priceFilter = 'price:';
    if (min && max) {
      priceFilter += `${min}..${max}`;
    } else if (min) {
      priceFilter += `>=${min}`;
    } else if (max) {
      priceFilter += `<=${max}`;
    }
    url += `&&${priceFilter}`;
  }

  const transformItems = (items) => {
    return items.map((item) => ({
      ...item,
    })).sort((a, b) => a.label < b.label ? -1 : 1);
  };

  const filters = url;

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
          },
          range: {
            price: {
              min: min ? parseInt(min) : undefined,
              max: max ? parseInt(max) : undefined
            }
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
      <ConnectedScrollableResults />
      <div className="flex flex-col lg:flex-row">
        <div className={`bg-white mr-4 gap-y-2 p-4 rounded-xl ${isOpen ? '' : 'hidden'} lg:block`}>
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
            transformItems={transformItems} 
          />
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
          <RefinementList 
            attribute="bedrooms" 
            className="mb-4" 
            transformItems={items => items
              .sort((a, b) => parseInt(a.label) - parseInt(b.label))
            }
          />
          <h3>Banyo sayısı</h3>
          <RefinementList 
            attribute="bathrooms" 
            className="mb-4" 
            transformItems={items => items
              .sort((a, b) => parseInt(a.label) - parseInt(b.label))
            }
          />
          <h3>Fiyat</h3>
          <CustomRangeInput 
            attribute="price"
            min={min ? parseInt(min) : undefined}
            max={max ? parseInt(max) : undefined}
            className="mb-4"
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
                  
                  { value: `${postCollection}/sort/published_date:asc`, label: "Yayınlanma Tarihi En Eski" },
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
            <div id="search-container">
              <Hits hitComponent={BlogHitComponent} />
              <PaginationWithResults />
            </div>
          </main>
        </div>
      </div>
    </InstantSearch>
  );
};

export default BlogSearchComponent;
import BlogSearchComponent from "./BlogSearchComponent";

const Search = ({
  type,
  contract,
  country,
  city,
  district,
  neighborhood,
}: {
  type: string;
  contract: string;
  country: string;
  city: string;
  district: string;
  neighborhood: string;
}) => {
  // const searchParams = useSearchParams();
  // const pathName = usePathname();
  // const router = useRouter();
  // const handleChange = useDebouncedCallback((query: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (query) params.set("query", query);
  //   else params.delete("query");

  //   router.replace(`${pathName}?${params.toString()}`);
  // }, 1000);

  return (
    <div className="p-4   bg-gradient-to-br from-sky-400 to-[#102960] w-full">
      <BlogSearchComponent
        type={type}
        contract={contract}
        country={country}
        city={city}
        district={district}
        neighborhood={neighborhood}
      />
      {/* <Input
        onChange={(e) => handleChange(e.target.value)}
        className="w-96 shadow"
        endContent={<MagnifyingGlassIcon className="w-4 text-slate-500 " />}
        defaultValue={searchParams.get("query") ?? ""}
      /> */}
    </div>
  );
};

export default Search;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { any, z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";

// const cities = [
//   { value: "nyc", label: "New York City", country_slug: "kktc" },
//   { value: "la", label: "Los Angeles", country_slug: "kktc" },
//   { value: "chicago", label: "Chicago", country_slug: "kktc" },
//   { value: "toronto", label: "Toronto", country_slug: "kktc" },
//   { value: "vancouver", label: "Vancouver", country_slug: "kktc" },
//   { value: "london", label: "London", country_slug: "turkiye" },
//   // Add more cities as needed
// ];

const FormSchema = z.object({
  contract: z.string({
    required_error: "Hizmet tipi seçiniz.",
  }),
  country: z
    .string({
      required_error: "Lütfen ülke seçiniz.",
    })
    .optional(),
  city: z
    .string({
      required_error: "Lütfen il seçiniz.",
    })
    .optional(),
  district: z
    .string({
      required_error: "Lütfen ilçe seçiniz.",
    })
    .optional(),
  neighborhood: z
    .string({
      required_error: "Lütfen mahalle seçiniz.",
    })
    .optional(),
  min: z
    .string({
      required_error: "Hizmet tipi seçiniz.",
    })
    .optional(),
  max: z
    .string({
      required_error: "Hizmet tipi seçiniz.",
    })
    .optional(),
  currency: z
    .string({
      required_error: "Para Birimi seçiniz.",
    })
    .optional(),
  propertyType: z.string({
    required_error: "Tip seçiniz.",
  }),
});

export function HomepageRefineForm({ propertyType }: { propertyType: string }) {
  const [countries, setCountries] = React.useState<any[]>([]);
  const [cities, setCities] = React.useState<any[]>([]);
  const [districts, setDistricts] = React.useState<any[]>([]);
  const [neighborhoods, setNeighborhoods] = React.useState<any[]>([]);

  const [selectedPropertyType, setSelectedPropertyType] = React.useState("");
  const [cityOpen, setCityOpen] = React.useState(false);
  const [districtOpen, setDistrictOpen] = React.useState(false);
  const [neighborhoodOpen, setNeighborhoodOpen] = React.useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = React.useState("");
  const [selectedDistrict, setSelectedDistrict] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get("/api/location/get-countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await axios.get("/api/location/get-cities");
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
    fetchCities();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      try {
        const response = await axios.get(
          `/api/location/get-districts/${selectedCity}`
        );
        setDistricts(response.data);
        console.log("rd", response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }
    fetchDistricts();
  }, [selectedCity]);

  async function fetchNeighborhoods(district_slug: string) {
    try {
      const response = await axios.get(
        `/api/location/get-neighborhood/${district_slug}`
      );
      setNeighborhoods(response.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }

  console.log(countries);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  console.log(selectedCountry);

  const router = useRouter();

  useEffect(() => {
    setSelectedPropertyType(propertyType);
    form.setValue("propertyType", propertyType);
  }, [form, propertyType]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const url = `${data.propertyType}/${data.contract}${
      selectedCountry ? `/${selectedCountry}` : ""
    }${data.city ? `/${data.city}` : ""}${
      data.district ? `/${data.district}` : ""
    }${data.neighborhood ? `/${data.neighborhood}` : ""}`;
    //  console.log(url);
    router.push(url);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-4 gap-x-4 ">
          <FormField
            control={form.control}
            name="contract"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satılık / Kiralık</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="bg-white">
                    <SelectTrigger>
                      <SelectValue placeholder="Hizmet Tipi Seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="satilik">Satılık</SelectItem>
                    <SelectItem value="kiralik">Kiralık</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ülke</FormLabel>
                <Select
                  value={selectedCountry}
                  onValueChange={(value) => setSelectedCountry(value)}
                  defaultValue={field.value}
                >
                  <FormControl className="bg-white">
                    <SelectTrigger>
                      <SelectValue placeholder="Ülke seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem
                        key={country.country_slug}
                        value={country.country_slug}
                      >
                        {country.country_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>İl</FormLabel>
                <Popover open={cityOpen} onOpenChange={setCityOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? cities.find((city) => city.value === field.value)
                              ?.label
                          : "İl Seçiniz"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Arama..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>Bulunamadı.</CommandEmpty>
                        <CommandGroup>
                          {cities

                            .filter(
                              (city) => city.country_slug === selectedCountry
                            )
                            .map((city) => (
                              <CommandItem
                                value={city.label}
                                key={city.value}
                                onSelect={() => {
                                  setSelectedCity(city.value);
                                  form.setValue("city", city.value);
                                  setCityOpen(false);
                                }}
                              >
                                {city.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    city.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>İlçe</FormLabel>
                <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? districts.find(
                              (district) => district.value === field.value
                            )?.label
                          : "İlçe Seçiniz"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Arama..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>Bulunamadı.</CommandEmpty>
                        <CommandGroup>
                          {districts

                            .filter(
                              (district) => district.city_slug === selectedCity
                            )
                            .map((district) => (
                              <CommandItem
                                value={district.label}
                                key={district.value}
                                onSelect={() => {
                                  setSelectedDistrict(district.value);
                                  form.setValue("district", district.value);
                                  fetchNeighborhoods(district.value);
                                  setDistrictOpen(false);
                                }}
                              >
                                {district.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    district.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Mahalle</FormLabel>
                <Popover
                  open={neighborhoodOpen}
                  onOpenChange={setNeighborhoodOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? neighborhoods.find(
                              (neighborhood) =>
                                neighborhood.value === field.value
                            )?.label
                          : "Mahalle Seçiniz"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Arama..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>Bulunamadı</CommandEmpty>
                        <CommandGroup>
                          {neighborhoods
                            .filter(
                              (neighborhood) =>
                                neighborhood.district_slug === selectedDistrict
                            )
                            .map((neighborhood) => (
                              <CommandItem
                                value={neighborhood.label}
                                key={neighborhood.value}
                                onSelect={() => {
                                  setSelectedNeighborhood(neighborhood.value);
                                  form.setValue(
                                    "neighborhood",
                                    neighborhood.value
                                  );
                                  setNeighborhoodOpen(false);
                                }}
                              >
                                {neighborhood.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    neighborhood.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-x-2">
            <FormField
              control={form.control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min</FormLabel>
                  <FormControl className="bg-white">
                    <Input placeholder="min" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max</FormLabel>
                  <FormControl className="bg-white">
                    <Input placeholder="max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Type</FormLabel>
                  <FormControl className="bg-white">
                    <Input
                      placeholder="Type"
                      {...field}
                      value={selectedPropertyType}
                      onChange={(e) => setSelectedPropertyType(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Para Birimi</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-white">
                      <SelectTrigger>
                        <SelectValue placeholder="Para Birimi Seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="trl">TRL</SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="w-20 bg-blue-950">Harita</Button>
          <Button className="ml-2 w-56 bg-orange-600" type="submit">
            Ara
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

function validatePhoneNumber(phoneNumber: string) {
  // Regular expression to match most international phone number formats
  var phoneNumberRegex =
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
  // Test the phone number against the regular expression
  if (phoneNumberRegex.test(phoneNumber)) {
    // Phone number is valid
    return true;
  } else {
    // Phone number is not valid
    return false;
  }
}

export default function ProspectCustomerForm({
  cities,
}: {
  cities: Record<any, any[]>;
}) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [propertyType, setPropertyType] = React.useState("");
  const [contractType, setContractType] = React.useState("");
  const [streetAddress, setStreetAddress] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [cityOptions, setCityOptions] = React.useState<string[]>([]);
  const [districtOptions, setDistrictOptions] = React.useState<string[]>([]);
  const handleDistrictSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDistrict(e.target.value);
    form.setValue("district", e.target.value);
  };

  const handleCitySelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCity(e.target.value);
    form.setValue("city", e.target.value);
  };

  useEffect(() => {
    if (country) {
      setCityOptions(cities[country] || []);
      setCity("");
      setDistrict("");
    } else {
      setCountry("1");
    }
  }, [country, cities]);

  useEffect(() => {
    async function fetchDistricts(city: string) {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "/emlak/api";
        const encodedCity = encodeURIComponent(city);
        const response = await axios.get(
          `${API_URL}/data/districts/${encodedCity}/`
        );
        setDistrictOptions(response.data);
        setDistrict("");
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }
    if (city) {
      fetchDistricts(city);
    }
  }, [city]);

  const FormSchema = z.object({
    firstName: z.string({
      required_error: "Lütfen Adınızı Giriniz",
    }),
    lastName: z.string({
      required_error: "Lütfen Soyadınızı Giriniz",
    }),
    email: z
      .string()
      .min(1, { message: "Lütfen E-postanızı giriniz." })
      .email("Geçerli E-posta gereklidir."),
    // phone: z.string({
    //   required_error: "Lütfen Cep Telefonunuzu Giriniz",
    // }),
    phone: z
      .string()
      .transform((val) => val)
      .pipe(
        z
          .string()
          .refine((val) => validatePhoneNumber(val.replace(/\s+/g, "")), {
            message: "Geçerli bir tel no giriniz",
          })
      ),
    city: z.enum(Object.values(cities).flat() as [string, ...string[]], {
      errorMap: (issue, ctx) => ({ message: "Lütfen şehir seçiniz" }),
    }),
    district: z.enum(
      Object.values(districtOptions).flat() as [string, ...string[]],
      {
        errorMap: (issue, ctx) => ({ message: "Lütfen ilçe seçiniz" }),
      }
    ),

    // educationLevel: z.enum(
    //   Object.values(educationLevelList) as [any, ...any[]],
    //   {
    //     errorMap: (issue, ctx) => ({ message: "Lütfen seçiniz" }),
    //   }
    // ),
    // occupation: z.enum(occupationList as [string, any], {
    //   errorMap: (issue, ctx) => ({ message: "Lütfen seçiniz" }),
    // }),
    contractType: z.enum(["rental", "forSale"], {
      required_error: "Hizmet Tipi Seçiniz.",
    }),
    propertyType: z.enum(["residential", "commercial", "land"], {
      required_error: "Gayrimenkul Tipi Seçiniz.",
    }),
    streetAddress: z
      .string()
      .min(10, `Text must be at least ${10} characters`)
      .max(1000, `Text must not exceed ${1000} characters`),
    notes: z
      .string()
      .min(10, `Text must be at least ${10} characters`)
      .max(1000, `Text must not exceed ${1000} characters`)
      .optional(),
    kvkkConsent: z.literal<boolean>(true, {
      errorMap: () => ({
        message: "Kvkk metnini kabul etmelisiniz",
      }),
    }),
    marketingConsent: z
      .literal<boolean>(true, {
        errorMap: () => ({
          message:
            "Ön Bilgilendirme Koşulları'nı ve Mesafeli Satış Sözleşmesi'ni kabul etmelisiniz",
        }),
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      streetAddress: "",
      notes: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "/emlak/api";
      const { data: responseData } = await axios.post(
        `${API_URL}/forms/post-prospect-customer-form`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (responseData.message === "success") {
        toast.success(
          "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );

        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setCity("");
        setDistrict("");
        setPropertyType("");
        setContractType("");
        setStreetAddress("");
        setNotes("");
        form.reset();
      }
    } catch (error) {
      toast.error(
        "Form gönderilemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="container max-w-screen-md mx-auto my-6 p-4">
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
            <h1 className="text-xl font-semibold text-blue-950">
              Gayrimenkulünüzü Satalım / Kiralayalım
            </h1>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="Adı"
                        {...field}
                        value={firstName}
                        onValueChange={(value) => setFirstName(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="Soyadı"
                        {...field}
                        value={lastName}
                        onValueChange={(value) => setLastName(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="E-posta"
                        {...field}
                        value={email}
                        onValueChange={(value) => setEmail(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="Cep Telefonu"
                        {...field}
                        value={phone}
                        onValueChange={(value) => setPhone(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="text-lg font-semibold text-blue-950">
              Satmak veya Kiralamak İstediğiniz Gayrimenkul İle İlgili Bilgileri
              Doldurunuz.
            </h2>
            <FormField
              control={form.control}
              name="contractType"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white">
                    <RadioGroup
                      label="Hizmet Tipi Seçiniz"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex flex-row gap-x-4">
                        <Radio value="rental">Kiralık</Radio>
                        <Radio value="forSale">Satılık</Radio>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white">
                    <RadioGroup
                      label="Gayrimenkul Tipi Seçiniz"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex flex-row gap-x-4">
                        <Radio value="residential">Konut</Radio>
                        <Radio value="commercial">Ticari</Radio>
                        <Radio value="land">Arsa ve Arazi</Radio>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="bg-white">
                      <Select
                        {...field}
                        label="Şehir"
                        placeholder="Şehir Seçiniz"
                        className="w-full"
                        value={city}
                        onChange={handleCitySelectionChange}
                        disabled={!country}
                      >
                        {cityOptions.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="bg-white">
                      <Select
                        label="İlçe"
                        placeholder="İlçe Seçiniz"
                        className="w-full"
                        value={district}
                        onChange={handleDistrictSelectionChange}
                        disabled={!city}
                      >
                        {districtOptions.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white">
                    <Textarea
                      label="Adres"
                      variant="bordered"
                      placeholder="Gayrimenkulunüzün Açık Adresini Giriniz."
                      disableAnimation
                      disableAutosize
                      classNames={{
                        base: "w-full",
                        input: "resize-y min-h-[60px]",
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white">
                    <Textarea
                      label="Notlarınız"
                      variant="bordered"
                      placeholder="Lütfen İletmek İstediğiniz Notları Giriniz."
                      disableAnimation
                      disableAutosize
                      classNames={{
                        base: "w-full",
                        input: "resize-y min-h-[60px]",
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kvkkConsent"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white" id="kvkkConsent">
                    <Checkbox
                      checked={field.value}
                      onChange={field.onChange}
                      className=" font-semibold text-blue-950 mt-8"
                    >
                      {" "}
                      <Link
                        onClick={() => {
                          window.open(
                            "/emlak /kvkk-ve-aydinlatma-metni",
                            "_blank"
                          );
                        }}
                        href="/emlak/kvkk-ve-aydinlatma-metni"
                        target="_blank"
                      >
                        KVKK metnini{" "}
                      </Link>
                      okudum onaylıyorum.
                    </Checkbox>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketingConsent"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white">
                    <Checkbox checked={field.value} onChange={field.onChange}>
                      {" "}
                      Retroia&apos;nın hizmetlerine ilişkin tanıtım amaçlı
                      elektronik iletilere, SMS gönderilerine ve aramalara izin
                      veriyorum.
                    </Checkbox>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-8 bg-blue-950 text-white font-bold text-md "
            >
              Başvuruyu Tamamla
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

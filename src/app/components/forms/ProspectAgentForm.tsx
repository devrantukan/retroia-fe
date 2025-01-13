"use client";
import { Button, Checkbox, Input } from "@nextui-org/react";

import { Select, SelectItem } from "@nextui-org/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import axios from "axios";
import { toast } from "react-toastify";

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

export default function ProspectAgentForm({
  cities,
}: // districts,
{
  cities: Record<any, any[]>;
  // districts: Record<any, any[]>;
}) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [occupation, setOccupation] = React.useState("");
  const [educationLevel, setEducationLevel] = React.useState("");

  const [cityOptions, setCityOptions] = React.useState<string[]>([]);
  const [districtOptions, setDistrictOptions] = React.useState<string[]>([]);

  const educationLevelList = [
    { key: "ilkokul", label: "İlk okul" },
    { key: "ortaokul", label: "Orta okul" },
    { key: "lise", label: "Lise" },
    { key: "onlisans", label: "Ön lisans" },
    { key: "lisans", label: "Lisans" },
    { key: "yukseklisans", label: "Yüksek lisans" },
    { key: "doktora", label: "Doktora" },
  ];

  const occupationList = [
    { key: "akademisyen", label: "Akademisyen" },
    { key: "asker", label: "Asker" },
    { key: "avukat", label: "Avukat" },
    { key: "bankaci", label: "Bankacı" },
    { key: "danisman", label: "Danışman" },
    { key: "doktor", label: "Doktor" },
    { key: "emekli", label: "Emekli" },
    { key: "emlak-ofisi-sahibi", label: "Emlak Ofisi Sahibi" },
    { key: "esnaf", label: "Esnaf" },
    { key: "gayrimenkul-danismani", label: "Gayrimenkul Danışmanı" },
    { key: "insan-kaynaklari", label: "İnsan Kaynakları" },
    { key: "isletmeci", label: "İşletmeci" },
    { key: "kamu-gorevlisi", label: "Kamu Görevlisi" },
    { key: "mimar", label: "Mimar" },
    { key: "muhasebeci", label: "Muhasebeci" },
    { key: "muhendis", label: "Mühendis" },
    { key: "muteahhit", label: "Müteahhit" },
    { key: "ogrenci", label: "Öğrenci" },
    { key: "ogretmen", label: "Öğretmen" },
    { key: "ozel-sektor-calisani", label: "Özel Sektör Çalışanı" },
    { key: "ozel-sektor-yonetici", label: "Özel Sektör Yönetici" },
    { key: "pazarlama", label: "Pazarlama" },
    { key: "psikolog", label: "Psikolog" },
    { key: "saglik-calisani", label: "Sağlık Çalışanı" },
    { key: "satis-yetkilisi", label: "Satış Yetkilisi" },
    { key: "serbest-meslek", label: "Serbest Meslek" },
    { key: "sigortaci", label: "Sigortacı" },
    { key: "sirket-sahibi", label: "Şirket Sahibi" },
    { key: "ticaret", label: "Ticaret" },
    { key: "turizm", label: "Turizm" },
    { key: "yeni-mezun", label: "Yeni Mezun" },
    { key: "diger", label: "Diğer" },
  ];

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

  const handleOccupationSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOccupation(e.target.value);

    form.setValue("occupation", e.target.value);
  };

  const handleEducationLevelSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEducationLevel(e.target.value);
    form.setValue("educationLevel", e.target.value);
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

  // useEffect(() => {
  //   if (city) {
  //     const districtOptions = await fetch("api/data/districts");
  //     setDistrictOptions(districtOptions);
  //     setDistrict("");
  //   }
  // }, [city]);

  useEffect(() => {
    async function fetchDistricts(city: string) {
      try {
        const response = await axios.get(`/api/data/districts/${city}`);
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
    educationLevel: z.string().min(1, "Lütfen Seçiniz"),
    occupation: z.string().min(1, "Lütfen Seçiniz"),
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
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { data: responseData } = await axios.post(
        "/api/forms/post-prospect-agent-form",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (responseData.message === "success") {
        toast.success(
          "Başvurunuz alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );

        // Reset form
        form.reset();
      }
    } catch (error) {
      toast.error(
        "Başvuru gönderilemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.",
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
              Gayrimenkul Danışmanı Başvuru Formu
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
              Çalışmak İstediğiniz Bölge Bilgisini Seçiniz
            </h2>
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
            <h2 className="text-lg font-semibold text-blue-950">
              Mesleğiniz ve Eğitim Durumunuz
            </h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-6">
              <FormField
                control={form.control}
                name="educationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="bg-white">
                      <Select
                        label="Eğitim Durumunuz"
                        placeholder="Lütfen Seçiniz"
                        className="max-w-sm"
                        value={educationLevel}
                        onChange={handleEducationLevelSelectionChange}
                      >
                        {educationLevelList.map((level) => (
                          <SelectItem key={level.key} value={level.key}>
                            {level.label}
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
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="bg-white">
                      <Select
                        label="Mesleki Durumunuz"
                        placeholder="Lütfen Seçiniz"
                        className="max-w-sm"
                        value={occupation}
                        onChange={handleOccupationSelectionChange}
                      >
                        {occupationList.map((occupation) => (
                          <SelectItem
                            key={occupation.key}
                            value={occupation.key}
                          >
                            {occupation.label}
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
                      KVKK metnini okudum onaylıyorum.
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

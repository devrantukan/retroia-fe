"use client";
import { Checkbox, Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";

export default function ProspectAgentForm() {
  const countries = [
    { key: "turkey", label: "Turkey" },
    { key: "spain", label: "Spain" },
  ];

  const educationLevel = [
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

  return (
    <div className="container max-w-screen-md mx-auto my-6 p-4">
      <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
        <h1 className="text-xl font-semibold text-blue-950">
          Gayrimenkul Danışmanı Başvuru Formu
        </h1>
        <Input type="text" label="First Name" />
        <Input type="text" label="Last Name" />
        <Input type="email" label="Email" />
        <Input type="tel" label="Phone Number" />
        <h2 className="text-lg font-semibold text-blue-950">
          Çalışmak İstediğiniz Bölge Bilgisini Seçiniz
        </h2>
        <div className="flex lg:flex-row w-full flex-col justify-between">
          <Select
            label="Şehir"
            placeholder="Şehir Seçiniz"
            className="max-w-sm"
          >
            {countries.map((country) => (
              <SelectItem key={country.key}>{country.label}</SelectItem>
            ))}
          </Select>

          <Select
            label="İlçe"
            placeholder="İlçe Seçiniz"
            className="max-w-sm mt-4 lg:mt-0 ml-0 lg:ml-4"
          >
            {countries.map((country) => (
              <SelectItem key={country.key}>{country.label}</SelectItem>
            ))}
          </Select>
        </div>
        <h2 className="text-lg font-semibold text-blue-950">
          Mesleğiniz ve Eğitim Durumunuz
        </h2>
        <div className="flex lg:flex-row w-full flex-col justify-between">
          <Select
            label="Eğitim Durumunuz"
            placeholder="Lütfen Seçiniz"
            className="max-w-sm"
          >
            {educationLevel.map((level) => (
              <SelectItem key={level.key}>{level.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="Mesleğiniz"
            placeholder="Lütfen Seçiniz"
            className="max-w-sm mt-4 lg:mt-0 ml-0 lg:ml-4"
          >
            {occupationList.map((occupation) => (
              <SelectItem key={occupation.key}>{occupation.label}</SelectItem>
            ))}
          </Select>
        </div>

        <Checkbox className=" font-semibold text-blue-950 mt-8">
          {" "}
          KVKK metnini okudum onaylıyorum.
        </Checkbox>
        <Checkbox>
          {" "}
          Retroia&apos;nın hizmetlerine ilişkin tanıtım amaçlı elektronik
          iletilere, SMS gönderilerine ve aramalara izin veriyorum.
        </Checkbox>
      </div>
    </div>
  );
}

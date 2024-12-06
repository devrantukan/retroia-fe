import { Button, Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";

export default function ProspectCustomerForm() {
  return (
    <div className="container max-w-screen-md mx-auto my-6 p-4">
      <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
        <h1 className="text-xl font-semibold text-blue-950">
          Gayrimenkulünüzü Satalım / Kiralayalım
        </h1>
        <Input type="text" label="First Name" />
        <Input type="text" label="Last Name" />
        <Input type="email" label="Email" />
        <Input type="tel" label="Phone Number" />
        <h2 className="text-lg font-semibold text-blue-950">
          Satmak veya Kiralamak İstediğiniz Gayrimenkul İle İlgili Bilgileri
          Doldurunuz.
        </h2>
        <RadioGroup label="Hizmet Tipi Seçiniz">
          <div className="flex flex-row gap-x-4">
            <Radio value="rental">Kiralık</Radio>
            <Radio value="forSale">Satılık</Radio>
          </div>
        </RadioGroup>
        <RadioGroup label="Gayrimenkul Tipi Seçiniz">
          <div className="flex flex-row gap-x-4">
            <Radio value="konut">Konut</Radio>
            <Radio value="ticari">Ticari</Radio>
            <Radio value="arsa-arazi">Arsa ve Arazi</Radio>
          </div>
        </RadioGroup>
        {/* <Select
        items={}
        label="Ülke"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        {() => <SelectItem>{}</SelectItem>}
      </Select>
      <Select
        items={}
        label="Şehir"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        {() => <SelectItem>{}</SelectItem>}
      </Select> */}
        <Textarea
          label="Address"
          variant="bordered"
          placeholder="Gayrimenkulunüzün Adresini Giriniz."
          disableAnimation
          disableAutosize
          classNames={{
            base: "w-full",
            input: "resize-y min-h-[60px]",
          }}
        />
        <Textarea
          label="Notes"
          variant="bordered"
          placeholder="Lütfen İletmek İstediğiniz Notları Giriniz."
          disableAnimation
          disableAutosize
          classNames={{
            base: "w-full",
            input: "resize-y min-h-[60px]",
          }}
        />
        <Button
          type="submit"
          className="mt-8 bg-blue-950 text-white font-bold text-md "
        >
          Başvuruyu Tamamla
        </Button>
      </div>
    </div>
  );
}

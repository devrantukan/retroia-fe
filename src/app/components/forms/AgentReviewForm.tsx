"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { StarRating } from "@/app/components/StarRating";
import { submitReview } from "@/app/actions/actions";

import { Button, Checkbox, Input } from "@nextui-org/react";

import { Textarea } from "@nextui-org/input";

import { toast } from "react-toastify";
import { HandEye } from "@phosphor-icons/react/dist/ssr";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

interface Props {
  officeWorkerId: number;
  onClose?: () => void;
}

const FormSchema = z.object({
  firstName: z.string({
    required_error: "Lütfen Adınızı Giriniz",
  }),
  lastName: z.string({
    required_error: "Lütfen Soyadınızı Giriniz",
  }),
  officeWorkerId: z.string({
    required_error: "Lütfen Soyadınızı Giriniz",
  }),
  score1: z.string({
    required_error: "Lütfen Soyadınızı Giriniz",
  }),
  score2: z.string({
    required_error: "Lütfen Soyadınızı Giriniz",
  }),
  score3: z.string({
    required_error: "Lütfen Soyadınızı Giriniz",
  }),
  score4: z.string({
    required_error: "Lütfen Soyadınızı Giriniz",
  }),
  score5: z.string({
    required_error: "Lütfen Soyadınızı Giriniz",
  }),
  score6: z.string({
    required_error: "Lütfen Soyadınızı Giriniz",
  }),
  email: z
    .string()
    .min(1, { message: "Lütfen E-postanızı giriniz." })
    .email("Geçerli E-posta gereklidir."),

  phone: z
    .string()
    .transform((val) => val)
    .pipe(
      z.string().refine((val) => validatePhoneNumber(val.replace(/\s+/g, "")), {
        message: "Geçerli bir tel no giriniz",
      })
    ),
  review: z
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
  nameConsent: z.literal<boolean>(true, {
    errorMap: () => ({
      message: "İsminizin görünmesine izin vermelisiniz",
    }),
  }),
});

export default function ReviewForm({ officeWorkerId, onClose }: Props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [rating, setRating] = useState(0);

  const [selectedOfficeWorkerId, setSelectedOfficeWorkerId] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);
  const [score6, setScore6] = useState(0);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setSelectedOfficeWorkerId(officeWorkerId);
    form.setValue("officeWorkerId", officeWorkerId.toString());
  }, [officeWorkerId, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { data: responseData } = await axios.post(
        "/api/forms/post-agent-review-form",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (responseData.message === "success") {
        toast.success("Yorumunuz başarıyla gönderildi");
        router.refresh();
        if (onClose) {
          onClose();
          console.log("Closing modal");
        }
      } else {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      }
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="container  ">
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
            <FormField
              control={form.control}
              name="nameConsent"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white">
                    <Checkbox checked={field.value} onChange={field.onChange}>
                      İsmimin görünmesine izin veriyorum.
                    </Checkbox>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      label="Yorumunuz"
                      variant="bordered"
                      placeholder="Lütfen Yorumunuzu yazınız."
                      disableAnimation
                      disableAutosize
                      classNames={{
                        base: "w-full mt-6 mb-6",
                        input: "resize-y min-h-[60px]",
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h2 className=" text-blue-950 text-lg font-bold">
            Danışmanınızı Yorumlayın
          </h2>
          <div>
            <div className="flex flex-row items-center justify-between border-b-1">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Düzenli Bilgilendirme
              </label>
              <StarRating
                onRatingChange={(value) => {
                  setScore1(value);
                  form.setValue("score1", value.toString());
                }}
              />
              <FormField
                control={form.control}
                name="score1"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Score1</FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="score1"
                        type="number"
                        {...field}
                        value={score1.toString()}
                        onChangeCapture={(e) => {
                          const value = parseInt(
                            (e.target as HTMLInputElement).value,
                            10
                          );
                          setScore1(value);
                          form.setValue("score1", value.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row items-center justify-between border-b-1">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 "
              >
                Hız
              </label>
              <StarRating
                onRatingChange={(value) => {
                  setScore2(value);
                  form.setValue("score2", value.toString());
                }}
              />
              <FormField
                control={form.control}
                name="score2"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Score2</FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="score2"
                        type="number"
                        {...field}
                        value={score2.toString()}
                        onChangeCapture={(e) => {
                          const value = parseInt(
                            (e.target as HTMLInputElement).value,
                            10
                          );
                          setScore2(value);
                          form.setValue("score2", value.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row items-center justify-between border-b-1">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 "
              >
                Profesyonel Deneyim
              </label>
              <StarRating
                onRatingChange={(value) => {
                  setScore3(value);
                  form.setValue("score3", value.toString());
                }}
              />
              <FormField
                control={form.control}
                name="score3"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Score5</FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="score3"
                        type="number"
                        {...field}
                        value={score3.toString()}
                        onChangeCapture={(e) => {
                          const value = parseInt(
                            (e.target as HTMLInputElement).value,
                            10
                          );
                          setScore3(value);
                          form.setValue("score3", value.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row items-center justify-between border-b-1">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 "
              >
                Sektör Bilgisi
              </label>
              <StarRating
                onRatingChange={(value) => {
                  setScore4(value);
                  form.setValue("score4", value.toString());
                }}
              />
              <FormField
                control={form.control}
                name="score5"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Score4</FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="score4"
                        type="number"
                        {...field}
                        value={score4.toString()}
                        onChangeCapture={(e) => {
                          const value = parseInt(
                            (e.target as HTMLInputElement).value,
                            10
                          );
                          setScore4(value);
                          form.setValue("score4", value.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row items-center justify-between border-b-1">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 "
              >
                Güvenilirlik
              </label>
              <StarRating
                onRatingChange={(value) => {
                  setScore5(value);
                  form.setValue("score5", value.toString());
                }}
              />
              <FormField
                control={form.control}
                name="score5"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Score5</FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="score5"
                        type="number"
                        {...field}
                        value={score5.toString()}
                        onChangeCapture={(e) => {
                          const value = parseInt(
                            (e.target as HTMLInputElement).value,
                            10
                          );
                          setScore5(value);
                          form.setValue("score5", value.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row items-center justify-between border-b-1">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 "
              >
                Diğer
              </label>
              <StarRating
                onRatingChange={(value) => {
                  setScore6(value);
                  form.setValue("score6", value.toString());
                }}
              />
              <FormField
                control={form.control}
                name="score6"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Score6</FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        placeholder="score6"
                        type="number"
                        {...field}
                        value={score6.toString()}
                        onChangeCapture={(e) => {
                          const value = parseInt(
                            (e.target as HTMLInputElement).value,
                            10
                          );
                          setScore6(value);
                          form.setValue("score6", value.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <input type="hidden" name="rating" value={rating} /> */}
            </div>
          </div>

          <FormField
            control={form.control}
            name="kvkkConsent"
            render={({ field }) => (
              <FormItem>
                <FormControl className="bg-white h-16" id="kvkkConsent">
                  <Checkbox
                    checked={field.value}
                    onChange={field.onChange}
                    className=" font-semibold text-blue-950 mt-8"
                  >
                    {" "}
                    <Link
                      onClick={() => {
                        window.open("/kvkk-ve-aydinlatma-metni", "_blank");
                      }}
                      href="/kvkk-ve-aydinlatma-metni"
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

          <FormField
            control={form.control}
            name="officeWorkerId"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Type</FormLabel>
                <FormControl className="bg-white">
                  <Input
                    placeholder="Type"
                    type="number"
                    {...field}
                    value={selectedOfficeWorkerId.toString()}
                    onChangeCapture={(e) =>
                      setSelectedOfficeWorkerId(
                        parseInt((e.target as HTMLInputElement).value, 10)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-8 mb-6 bg-blue-950 text-white font-bold text-md "
          >
            Yorumu Gönder
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";
import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { toast } from "react-toastify";
import axios from "axios";
import { z } from "zod";

export default function ContactForm({ officeId }: { officeId: string }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In development, use /api directly
      const API_URL =
        process.env.NODE_ENV === "development"
          ? "/api"
          : process.env.NEXT_PUBLIC_API_URL || "/emlak/api";

      // Create FormData object
      const formDataObj = new FormData();
      formDataObj.append("firstName", formData.firstName);
      formDataObj.append("lastName", formData.lastName);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("message", formData.message);
      formDataObj.append("officeId", officeId);

      const response = await axios.post(
        `${API_URL}/contact-requests/`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        setFormData({ firstName: "", lastName: "", phone: "", message: "" });
      }
    } catch (error) {
      toast.error(
        "Form gönderilemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h3 className="text-xl font-bold text-blue-950">İletişim Formu</h3>
      <Input
        label="Ad"
        value={formData.firstName}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, firstName: e.target.value }))
        }
        required
        isRequired
      />
      <Input
        label="Soyad"
        value={formData.lastName}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, lastName: e.target.value }))
        }
        required
        isRequired
      />
      <Input
        label="Telefon"
        type="tel"
        value={formData.phone}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, phone: e.target.value }))
        }
        required
        isRequired
        pattern="[0-9]{10}"
        placeholder="5XX XXX XX XX"
      />
      <Textarea
        label="Mesaj"
        value={formData.message}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, message: e.target.value }))
        }
        placeholder="Mesajınızı buraya yazın..."
      />
      <Button
        type="submit"
        isLoading={loading}
        className="w-full bg-blue-950 text-white py-2 rounded-xl 
        hover:bg-blue-900 hover:scale-[1.01] transition-all duration-300"
      >
        Gönder
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm font-bold">
          Form başarıyla gönderildi!
        </p>
      )}
    </form>
  );
}

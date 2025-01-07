"use client";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";

export default function ContactForm({ officeId }: { officeId: string }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, officeId }),
      });

      if (!response.ok) throw new Error("Gönderim başarısız");

      setSuccess(true);
      setFormData({ firstName: "", lastName: "", phone: "" });
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
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
      <Button
        type="submit"
        isLoading={loading}
        className="w-full bg-blue-950 text-white font-bold"
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

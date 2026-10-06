"use client";

type SharePlatform = "facebook" | "twitter" | "linkedin" | "whatsapp";

const shareUrls: Record<SharePlatform, (url: string) => string> = {
  facebook: (url) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  twitter: (url) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  linkedin: (url) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  whatsapp: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`,
};

const platformLabels: Record<SharePlatform, string> = {
  facebook: "Facebook",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
};

export default function ShareLinks({
  url,
  platforms,
}: {
  url: string;
  platforms: SharePlatform[];
}) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {platforms.map((platform) => (
        <a
          key={platform}
          href={shareUrls[platform](url)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-blue-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-900"
        >
          {platformLabels[platform]}
        </a>
      ))}
    </div>
  );
}

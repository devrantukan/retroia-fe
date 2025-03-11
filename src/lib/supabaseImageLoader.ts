const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // your supabase project id

export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) {
  // If it's already a full URL, return it with width and quality params
  if (src.startsWith("http")) {
    return `${src}?width=${width}&quality=${quality || 75}`;
  }

  // If it's a local path starting with '/', serve from public directory
  if (src.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${src}`;
  }

  // Otherwise, treat it as a Supabase storage path
  return `https://${supabaseUrl}/storage/v1/render/image/public/${src}?width=${width}&quality=${
    quality || 75
  }`;
}

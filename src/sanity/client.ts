import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";



export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET_NAME,
  apiVersion: "2024-01-01",
  useCdn: true,
  token:process.env.NEXT_PUBLIC_SANITY_API_TOKEN
});
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
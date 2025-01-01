import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
const BLOGS_QUERY = `*[
  _type == "blog"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id,slug, title, category, description, image}`;

const options = { next: { revalidate: 30 } };


export default async function Home() {
  const blogs = await client.fetch<SanityDocument[]>(BLOGS_QUERY, {}, options);
  return (
    <div>
      <h1 className="py-3 font-bold text-xl sm:text-3xl text-center">Explore Blogs</h1>
      <SearchBar />
      <div className="flex flex-wrap gap-x-2 gap-y-3 max-sm:px-4 sm:px-16 py-6">
        {
          blogs?.map((blog)=>{
            return <BlogCard key={blog._id} id={blog._id} imageURL={blog.image.asset._ref} slug={blog.slug.current} title={blog.title} category={blog.category} description={blog.description}/>
          })
        }
      </div>
    </div>
  );
}

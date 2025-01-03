import CommentInput from '@/components/CommentInput'
import Comments from '@/components/Comments'
import { client, urlFor } from '@/sanity/client';
import { PortableText, type SanityDocument } from "next-sanity";
import Image from 'next/image'
import React from 'react'
const BLOG_QUERY = `*[_type == "blog" && _id == $id][0]`;
const COMMENT_QUERY = `*[_type == "comment" && blogId == $blogId]|order(publishedAt desc)`
const options = { next: { revalidate: 1 } };
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short', // Optional, for full weekday (e.g., 'Monday')
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // 12-hour clock
    }).format(date);
};

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function Blog({ params }: PageProps) {
    const { id } = await params
    const blog = await client.fetch<SanityDocument>(BLOG_QUERY, { id: id });
    const comments = await client.fetch<SanityDocument[]>(COMMENT_QUERY, { blogId: id }, options);
    return (
        <div className='py-4'>
            <p className='text-center font-bold py-1 text-sm capitalize'>{blog?.category}</p>
            <h2 className='text-3xl font-semibold text-center py-1'>{blog?.title}</h2>
            <p className='text-center text-sm py-1'>{blog?._createdAt ? formatDate(blog._createdAt) : ""}</p>
            <div className='px-4'>
                <Image priority src={blog?.image?.asset?._ref ? urlFor(blog.image.asset._ref).url() : "/default-image.jpg"} width={800} height={800} className='rounded-3xl mx-auto py-4' alt='' />
            </div>
            <div className='px-4 w-full md:w-[75%] mx-auto'>
                {Array.isArray(blog?.description) && (
                    <PortableText
                        value={blog?.description}
                        components={{
                            block: {
                                normal: ({ children }) => (
                                    <p className="py-1">{children}</p>
                                ),
                            },
                        }}
                    />
                )}
            </div>
            <CommentInput blogId={blog ? blog._id : ""} />
            <Comments comments={comments ? comments : []} />
        </div>
    )
}
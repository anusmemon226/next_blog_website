"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PortableTextBlock } from '@portabletext/types';
import { urlFor } from '../sanity/client';

function BlogCard({ id, slug, imageURL, title, category, description }: { id: string, slug: string, imageURL: string, title: string, category: string, description: PortableTextBlock }) {
  const paragraphBlocks = Array.isArray(description)
    ? description.filter((block) => block._type === 'block' && block.style === 'normal' && !block.listItem).slice(0, 100)
    : [];
  return (
    <Link href={`/${id}`} className='w-full sm:w-[49%] lg:w-[32.5%]'>
      <Image priority src={urlFor(imageURL).url()} style={{ height: 300, objectFit: "cover" }} width={1000} height={100} className='rounded-3xl' alt='' />
      <div className='flex flex-col gap-y-1 py-4'>
        <p className='font-bold text-sm capitalize'>{category}</p>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <p>{paragraphBlocks[0].children[0].text}...<span className='font-bold'>Read More</span></p>
      </div>
    </Link>
  )
}

export default BlogCard
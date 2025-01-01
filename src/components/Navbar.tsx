import React from 'react'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'

function Navbar() {
    return (
        <div className='flex justify-between max-sm:px-4 sm:px-16 py-2 bg-gray-200'>
            <div>
                <h1 className='font-bold text-xl uppercase text-gray-800'><Link href={"/"}>Blogger</Link></h1>
            </div>
            <div className='flex max-sm:hidden gap-x-4 items-center'>
                <Facebook color='#1f2937' size={20} />
                <Twitter color='#1f2937' size={20} />
                <Instagram color='#1f2937' size={20} />
            </div>
        </div>
    )
}

export default Navbar
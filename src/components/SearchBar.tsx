import React from 'react'
import { Search, ChevronsUpDown } from 'lucide-react'

function SearchBar() {
    return (
        <div className='flex flex-wrap max-sm:flex-col items-center justify-between p-2 bg-gray-200 border max-md:mx-4 md:w-[50%] mx-auto relative'>
            <input type="text" placeholder='Search by title' className='flex-1 max-sm:w-full p-[8px] outline-none min-w-[120px]' /> 
            <div className='flex flex-1 max-sm:w-full justify-between bg-white items-center p-[8px] relative min-w-[130px]'>
                <select name="category" id="" className='w-full appearance-none outline-none'>
                    <option value="all">All Categories</option>
                    <option value="health">Health</option>
                    <option value="entertainment">Entertainment</option>
                </select>
                <ChevronsUpDown className='absolute right-0 pointer-events-none' />
            </div>
            <button className='p-[8px] bg-white max-sm:w-full'><Search className='mx-auto'/></button>
        </div>
    )
}

export default SearchBar
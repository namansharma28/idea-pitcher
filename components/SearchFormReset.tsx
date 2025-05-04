"use client"
import { X } from 'lucide-react';
import React from 'react'
import Link from 'next/link';

const SearchFormReset = ({ query }: { query?: string }) => {

    const reset = () => {
        const form = document.querySelector(".search-form") as HTMLFormElement;
        if (form) {
            form.reset();
        }
        query = undefined;
    }

  return (
    <button type="reset" onClick={reset} className="search-btn">
        <Link href="/" className='search-link'>
        <X className='size-5 cross-logo' />
        </Link>
    </button>

  )
}

export default SearchFormReset
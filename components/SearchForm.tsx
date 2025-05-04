import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Search, SearchIcon } from 'lucide-react'

const SearchForm = ({ query }: { query?: string }) => {

  return (
    <Form action="/" scroll={false} className="search-form">
        <input
            name="query"
            defaultValue=""
            className="search-input"
            placeholder='Search for startups, ideas, or pitches...'
        />

        <div className='flex gap-2'>
            {query &&  <SearchFormReset query={query}/>}
            <button type="submit" className="search-btn">
                <span className='text-sm'>
                    <Search className='size-5' />
                    </span></button>
            
        </div>

    </Form>
  )
}

export default SearchForm
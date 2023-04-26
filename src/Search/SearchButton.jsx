import React from 'react'
import './SearchPage.css'
const SearchButton = ({totalresult,onabClick,setQuery,query}) => {
    return (
        <>
            <div className='searchpahge'>
            <h2 className='heading'>Search Anime Charectars</h2>
            <div>
                <input type="search" value={query}placeholder='Please Search... ' name="data"  onChange={event => setQuery(event.target.value.trim())} />
                <button className='searchdata' onClick={()=>onabClick(query)}>Search</button>
            </div>
            <h5 className='heading'>Total Count is : {totalresult} matching online characture found</h5>
            </div>
        </>
    )
}

export default SearchButton
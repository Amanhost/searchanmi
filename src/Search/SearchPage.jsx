import React, { useEffect, useState } from 'react'
import './SearchPage.css'
import { FcLike } from "react-icons/fc"; // react Icons
import { FcRight } from "react-icons/fc";
import SearchButton from './SearchButton';

const SearchPage = () => {
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState("");//debouncing search state
  const [debouncSearch, setDebouncSearch] = useState("");
  const [totalresult, setTotalresult] = useState(1);
  const [query, setQuery] = useState("");



  const getData = async (searchedValue) => {
    const response = await fetch(`https://api.jikan.moe/v4/characters?page=1&limit=15&q=${searchedValue}&order_by=favorites&sort=desc`)
    const res = await response.json();
    setListData(res?.data);
    setTotalresult(res.pagination.items.total)
  }

  useEffect(() => {
    if (!query) {
      getData(query)
    }
  }, [query])



  // ~~~~~~~~~~~~~~~~~~~~~~~~~~Filtering Data form debouncing concepts~~~~~~~~~~~~~~~~
  useEffect(() => {
    const debouncing = setTimeout(() => {
      setDebouncSearch(search)
    }, 100); //it will take 1 micro second in every Type please wait for resulting data
    return () => clearTimeout(debouncing)

  }, [search])
  // let count=resultdata.length


  return (
    <>
      <div className="main_div">
        <SearchButton totalresult={totalresult}  setQuery={setQuery} onabClick={getData}
        query={query} />


        <hr className='horizontalRow' />

        <div className="maindiv">
          <div>
            {totalresult == 0 ? <h2>No results Found ..!!</h2> : (<ul>
              {listData?.filter((item, index) => item.name?.toLowerCase().includes(debouncSearch?.toLowerCase()) ||
                item.nicknames.map((A) => A?.toLowerCase().includes(debouncSearch?.toLowerCase()))
              ).map((value, index) => {
                return (
                  <li key={index} className='userList' >
                    <div className='detailContainer' >
                      <div>
                        <img src={value.images.jpg.image_url} alt="image" />
                      </div>

                      <div>
                        <h3 className='name' >{value.name}</h3>
                        <div className='nickNameContainer'>
                          {value.nicknames?.map((name) => <span className='nickName' >{name}</span>)}
                        </div>
                      </div>

                    </div>

                    <div className='numberContainer'>

                      <div className='lineItem '>
                        <div> <FcLike /> {value.mal_id}</div>
                      </div>
                      <div >
                        <a target='_blank' href={value.url} className='verticalrow ' onClick={() => console.log(value, "asdfg")} >
                          <h3><FcRight size={50} /></h3>
                        </a>
                      </div>
                    </div>

                  </li>
                )
              })}
            </ul>)}
          </div>
        </div>

      </div>

    </>
  )
}

export default SearchPage
import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSearchBookQuery } from '../features/Books/bookApi';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
// import {searchIncreaseCount, searchDecreaseCount, searchResetCount} from '../features/Books/searchPageCounter';

function BookForm() {

    // const {currentPage} = useSelector(state => state.searchBookContext)
    // const dispatch = useDispatch();

    const [book, setBook] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [skip, setSkip] = useState(true);

    const {data, isLoading, isFetching, error, isError} = useSearchBookQuery({book, searchPage}, {skip: skip});
    const [showSearch, setShowSearch] = useState(false);

    const searchBook = (e) =>{
        // search book code here
        e.preventDefault();
        if(book){
            setSkip(false);
            setShowSearch(true);
        }

    }

    const clearResultBox = ()=>{
        setShowSearch(false);
        setBook('');
        setSearchPage(1);
    }

    useEffect(()=>{


        if(book.length == null || book.length === 0){
          setShowSearch(false);
          setSearchPage(1);
        //   dispatch(searchResetCount());
        }

        if(error){
            toast.error(error)
        }

    },[book])


  return (
   <div className='form-container'>
        <form id='search-form' onSubmit={searchBook}>
            <input type="text" placeholder='Enter bookname here' name='bookname'
             value={book}
             onChange={(e)=>{setBook(e.target.value); setSkip(true)}}/>
            <button className='btn-submit' type="submit">Search</button>
        </form>
        {error &&
           <div>Error...</div>
        }
         {isError && 
           <div>Error...</div>
        }
        {isFetching && (<div className="loader">Loading...</div>)}
        {(data && showSearch) &&
             (<div className='search-box'> 
                <div className="search-result-info-box">
                    <div className="search-result-message">
                    {(data.count === 0) ? 
                        <div> <p className='search-result-info-text'>NO RESULTS FOUND</p> </div>
                        :
                        <p className='search-result-info-text'>{data.count} RESULTS FOUND</p>
                    }
                        
                    </div>
                    <div className="search-result-nox-action">
                        <button onClick={clearResultBox} className='close-form-result-box'>X</button>
                    </div>
                </div>
                
               
                 {
                (data.results.length >0) ?
                    (<div className='search-result-box'>
                    {
                       data.results.map((book)=>{
                            return(
                                <div className='book-item'>
                                    <Link className='book-link' to={`bookdetail/${book.id}`} key={book.id}>
                                        <p className='book-box'> <span className="id-box">{book.id}</span>  {book.title.substring(0, 50)}</p>
                                        {book.authors[0] ?
                                            <p className='author-box'> {book.authors[0].name}</p>
                                            :
                                            ''
                                        }                
                                    </Link>
                                </div>
                                
                            ) 
                        }) 
                    }
                </div>)
                :
                ''
                 }  
                 {
                     data.next &&
                     <div className='nav-btn-box'>
                     {data.previous ?
                      <button className="prev" onClick={()=>{ setSearchPage(searchPage-1) }}><FaAngleLeft/>Prev</button>
                      :
                      <button className="prev" disabled><FaAngleLeft/>Prev</button>
                      }
                      <span className='pagenumber-display'>
                          {searchPage}
                      </span>
                      {data.next ?
                      <button className="next" onClick={()=>{ setSearchPage(searchPage+1) }}>Next<FaAngleRight/></button>
                      :
                      <button className="next" disabled>Next<FaAngleRight/></button>
                      }
                   
                  </div>
                 }
            </div>)
        }
       
        
   </div>
  )
}

export default BookForm
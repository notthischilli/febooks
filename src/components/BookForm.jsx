import React, {useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSearchBookQuery } from '../features/Books/bookApi';
// import {setSearchTerm, searchIncreaseCount, searchDecreaseCount, searchResetCount} from '../features/Books/searchPageCounter';

function BookForm() {

    // const {currentSearchPage, searchTerm} = useSelector(state => state.searchPageCounter)
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
            // dispatch(setSearchTerm(book));
            setSkip(false);
            setShowSearch(true);
        }
        
    }

    const clearResultBox = ()=>{
        // dispatch(searchResetCount())
        setShowSearch(false);
        setBook('');
    }

    useEffect(()=>{
        if(book.length == null || book.length === 0){
          setShowSearch(false);
        //   dispatch(searchResetCount());
        }
       
    },[book,])


  return (
   <div className='form-container'>
        <form id='search-form' onSubmit={searchBook}>
            <input type="text" placeholder='Enter bookname here' name='bookname'
             value={book}
             onChange={(e)=>{setBook(e.target.value); setSkip(true)}}/>
            <button className='btn-submit' type="submit">Search</button>
        </form>
        {error && 
            ( <div>error...</div> )
        }
         {isError && 
            ( <div>isError...</div> )
        }
        {isFetching && (<div className="loader">Loading...</div>)}
        {(data && showSearch) &&
             (<div className='search-result-box'> 
                <button onClick={clearResultBox} className='close-form-result-box'>X</button>
                 {(data.count === 0) && <div>No result found </div>}
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
                 })}  
                 {
                     data.next &&
                     <div className='nav-btn-box'>
                     {data.previous ?
                      <button className="prev" onClick={()=>{ setSearchPage(searchPage-1) }}>Prev</button>
                      :
                      <button className="prev" disabled>Prev</button>
                      }
                      <span className='pagenumber-display'>
                          {searchPage}
                      </span>
                      {data.next ?
                      <button className="next" onClick={()=>{ setSearchPage(searchPage+1)}}>Next</button>
                      :
                      <button className="next" disabled>Next</button>
                      }
                   
                  </div>
                 }
            </div>)
        }
       
        
   </div>
  )
}

export default BookForm
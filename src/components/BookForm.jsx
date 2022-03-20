import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSearchBookQuery } from '../features/Books/bookApi';

function BookForm() {

    const [book, setBook] = useState('');
    const [skip, setSkip] = useState(true)
    const {data, isLoading, isFetching, error, isError} = useSearchBookQuery(book, {skip: skip});
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
    }

    useEffect(()=>{
        if(book.length == null || book.length === 0){
          setShowSearch(false);
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
                 {(data.count > 500) ? <div>Try to be more specific</div>:
                 data.results.map((book)=>{
                     return(
                        <Link className='book-link' to={`bookdetail/${book.id}`} key={book.id}>
                            <p className='book-box'> <span className="id-box">{book.id}</span>  {book.title.substring(0, 50)}</p>
                            {book.authors[0] ?
                                <p className='author-box'> {book.authors[0].name}</p>
                                :
                                ''
                            }                
                        </Link>
                     ) 
                 })}  
            </div>)
        }
       
        
   </div>
  )
}

export default BookForm
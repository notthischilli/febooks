import React, { useEffect, useState } from 'react'
import { useGetAllBooksQuery } from '../features/Books/bookApi';
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { decreaseCount, increaseCount } from '../features/Books/pageCounter';

function Books() {
    
    const {currentPage} = useSelector(state => state.pageCounter);

    const dispatch = useDispatch();

    const [page, setPage] = useState(currentPage);
    const {data, error, isLoading, isFetching} = useGetAllBooksQuery(page);


    useEffect(()=>{
        setPage(currentPage);
    },[currentPage])

    if(isLoading){
        return <div className="loader">Loading...</div>
    }
    return (
        <div className='book-container'>
            {error && <div>error ...</div>}
        
            <div className="books-list">
                  {isFetching && <div className="loader">Loading...</div>}
                {data.results.map((book)=>{

                return (
                    <div className="book-item">
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

            }) }
            </div>
            
            
            <div className='nav-btn-box'>
               {data.previous ?
                <button className="prev" onClick={()=>{dispatch(decreaseCount())}}>Prev</button>
                :
                <button className="prev" disabled>Prev</button>
                }
                <span className='pagenumber-display'>
                    {currentPage}
                </span>
                {data.next ?
                <button className="next" onClick={()=>{dispatch(increaseCount())}}>Next</button>
                :
                <button className="next" disabled>Next</button>
                }
             
            </div>
            
        </div>
        
    )
}

export default Books
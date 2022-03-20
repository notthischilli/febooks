import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { useGetBookDetailQuery } from '../features/Books/bookApi';

function BookDetail() {
    let params = useParams();
    let [bookid, setBookid] = useState(params.bookid);
    const {data, isLoading, error} = useGetBookDetailQuery(bookid);
    
    if(isLoading){
        return <div className="loader">Loading...</div>
    }

    return (
        <div className='book-container bookdetailmargin'> 
        <Link className='nav-home' to='/'>Go back</Link>

        <div className="bookdetail-box">
            {error && <div>Error ...</div>}

            <div className="bookdetail-top-box">
                <div className="bookdetail-img">
                    {data.formats["image/jpeg"] ?
                     <img className='img-box' src={data.formats["image/jpeg"]} alt="img" height={300} width="200"/>
                     : 
                     ''
                    }
                </div>
                <div className="bookdetail-info">
                    <p className="book-box">{data.title}</p>
                    {data.authors[0] ?
                        <p className='author-box'> {data.authors[0].name}</p>
                        :
                        ''
                    }  
                    {data.languages[0] ?
                        <p className='author-box'>Language: {data.languages[0]}</p>
                        :
                        ''
                    }  
                    {data.subjects?
                        <div className='tag-box'>
                            Tags: 
                            { data.subjects.map(tag=>{
                                return  <p className='author-box'>{tag}</p>
                            })}
                        </div>
                      
                       
                        :
                        ''
                    }  
                </div>
            </div>
            <div className="bookdetail-bottom-box">
                    <div className='bookdetail-links'>
                        <ul> 
                            {data.formats["application/zip"] &&
                            <li>
                                <a href={data.formats["application/zip"]}>  Download ZIP file</a>
                            </li>
                            }
                            <li>
                                <a href={data.formats["text/html"]} target="_blank">  Read in Browser. ver 1, html</a>
                            </li>
                            {  data.formats["text/plain; charset=us-ascii"] &&
                                <li>
                            
                                <a href={data.formats["text/plain; charset=us-ascii"]} target="_blank">  Read in Browser. ver 2, text</a>
                                </li>
                            }
                            {  data.formats["text/plain"] &&
                                <li>
                            
                                <a href={data.formats["text/plain"]} target="_blank">  Read in Browser. Alt, text</a>
                                </li>
                            }
                           
                        
                        </ul>
                        
                    
                    </div>
            </div>

           
        </div>
        
        </div>
        
    )
}

export default BookDetail
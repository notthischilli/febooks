import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookForm from '../components/BookForm';
import { useGetBookDetailQuery } from '../features/Books/bookApi';
import { FaAngleLeft,  } from 'react-icons/fa';

function BookDetail() {
    let params = useParams();
    let [bookid, setBookid] = useState(params.bookid);
    const {data, isLoading, error} = useGetBookDetailQuery(bookid);
    
    if(isLoading){
        return <div className="loader">Loading...</div>
    }
    if(error){
        toast.error(error);
        return <div>Error...</div>
    }

    return (
        <div className='bookdetail-container'> 
        <Link className='nav-home' to='/'>
            <div className='nav-home-box'>
                 <FaAngleLeft /> <span className='nav-home-text'>Go back</span> 
            </div>
        </Link>

        <div className="bookdetail-box">
            {error && toast(error)}

            <div className="bookdetail-top-box">
                <div className="bookdetail-img">
                    {data.formats["image/jpeg"] ?
                     <img className='img-box' src={data.formats["image/jpeg"]} alt="img" height={300} width="200"/>
                     : 
                     ''
                    }
                </div>
                <div className="bookdetail-info">
                    <p className="book-box"> <span style={{fontWeight:'bold'}}>{data.title}</span> </p>
                    {data.authors[0] ?
                        <p className='author-box'><span style={{fontWeight:'bold'}}>Author:</span> {data.authors[0].name}</p>
                        :
                        ''
                    }  
                    {data.languages[0] ?
                        <p className='author-box'><span style={{fontWeight:'bold'}}>Language:</span> {data.languages[0]}</p>
                        :
                        ''
                    }  
                    {data.subjects?
                        <div className='tag-box'>
                            <span style={{fontWeight:'bold'}}>Tags:</span> 
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
                        <ul className='bookdetail-link-style'> 
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
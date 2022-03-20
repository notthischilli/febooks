import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://gutendex.com/'}),
    endpoints: (builder)=>({
        getAllBooks: builder.query({
            query: (page) => `books/${page ? `?page=${page}` : ''}`,
        }),
        getBookDetail: builder.query({
            query: (bookid)=>`books/${bookid}`
        }),
        searchBook: builder.query({
            query: ({book, searchPage})=> `books/?page=${searchPage}&search=${book}`,
        }),
    }),
})

// Export hooks for usuage 
export const {useGetAllBooksQuery, useSearchBookQuery, useGetBookDetailQuery} = bookApi;
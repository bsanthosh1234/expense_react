import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseURI = "http://192.168.1.11:3006"

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
    endpoints: builder => ({
        //get catagories
        getCategories: builder.query({
            query: () => '/category',
            providesTags:['categories']
        }),
        //get labels
        getlabels: builder.query({
            query: () => '/labels',
            providesTags: ['transactions']
        }),
        addTransaction: builder.mutation({
            query: (initalTransaction) => ({
                
                    url: '/transaction',
                    method: "POST",
                    body: initalTransaction
                }),
                invalidatesTags: ['transactions'],
                providesTags: ['transactions']
              
    }),
    deleteTransaction: builder.mutation({
            query : recordid => ({
                // url: '/deltransaction',
                url:'/transaction',
                method: "DELETE",
                body: recordid
            }),
            invalidatesTags: ['transactions'],
           
        })
       
    })
})


export default apiSlice;
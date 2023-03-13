import React from 'react'
import 'boxicons';
import { default as api } from '../store/apiSlice'
import { useEffect } from 'react';
import Cookies from 'universal-cookie';



export default function List() {

    let cookie = new Cookies();
    let uname = cookie.get("username")
    

    const { data, isFetching, isSuccess, isError } = (api.useGetlabelsQuery())
    const [deleteTransaction] = api.useDeleteTransactionMutation()
    let transactions;
    let userdata = [];
    // useEffect(()=>console.log("clicked"),[deleteTransaction])

    useEffect(() => {
        //Runs on every render
    }, []);

    const handleclick = async (e) => {

        // console.log(e.target.dataset.id)
        if (!e.target.dataset.id) return 0
        await deleteTransaction({ _id: e.target.dataset.id })


    }
    if (isFetching) {
        transactions = <div>Fetching</div>
    }
    else if (isSuccess) {

        for (var i in data) {
            if (data[i].user === uname) {
                userdata.push(data[i])
            }
        }

        let arr = userdata
        arr = arr.slice(-4)
        //console.log("lijbkjkjbst",arr)
        transactions = arr.map((v, i) => <Transaction key={i} category={v} handler={handleclick}></Transaction>)
    } else if (isError) {
        transactions = <div>ERROR</div>
    }


    return (
        // <div className='flex felx-col py-6 gap-3'>
        //  <h1 className='py-4 text-xl font-bold'>History</h1>
        //  {obj.map((v,i) => <Transaction key={i} category={v}></Transaction>)}

        // </div>
        <div className="flex flex-col py-6 gap-3">
            <h1 className='py-4 font-bold text-xl'>Recent Transactions</h1>
            {transactions}
        </div>
    )
}


function Transaction({ category, handler }) {
    if (!category) return null;
    return (
        <div className='item flex jutify-center bg-gray-50 py-2.5 rounded-r  ' style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}>
            <button className='px-3' onClick={handler}><box-icon data-id={category._id ?? " "} size="15px" color={category.color ?? "#e5e5e5"} name="trash"></box-icon></button>
            <span className='block ml-auto mr-auto'>{category.name ?? ""}</span><span className='block ml-auto mr-auto '>{category.date}</span><span className='block ml-auto mr-auto'>₹&nbsp;{category.amount}</span>

        </div>
    )
}


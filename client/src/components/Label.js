import React from 'react'
import {default as api } from '../store/apiSlice'
//import { getSum } from '../helper/helper'
import { getLabels } from '../helper/helper'
import Cookies from 'universal-cookie';


export default function Labels() {
    
   // console.log(api.useGetlabelsQuery())

    const {data,isFetching,isSuccess,isError}=(api.useGetlabelsQuery())

    let transactions;
    let userdata=[];
    let cookie = new Cookies();
    let uname=cookie.get("username")
    
   
    if(isFetching)
    {
        transactions=<div>Fetching</div>
    }
    else if(isSuccess)
    {
        for(var i in data)
        {
          if(data[i].user === uname)
          {
            userdata.push(data[i])
          }
        }
        
        
        transactions= getLabels(userdata,'type').map((v,i)=><Labelcomponent key={i} userdata={v}></Labelcomponent>)
    }else if(isError)
    {
        transactions=<div>ERROR</div>
    }
     
    
    return(
        <>
       
        {
          transactions  
        }
        

        </>

    )
}
function Labelcomponent({userdata})
{
    if(!userdata)
    {
        return <></>
    }
    return(
        // style={{background: data.color ?? '#f9c74f'}}
        <div className='labels flex justify-between'>

            <div className='flex gap-2'>
                <div  style={{background: userdata.color ?? '#f9c74f'}} className='w-1 h-1 rounded py-2.5   '></div>
                <h5 className='text-md'>{userdata.type ?? ""}</h5>

            </div>
            <div id='percent'>
                <h5  className='font-bold'>{Math.round(userdata.percent) ?? 0}%</h5>
            </div>
            
        </div>
    )
}
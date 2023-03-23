import React from 'react'
import { useForm } from 'react-hook-form'
import { default as api } from '../store/apiSlice'
import { useState } from 'react';
import Papa from 'papaparse';
import { useRef } from 'react';// a CSV parsing library
import Cookies from "universal-cookie";


export default function Form({ flag, setFlag }) {
  const aRef = useRef(null);

  let cookie = new Cookies();
  let uname = cookie.get("username")
  //console.log("uname",uname)

  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {

    if (!data) return {};
    data.user = uname;

    console.log("before sending", data)

    await addTransaction(data).unwrap()
    resetField('name')
    resetField('amount')
    resetField('date')

  }


  const [data, setData] = useState([]);


  function uploadToBackend() {

    // console.log("posted data", data)
  alert("MC")


    fetch('http://192.168.1.11:3006/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        // console.log("inres");
        return response.json()

      })
      .then(res => {
        console.log("res", res);
        res.map(async ele => {
          ele.user = uname
          console.log("before adding csv to backend", ele);

          await addTransaction(ele).unwrap()
        })
      })
      .catch(error => console.error(error));



    aRef.current.value = null;


  }



  function handleFileUpload(event) {

    const file = event.target.files[0];

    if (file.type !== "text/csv") {
      alert("Please select a CSV file.");
      return;
    }

    Papa.parse(file, {
      header: true, // if your CSV has a header row
      complete: (results) => {
        setData(results.data);
      }
    });

  }



  return (
    <div className='form max-w-sm mx-auto w-96'>
      <h1 className='font-bold pb-4 text-xl'>Transaction</h1>
      <form id='form' action='' method='' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <div className='input-group mb-3'>
            <input type="date" {...register('date')} placeholder='date' className='form-input' name="date" required />
          </div>

        </div>

        <div className='input-group mb-3 '>
          <input type="text" {...register('name')} placeholder='salary,house,rent' className='form-input' name="name" required />
        </div>
        <select {...register('category')} className='form-input mb-3' name='category'>
          <option value="others" >others</option>
          <option value="transportation" >transportation</option>
          <option value="food" defaultValue>food</option>
          <option value="entertainment" >entertainment</option>
          <option value="income" >income</option>
          <option value="expenditure" >income</option>





        </select>
        <select {...register('type')} className='form-input mb-3' name='type'>
          {/* <option value="Investment" defaultValue>Investment</option> */}
          <option value="expense" defaultValue>Expense</option>
          <option value="savings" >savings</option>
        </select>
        <div  {...register('amount')} className='input-group mb-3' >
          <input type="number" placeholder='Amount' className='form-input' name='amount' required />
        </div>
        <div className="submit-btn mb-3">
          <button type='submit' className='border rounded  py-2 text-white bg-pink-400 w-full'>Add Transaction</button>
        </div>

      </form>



      <div>
        <br />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload file</label>
        <br />
        <input accept=".csv" ref={aRef} onChange={handleFileUpload} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 py-2" id="file_input" type="file" />
        {/* <input  required type="file" onChange={handleFileUpload} /> */}
        <br />
        <button className='border py-2 text-white bg-indigo-500 w-full rounded' onClick={uploadToBackend}>Add File</button>
      </div>


    </div>
  )
}

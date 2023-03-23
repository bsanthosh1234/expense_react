import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';

const Table = () => {

  const [data1, SetData] = useState([]);
  //const [data, set2] = useState([])
  useEffect(() => {
    axios.get('http://192.168.1.11:3006/labels')
      .then(
        response => {
          let data2 = []
          for (let i = 0; i < response.data.length; i++) {
            //console.log(data1[i]);
            let temp = {}
            temp.id = i;
            temp.date = response.data[i].date;
            temp.name = response.data[i].name;
            temp.type = response.data[i].type
            temp.amount = response.data[i].amount
            data2.push(temp)
          };
          SetData(data2)
        }

      )

  }, [])

  // useEffect(()=>
  // {

  // },[data1])

  // const data = [
  //   { id: 1, name: 'John', age: 25, city: 'New York' },
  //   { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
  //   { id: 3, name: 'Bob', age: 35, city: 'Chicago' },
  //   { id: 4, name: 'John', age: 25, city: 'New York' },
  //   { id: 5, name: 'Jane', age: 30, city: 'Los Angeles' },
  //   { id: 6, name: 'Bob', age: 35, city: 'Chicago' },
  //   { id: 7, name: 'John', age: 25, city: 'New York' },
  //   { id: 8, name: 'Jane', age: 30, city: 'Los Angeles' },
  //   { id: 9, name: 'Bob', age: 35, city: 'Chicago' },
  //   { id: 10, name: 'John', age: 25, city: 'New York' },
  //   { id: 11, name: 'Jane', age: 30, city: 'Los Angeles' }

  // ]
  //console.log(data[0].id)

  //console.log("filterd data",data2)

  // console.log(data2, "data2")

  const [newData, setNewData] = useState(false)
 
  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'type', selector: row => row.type, sortable: true },
    { name: 'date', selector: row => row.date, sortable: true },
    { name: 'amount', selector: row => row.amount, sortable: true },

  ]
  useEffect(() => {

    setNewData(data1)
  }, [data1])


  function handleFilter(event) {
 

    let temp = data1.filter((row) => {

      return Object.values(row).some((value) => {
        if (isNaN(value)) return value.toLowerCase().includes(event.target.value.toLowerCase())
        else {
          return (value + "").toLowerCase().includes(event.target.value.toLowerCase())
        }
      }
      );
    })
    setNewData(temp);



  }
  useEffect(() => {

  }, [newData])

  return (
    <div>
      <br />
      <br />
      <div className=' text-end'>
        <input className="form-control me-2 w-40 float-right m-auto" type="search" placeholder="Search " aria-label="Search" onChange={handleFilter} />
        <br />
        <br />
      </div>
      {newData ?
        <DataTable
          columns={columns}
          data={newData}
          fixedHeader
          selectableRows
          pagination>
        </DataTable> : <></>}

    </div>

  )
}
export default Table
import React from 'react';
import 'boxicons';
import '../Table.css'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"

import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "datatables.net/1.13.3/js/jquery.dataTables.min.js"
// import DataTable from 'datatables.net-dt';
import $ from 'jquery';
//For API Requests
import axios from 'axios';
import Cookies from 'universal-cookie';
// import { useState,useEffect } from 'react';


class Tabels extends React.Component {
  // State array variable to save and show data
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      
    }
  }




  // handleclick = async (e) => {

  //   console.log(e.target.dataset.id)
  //   axios.post("http://192.168.1.11:3006/deltransaction", { id: e.target.dataset.id }, {
  //     headers: {
  //       "Content-type": "application/json"
  //     }
  //   })
  //   console.log("posted")
  // }


  async componentDidMount() {
    // console.log("component did mounted")
    //Get all users details 
    await axios.get('http://192.168.1.11:3006/labels').then(res => {
      let userdata=[]
      let cookie = new Cookies();
      let uname=cookie.get("username")
      for(var i in res.data )
      {
        if(res.data[i].user===uname)
        {
          userdata.push(res.data[i])
        }
      }
      
      //Storing users detail in state array object
      this.setState({ data: userdata });

    });



    //initialize datatable


    $(document).ready(function () {
      setTimeout(function () {
        var table = $('#example').DataTable();

        table.destroy();

        $('#example').DataTable(
          {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            dom: 'Bfrtip',
            buttons: ['copy', 'csv', 'print'
            ],

          }
        );
      },10
      );
    });
  }

 


  render() {

    //Datatable HTML
    return (

      <div className="MainDiv">
        {/* {console.log("rendered")} */}




        <div className="container p-5">
          <br />
          <br />

          <table id="example" className="table table-hover table-bordered">

            <thead>
              <br />
              <tr style={{ backgroundColor: '#64b1df' }}>
                {/* <th style={{visibility:"hidden"}}>ID</th> */}
                <th>name</th>
                <th>type</th>
                <th>amount</th>
                <th>date</th>
                {/* <th>Action</th> */}



              </tr>
            </thead>
            <tbody>
              {this.state.data.map((result) => {
                return (

                  <tr>

                  
                    <td>{result.name}</td>
                    {
                      
                    }
                    <td >{result.type}</td>
                    <td style={{color:result.color}}>{result.amount}</td>
                    <td>{result.date}</td>
                    {/* <td><button className='px-3' onClick={this.handleclick}><box-icon data-id={result._id ?? " "} size="15px" color={result.color ?? "#e5e5e5"} name="trash"></box-icon></button></td> */}



                  </tr>



                )

              }

              )}
            </tbody>


          </table>

        </div>
      </div>
    );
  }
}
export default Tabels;

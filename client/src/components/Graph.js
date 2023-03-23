import React, { useEffect } from 'react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
// import Labels from './Labels';
import Labels from './Label';
import { chart_Data, getTotal ,getFinal} from '../helper/helper'
import { default as api } from '../store/apiSlice';
// import { useState } from 'react'
import Cookies from "universal-cookie";
// import { Button, Icon, Modal } from 'semantic-ui-react'
Chart.register(ArcElement);

export default function Graph({ flag },state,action) {
  

  // const [data2, setData] = useState([])
  // console.log(temp)
  let cookie = new Cookies();
  let uname=cookie.get("username")
  








  const { data,isFetching, isSuccess, isError } = (api.useGetlabelsQuery())
  


  //let flag=1;

  // useEffect(() => {
  //   // flag=0;
  //   fetch('http://192.168.1.11:3006/labels')
  //     .then(response => response.json())
  //     .then(data1 => setData(data1))

      


  // }, [])



  let graphData;
  let userdata=[];
  //graphData = <Doughnut {...chart_Data(data)}></Doughnut>;


  useEffect(() => { }, [flag])
  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    for(var i in data)
    {
      if(data[i].user === uname)
      {
        userdata.push(data[i])
      }
    }
    
    graphData = <Doughnut {...chart_Data(userdata)}></Doughnut>;
  } else if (isError) {
    graphData = <div>Error</div>
  }


  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative" id='chart'>
          {graphData}
          <h3 className='mb-4 font-bold title'>Total
          {/* {getFinal(userdata)} */}
            <span className='block text-3xl text-emerald-400'>₹{getTotal(userdata) ?? 0} </span>
          </h3>
        </div>

        <div className="flex flex-col py-10 gap-4">
          {/* Labels */}
          <Labels></Labels>
        </div>
         <span id='balence'>Balence:</span><span id='bal'>&nbsp; ₹{getFinal(userdata) ?? 0}</span>
       
      </div>
    </div>
  )
}

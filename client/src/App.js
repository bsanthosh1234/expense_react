import './App.css';
import Graph from './components/Graph';
import Form from './components/Form';
import List from './components/List';
// import Table from './components/Table';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Todos from './components/Todos';



import React,{useEffect, useState} from 'react'


export default function App() {
  const [temp,setTemp]=useState(0)
  const [flag, setFlag] = useState(false)
  useEffect(()=>{},[flag])
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-slate-500 text-white rounded mt-30">Expense Tracker</h1>

        {/* grid columns */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Chart */}
          <Graph temp={temp} flag={flag}></Graph>
          {/* Form */}

          <Form setFlag={setFlag} flag={flag}></Form>
          <div className='ml-10' id='Listinmain'>
            <List flag={flag}></List>
          </div>

        </div>
        {/* <Table /> */}

      </div>
    </div>
  )
}



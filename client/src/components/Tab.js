// import React, { Component } from 'react';
// import 'boxicons';
// import '../Table.css';
// import axios from 'axios';
// import Cookies from 'universal-cookie';
// import $ from 'jquery';
// import 'datatables.net-dt/js/dataTables.dataTables';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
// import 'datatables.net-buttons/js/dataTables.buttons.js';
// import 'datatables.net-buttons/js/buttons.colVis.js';
// import 'datatables.net-buttons/js/buttons.flash.js';
// import 'datatables.net-buttons/js/buttons.html5.js';
// import 'datatables.net-buttons/js/buttons.print.js';

// class Tables extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       filteredData: [],
//       filterName: '',
//       filterType: '',
//       filterStartDate: '',
//       filterEndDate: '',
//     };
//   }

//   componentDidMount() {
//     const cookie = new Cookies();
//     const uname = cookie.get('username');
//     axios.get('http://192.168.1.11:3006/labels').then(res => {
//       const userData = res.data.filter(data => data.user === uname);
//       this.setState({ data: userData, filteredData: userData });
//     });
//     $(document).ready(() => {
//       setTimeout(() => {
//         $('#example').DataTable({
//           pagingType: 'full_numbers',
//           pageLength: 5,
//           processing: true,
//           dom: 'Bfrtip',
//           buttons: ['copy', 'csv', 'print'],
//         });
//       }, 50);
//     });
//   }

//   handleFilterSubmit = () => {
//     const { filterName, filterType, filterStartDate, filterEndDate } = this.state;
//     const filteredData = this.state.data.filter(data => {
//       let match = true;
//       if (filterName && !data.name.includes(filterName)) {
//         match = false;
//       }
//       if (filterType && data.type !== filterType) {
//         match = false;
//       }
//       if (filterStartDate && new Date(data.date) < new Date(filterStartDate)) {
//         match = false;
//       }
//       if (filterEndDate && new Date(data.date) > new Date(filterEndDate)) {
//         match = false;
//       }
//       return match;
//     });
//     this.setState({ filteredData });
//   };

//   handleFilterReset = () => {
//     this.setState({
//       filteredData: this.state.data,
//       filterName: '',
//       filterType: '',
//       filterStartDate: '',
//       filterEndDate: '',
//     });
//   };

//   render() {
//     const { filteredData, filterName, filterType, filterStartDate, filterEndDate } = this.state;
//     return (
//       <div className="MainDiv">
//         <div className="container p-5">
//           <br />
//           <div className="flex flex-row space-x-4 mb-4">
//             <div className="relative">
//               <label htmlFor="filterName" className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="filterName"
//                 id="filterName"
//                 value={filterName}
//                 onChange={e => this.setState({ filterName: e.target.value })}
//                 className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-2 rounded-md"
//                 placeholder="Filter by name"
//               />
//             </div>
//             <div className="relative">
//               <label htmlFor="filterType" className="block text-sm font-medium text-gray-700">
//                 Type
//               </label>
//               <select
//                 name="filterType"
//                 id

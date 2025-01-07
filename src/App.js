// import './App.css';
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from './page/dashboard/Dashboard';
// import Entry from './page/entry/Entry';
// import AddTicket from './page/new-ticket/AddTicket';
// import TicketLists from './page/Ticket-List/TicketList';
// import Ticket from './page/ticket/Ticket';
// import PrivateRoute from './components/private-route/PrivateRoute';
// // import { userLogout } from './actions/logoutAction';
// // import { useDispatch } from 'react-redux';

// // import DefaultLayout from './layout/DefaultLayout';

// function App(){
//   // const dispatch = useDispatch();

//   // const handleLogout = () => {
//   //   dispatch(userLogout());
 
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path='/' element={<Entry />} />
//           <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//           <Route path='/add-ticket' element={<PrivateRoute><AddTicket /></PrivateRoute>} />
//           <Route path='/ticket-list' element={<PrivateRoute><TicketLists /></PrivateRoute>} />
//           <Route path='/ticket/:tId' element={<PrivateRoute><Ticket /></PrivateRoute>} />
//           <Route path='/tickets' element={<PrivateRoute><TicketLists /></PrivateRoute>} />
//           {/* <Route path='/logout' element={<Entry onLogout={handleLogout} />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from './page/dashboard/Dashboard';
import Entry from './page/entry/Entry';
import Registration from './page/registration/Registration';
import AddTicket from './page/new-ticket/AddTicket';
import TicketLists from './page/Ticket-List/TicketList';
import Ticket from './page/ticket/Ticket';
import PrivateRoute from './components/private-route/PrivateRoute';

function App() {
  return (
    // <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Entry />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/add-ticket' element={<PrivateRoute><AddTicket /></PrivateRoute>} />
          <Route path='/ticket-list' element={<PrivateRoute><TicketLists /></PrivateRoute>} />
          <Route path='/ticket/:tId' element={<PrivateRoute><Ticket /></PrivateRoute>} />
          <Route path='/tickets' element={<PrivateRoute><TicketLists /></PrivateRoute>} />
        </Routes>
      </div>
    // </Router>
  );
}

export default App;
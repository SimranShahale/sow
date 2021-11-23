import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ListofSow from './pages/ListofSow';
import AssociateInfo from './pages/AssociateInfo';


import Login from './components/Login';
import Landing from './components/Landing';
import Admin from './components/Admin';
import SowDetail from './components/SowDetail';
import ResetPassword from './components/ResetPassword';
import Analytics from './components/Analytics';
import Listofsow from './components/Listofsow';
import Header from "./components/Header"
function App() {
  const [user, setUser] = React.useState({ username: "", isLoggedIn: false })
  const callback = (username, isLoggedIn) => {
    setUser({ username: username, isLoggedIn: isLoggedIn })
  }
  return (
    <>
      <Router>
        <div>
          {user.isLoggedIn && <Header user={user} callback={callback} />}
          <Routes>
            {/* <Redirect to='/' />   */}
            <>
              {/* {!user.isLoggedIn ? */}
                {/* <> */}
                  <Route exact path='/' element={<Login callback={callback} />} />
                  <Route exact path='/ResetPassword' element={<ResetPassword />} />
                {/* </>
                : */}
                <>
                  {/* <Route path='/ResetPassword' element={<ResetPassword />} /> */}
                  <Route path='/Landing' element={<Landing user={user} />} />
                  <Route path='/SowDetail' element={<SowDetail />} />
                  <Route path='/Admin' element={<Admin />} />
                  <Route path='/Analytics' element={<Analytics />} />
                  <Route path='/Listofsow' element={<Listofsow />} />
                </>
            </>
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;

// function App() {
//   return (
//     <>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path='' element={<Home />} />
//           <Route path='AssociateInfo' element={<AssociateInfo />} />
//           <Route path='ListofSows' element={<ListofSow />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;
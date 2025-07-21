import React from 'react'
import styled from "styled-components";
import bg from './img/bg.jpg'
import {MainLayout} from './styles/Layout'
import Orb from './components/orb/Orb'
import Navigation from './components/Navigation/Navigation'
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income'
import Expenses from './components/Expenses/Expenses';
import Transactions from './components/Transactions/Transactions'
import { useGlobalContext } from './context/globalContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  const { token } = useGlobalContext();

  const orbMemo = React.useMemo(() => {
    return <Orb />
  },[])

  return (
    <Router>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={
            token ? (
              <MainLayout>
                <Navigation />
                <main>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/expenses" element={<Expenses />} />
                    </Routes>
                </main>
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
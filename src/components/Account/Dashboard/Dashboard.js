import React from 'react';
import DashboardWrapper from '../../Wrappers/DashboardWrapper'
import Todos from '../Todos/Todos'

const Home = () => (
  <DashboardWrapper>
    <div className="text-center">
      <h2>Todos</h2>
    </div>
    <Todos>
    </Todos>
  </DashboardWrapper>
)

export default Home
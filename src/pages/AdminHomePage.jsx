import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import LatestTours from '../components/LatestTour'
import CreateTourForm from '../components/CreateTourForm'

const AdminHomePage = () => {
  const [refresh, setRefresh] = useState(false);

const handleTourCreated = () => {
  setRefresh(prev => !prev); // flip boolean to trigger effect
};

 return (
    <div>
       <div className="flex h-screen  bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Nav/>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4 mt-4">
          <LatestTours refreshTrigger={refresh} />
          <CreateTourForm onCreated={handleTourCreated}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminHomePage

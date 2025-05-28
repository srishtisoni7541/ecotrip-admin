import React from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import LatestTours from '../components/LatestTour'
import CreateTourForm from '../components/CreateTourForm'

const AdminHomePage = () => {
 return (
    <div>
       <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4">
        <Nav/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <LatestTours />
          <CreateTourForm/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminHomePage

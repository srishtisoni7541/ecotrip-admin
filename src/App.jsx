
import { Route, Routes } from 'react-router-dom'
import RegisterAdminPage from './pages/RegisterAdminPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminHomePage from './pages/AdminHomePage'

const App = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
      <Routes>
        <Route path='/' element={<RegisterAdminPage/>}/>
        <Route path='/login' element={<AdminLoginPage/>} />
        <Route path='/admin' element={<AdminHomePage/>}/>
      </Routes>
    </div>
  )
}

export default App

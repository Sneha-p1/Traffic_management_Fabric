import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from "react-router-dom"
import HomePage from "./components/Home"
import LoginPage from "./components/LoginPage"
import MVDCreateVehicle from "./pages/MVDCreateVehicle"
import MVDDashboard from "./pages/MVDDashboard"
import MVDReadVehicle from "./pages/MVDReadVehicle"
import TMADashboard from "./pages/TMADashboard"
import TMACreateViolation from "./pages/TMACreateViolation"
import TMACreateAccident from "./pages/TMACreateAccident"
import TMAReadVehicle from "./pages/TMAReadVehicle"
import LawDashboard from "./pages/LawDashboard"
import LawReadAccident from "./pages/LawReadAccident"
import InsuranceDashboard from "./pages/InsuranceDashboard"
import InsuranceGive from "./pages/InsuranceGive"
import MvdDeletePage from "./pages/MvdDeletePage"
import QueryAllProducts from "./pages/QueryAllproducts"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/'element={<HomePage/>}/>
      <Route path='/mvddashboard' element={<MVDDashboard />} />
      <Route path='/createvehicle' element={<MVDCreateVehicle />} />
      <Route path='/readvehicle' element={<MVDReadVehicle />} />
      <Route path='/queyallvehicle' element={<QueryAllProducts />} />
      <Route path='/deletevehicle' element={<MvdDeletePage />} />
      <Route path='/tmadashboard' element={<TMADashboard />} />
      <Route path='/tmareadvehicle' element={<TMAReadVehicle />} />
      <Route path='/createviolation' element={<TMACreateViolation />} />
      <Route path='/createaccident' element={<TMACreateAccident />} />
      <Route path='/ledashboard' element={<LawDashboard />} />
      <Route path='/lawreadaccident' element={<LawReadAccident />} />
      <Route path='/insurancedashboard' element={<InsuranceDashboard />} />
      <Route path='/giveinsurance' element={<InsuranceGive />} />

    </>


  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
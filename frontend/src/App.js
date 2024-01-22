import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

import Buildings from "./pages/Buildings";
import AddBuilding from "./pages/AddBuilding";
import ProfileBuilding from "./pages/ProfileBuilding";
import EditBuilding from "./pages/EditBuilding";

import Metrics from "./pages/Metrics";
import AddMetrics from "./pages/AddMetric";
import EditMetric from "./pages/EditMetric";

import BuildingMetrics from "./pages/BuildingMetrics";
import AddBuildingMetric from "./pages/AddBuildingMetric";

import EditBuildingMetric from "./pages/EditBuildingMetric";
import MapPolution from "./pages/MapPolution";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/map" element={<MapPolution/>}></Route>

          <Route path="/users" element={<Users/>}></Route>
          <Route path="/users/add" element={<AddUser/>}></Route>
          <Route path="/users/edit/:id" element={<EditUser/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/products/add" element={<AddProduct/>}></Route>
          <Route path="/products/edit/:id" element={<EditProduct/>}></Route>
          <Route path="/buildings" element={<Buildings/>}></Route>
          <Route path="/buildings/add" element={<AddBuilding/>}></Route>
          <Route path="/buildings/profile/:id" element={<ProfileBuilding/>}></Route>

          <Route path="/buildings/edit/:id" element={<EditBuilding/>}></Route>
          <Route path="/metrics" element={<Metrics/>}></Route>
          <Route path="/metrics/add" element={<AddMetrics/>}></Route>
          <Route path="/metrics/edit/:id" element={<EditMetric/>}></Route>
          <Route path="/buildingmetrics" element={<BuildingMetrics/>}></Route>
          <Route path="/buildingmetrics/add" element={<AddBuildingMetric/>}></Route>
          <Route path="/buildingmetrics/edit/:id" element={<EditBuildingMetric/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

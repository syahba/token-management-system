import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
        <Route path="/user" element={<UserPage></UserPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

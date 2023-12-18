import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./page/admin/DashboardPage";
import HomePage from "./page/public/HomePage";
import CoworkingsPage from "./page/public/CoworkingsPage";
import CoworkingDetailsPage from "./page/public/CoworkingDetailsPage";
import LoginPage from "./page/public/LoginPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coworkings" element={<CoworkingsPage />} />
        <Route path="/coworking/details/:id" element={<CoworkingDetailsPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
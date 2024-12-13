import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import CompanyPage from './pages/CompanyPage'
import CreateCompanyPage from './pages/CreateCompanyPage'
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <Header title={"Event Managemnt System"}/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />

          <Route path="/create-company" element={<CreateCompanyPage />} />
          <Route path="/company/:companyId" element={<CompanyPage />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

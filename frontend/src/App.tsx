import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import SignupPage from "./pages/auth/SignupPage";
import SigninPage from "./pages/auth/SigninPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProtected from "./components/AuthProtected";
import ChatPage from "./pages/chat";

export default function App() {
  return <div className="min-h-screen">
    <BrowserRouter>
      <Routes>
        <Route element={<AuthProtected/>}>
          <Route element={<AuthPage />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
}
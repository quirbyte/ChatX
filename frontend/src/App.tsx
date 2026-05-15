import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import SignupPage from "./pages/auth/SignupPage";
import SigninPage from "./pages/auth/SigninPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProtected from "./components/AuthProtected";
import ChatPage from "./pages/chat";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return <div className="min-h-screen">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route element={<AuthProtected />}>
          <Route element={<AuthPage />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </div>
}

function NotFound(){
  return <div className="min-h-screen w-screen bg-zinc-950 flex justify-center items-center text-white">
    <p className="font-semibold tracking-tight text-3xl">Error 404 | Page does not exist.</p>
  </div>
}
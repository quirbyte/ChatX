import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import SignupPage from "./pages/auth/SignupPage";
import SigninPage from "./pages/auth/SigninPage";


export default function App() {
  return <div className="min-h-screen">
    <BrowserRouter>
      <Routes>
        <Route element={<AuthPage/>}>
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/signin" element={<SigninPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
}
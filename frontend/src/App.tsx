import { BrowserRouter, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";


export default function App() {
  return <div className="min-h-screen">
    <BrowserRouter>
      <Route path="/auth" Component={AuthPage} />
    </BrowserRouter>
  </div>
}
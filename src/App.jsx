import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecetasProvider } from "./context/RecetasProvider";
import PublicLayout from "./layouts/PublicLayout";
import PublicIndex from "./pages/public/PublicIndex";
import AuthLayout from "./layouts/AuthLayout";
import AuthIndex from "./pages/auth/AuthIndex";

function App() {
  return (
    <BrowserRouter>
      <RecetasProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<PublicIndex />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<AuthIndex />} />
          </Route>
        </Routes>
      </RecetasProvider>
    </BrowserRouter>
  );
}

export default App;

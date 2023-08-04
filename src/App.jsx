import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecetasProvider } from "./context/RecetasProvider";

import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";

import PublicIndex from "./pages/public/PublicIndex";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import EditAccount from "./pages/auth/EditAccount";
import ConfirmAccount from "./pages/auth/ConfirmAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NewPassword from "./pages/auth/NewPassword";

function App() {
  return (
    <BrowserRouter>
      <RecetasProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<PublicIndex />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route
              path="/auth/confirm-account/:token"
              element={<ConfirmAccount />}
            />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/auth/change-password/:token"
              element={<NewPassword />}
            />
            <Route path="/auth/edit-account/:id" element={<EditAccount />} />
          </Route>
        </Routes>
      </RecetasProvider>
    </BrowserRouter>
  );
}

export default App;

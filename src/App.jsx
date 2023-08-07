import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecetasProvider } from "./context/RecetasProvider";

import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";

import PublicIndex from "./pages/public/PublicIndex";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ConfirmAccount from "./pages/auth/ConfirmAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NewPassword from "./pages/auth/NewPassword";

import EditAccount from "./pages/auth/EditAccount";
import MyProfile from "./pages/public/MyProfile";
import MyFavorites from "./pages/public/MyFavorites";
import Recipe from "./pages/public/Recipe";
import AddRecipe from "./pages/public/AddRecipe";
import EditRecipe from "./pages/public/EditRecipe";
import Settings from "./pages/public/Settings";

function App() {
  return (
    <BrowserRouter>
      <RecetasProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<PublicIndex />} />
            <Route path="/my-profile/:id" element={<MyProfile />} />
            <Route path="/edit-profile/:id" element={<EditAccount />} />
            <Route path="/my-favorites" element={<MyFavorites />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route path="/settings" element={<Settings />} />
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
          </Route>
        </Routes>
      </RecetasProvider>
    </BrowserRouter>
  );
}

export default App;

//TODO: AL TERMINAR AGREGAR UN SPINNER

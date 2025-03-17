import About from "./components/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { SparklesPreview } from "./components/hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Protected from "./components/Protected";
import MainLayOut from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedWrap";
import SellForm from "./components/SellForm";
import Clothing from "./components/Clothing";
import BuyForm from "./components/BuyForm";
import SingleCloth from "./components/SingleCloth";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import Accessories from "./components/Accessories";
import ContactUs from "./components/ContactUs";
import SingleAccessory from "./components/SingleAccessory";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import RoleBasedRoute from "./layouts/RoleBasedRoutes";
import AdminPurchases from "./components/AdminPurchases";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayOut>
              <SparklesPreview />
            </MainLayOut>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayOut>
              <About />
            </MainLayOut>
          }
        />
        <Route
          path="/contactus"
          element={
            <MainLayOut>
              <ContactUs />
            </MainLayOut>
          }
        />
        <Route
          path="/signin"
          element={
            <MainLayOut>
              <Signin />
            </MainLayOut>
          }
        />
        <Route
          path="/signup"
          element={
            <MainLayOut>
              <Signup />
            </MainLayOut>
          }
        />
        <Route
          path="/forgot"
          element={
            <MainLayOut>
              <ForgotPassword />
            </MainLayOut>
          }
        />
        <Route
          path="/reset-password"
          element={
            <MainLayOut>
              <ChangePassword />
            </MainLayOut>
          }
        />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/protected"
            element={
              <MainLayOut>
                <Protected />
              </MainLayOut>
            }
          />
          <Route
            path="/sellform"
            element={
              <MainLayOut>
                <SellForm />
              </MainLayOut>
            }
          />
          <Route
            path="/cloths"
            element={
              <MainLayOut>
                <Clothing />
              </MainLayOut>
            }
          />
          <Route
            path="/accessories"
            element={
              <MainLayOut>
                <Accessories />
              </MainLayOut>
            }
          />
          <Route
            path="/buyform"
            element={
              <MainLayOut>
                <BuyForm />
              </MainLayOut>
            }
          />
          <Route
            path="/cloth/:id"
            element={
              <MainLayOut>
                <SingleCloth />
              </MainLayOut>
            }
          />
          <Route
            path="/cart"
            element={
              <MainLayOut>
                <Cart />
              </MainLayOut>
            }
          />
          <Route
            path="/accessory/:id"
            element={
              <MainLayOut>
                <SingleAccessory />
              </MainLayOut>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
            </RoleBasedRoute>
          }
        >
          <Route path="purchases" element={<AdminPurchases />} />

        </Route>
        <Route
          path="*"
          element={
            <MainLayOut>
              <NotFound />
            </MainLayOut>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

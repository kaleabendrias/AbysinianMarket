import About from "./components/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { SparklesPreview } from "./components/hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Protected from "./components/Protected";
import MainLayOut from "./components/MainLayout";
import ProtectedWrap from "./components/ProtectedWrap";
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
        <Route
          path="/protected"
          element={
            <ProtectedWrap
              element={
                <MainLayOut>
                  <Protected />
                </MainLayOut>
              }
            ></ProtectedWrap>
          }
        />
        <Route
          path="/sellform"
          element={
            <ProtectedWrap
              element={
                <MainLayOut>
                  <SellForm />
                </MainLayOut>
              }
            ></ProtectedWrap>
          }
        />
        <Route
          path="/cloths"
          element={
            <ProtectedWrap
              element={
                <MainLayOut>
                  <Clothing />
                </MainLayOut>
              }
            ></ProtectedWrap>
          }
        />
        <Route
          path="/accessories"
          element={
            <ProtectedWrap
              element={
                <MainLayOut>
                  <Accessories />
                </MainLayOut>
              }
            ></ProtectedWrap>
          }
        />
        <Route
          path="/buyform"
          element={
            <ProtectedWrap
              element={
                <MainLayOut>
                  <BuyForm />
                </MainLayOut>
              }
            ></ProtectedWrap>
          }
        />

        <Route
          path="/cloth/:id"
          element={
            <ProtectedWrap
              element={
                <MainLayOut>
                  <SingleCloth />
                </MainLayOut>
              }
            ></ProtectedWrap>
          }
        />
        <Route
          path="/accessory/:id"
          element={
            <ProtectedWrap
              element={
                <MainLayOut>
                  <SingleAccessory />
                </MainLayOut>
              }
            ></ProtectedWrap>
          }
        />
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

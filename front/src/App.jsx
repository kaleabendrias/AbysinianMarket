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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

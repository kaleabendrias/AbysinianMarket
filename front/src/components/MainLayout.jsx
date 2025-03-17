import PropTypes from "prop-types";

// import Navbar from "./Navbar";

export default function MainLayOut({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  );
}

MainLayOut.propTypes = {
  children: PropTypes.node,
};

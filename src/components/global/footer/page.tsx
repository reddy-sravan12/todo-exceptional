import React from "react";

const Footer: React.FC = () => (
  <footer
    style={{
      textAlign: "center",
      padding: "1rem",
      fontSize: "1rem",
      color: "#555",
    }}
  >
    With love, Sravan{" "}
    <span style={{ color: "red", fontSize: "1.2em" }}>&hearts;</span>
  </footer>
);

export default Footer;

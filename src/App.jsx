import { useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [imei, setImei] = useState("");
  const notify = () => toast("IMEI Copied!!");

  const generateImei = () => {
    const randomNumber = () => Math.floor(Math.random() * 10);
    let imeiNumber = "";

    // First two digits are the Type Allocation Code (TAC)
    imeiNumber += "35";

    // Next 6 digits are the Final Assembly Code (FAC)
    for (let i = 0; i < 6; i++) {
      imeiNumber += randomNumber();
    }

    // Next 6 digits are the unique serial number (SNR)
    for (let i = 0; i < 6; i++) {
      imeiNumber += randomNumber();
    }

    // Generate the check digit using the Luhn algorithm
    let sum = 0;
    let shouldDouble = true;
    for (let i = imeiNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(imeiNumber.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    const checkDigit = (sum * 9) % 10;

    imeiNumber += checkDigit;

    setImei(imeiNumber);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imei);
    notify();
  };

  return (
    <div className="container">
      <h1>Random IMEI Number Generator</h1>
      <div className="imei-input">
        <input type="text" value={imei} readOnly />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
      <button className="generate-btn" onClick={generateImei}>
        Generate Random IMEI
      </button>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}

export default App;

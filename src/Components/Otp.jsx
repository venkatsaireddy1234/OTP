import React, { useRef, useState } from "react";

function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (index, value) => {
    if (!isNaN(value) || value === "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (value !== "" && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      } else if (value === "" && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = "";
        return newOtp;
      });
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length ===  6) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setOtp(["", "", "", "", "", ""]);
      }, 3000);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {showSuccess && (
        <p className="text-green-500">Successfully submitted OTP!</p>
      )}
      {showError && (
        <p className="text-red-500">Please enter the correct OTP.</p>
      )}
      {!showSuccess && (
        <>
          <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
          <div className="flex space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyUp={(e) => handleKeyPress(index, e)}
                className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export default Otp;

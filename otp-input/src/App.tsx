import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [otpFields, setOtpFields] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const newOtps = [...otpFields];
    const numericValue = value.replace(/\D/g, "");
    const newValue = numericValue.charAt(numericValue.length - 1);
    newOtps[index] = newValue;
    if (index < otpFields.length - 1 && newValue) {
      inputRefs.current[index + 1]?.focus();
    }
    setOtpFields(newOtps);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0) {
      e.preventDefault();
      const newOtps = [...otpFields];
      newOtps[index] = "";
      setOtpFields(newOtps);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < otpFields.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    const newOtps = [...otpFields];
    for (let i = 0; i < pasteData.length; i++) {
      if (index + i < otpFields.length) {
        newOtps[index + i] = pasteData[i];
      }
    }
    setOtpFields(newOtps);

    // Move focus to the last filled input field
    const nextIndex = Math.min(index + pasteData.length, otpFields.length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="otp-container">
      {otpFields.map((_, index) => {
        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            value={otpFields[index]}
          />
        );
      })}
    </div>
  );
}

export default App;

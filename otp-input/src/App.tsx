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
      // Move focus to the previous input field
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      // Move focus to the next input field
      if (index < otpFields.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      // Move focus to the previous input field
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
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
            value={otpFields[index]}
          />
        );
      })}
    </div>
  );
}

export default App;

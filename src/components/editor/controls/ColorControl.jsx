// src/components/editor/controls/ColorControl.jsx
import { useState, useRef, useEffect } from "react";

const ColorControl = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  // Predefined color options
  const colorOptions = [
    "#ffffff",
    "#000000",
    "#1a73e8",
    "#d93025",
    "#1e8e3e",
    "#f9ab00",
    "#f1f3f4",
    "#e8eaed",
    "#dadce0",
    "#80868b",
  ];

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <label className="mb-2 block text-sm text-gray-700">{label}</label>
      <div ref={pickerRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center space-x-2 rounded-lg border border-gray-200 p-2 text-sm hover:border-gray-300"
        >
          <div
            className="h-6 w-6 rounded border border-gray-200"
            style={{ backgroundColor: value }}
          />
          <span className="flex-1 text-left">{value}</span>
        </button>

        {/* Color Picker Dropdown */}
        {isOpen && (
          <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    onChange(color);
                    setIsOpen(false);
                  }}
                  className="h-8 w-8 rounded-full border border-gray-200 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Custom Color Input */}
            <div className="mt-3">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-gray-200 p-1 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="#000000"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorControl;

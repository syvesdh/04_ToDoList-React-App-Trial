import React, { useState } from "react";
import "./ColorPicker.css";

function ColorPicker() {
  const [color, setColor] = useState("#FFFFFF");
  let invertedColor = invertColor(color);

  function handleColorChange(event) {
    setColor(event.target.value);
    invertedColor = invertColor(color);
  }

  function invertColor(hex) {
    // Remove the '#' if it exists
    let colorValue = hex.replace("#", "");

    // Convert to RGB integers
    const r = 255 - parseInt(colorValue.substring(0, 2), 16);
    const g = 255 - parseInt(colorValue.substring(2, 4), 16);
    const b = 255 - parseInt(colorValue.substring(4, 6), 16);

    // Convert back to hex format and return
    const invertedColor = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    return invertedColor;
  }

  return (
    <div className="color-picker-container">
      <h1>Color Picker</h1>
      <div className="color-picker-display" style={{ backgroundColor: color }}>
        <p style={{ color: invertedColor }}>Selected Color: {color}</p>
      </div>
      <div>
        <label>Select a color:</label>
        <input type="color" onChange={handleColorChange} />
      </div>
    </div>
  );
}

export default ColorPicker;

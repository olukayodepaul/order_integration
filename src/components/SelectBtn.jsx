import React from "react";

const SelectBtn = ({ id, value, onChange, options = [] }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Filter by Status:
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded px-3 py-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBtn;

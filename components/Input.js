import React from "react";

export default function Input({ type, value, onChange, required }) {
  return <input type={type} value={value} onChange={onChange} required={required} className="border px-3 py-1 rounded w-80" />;
}

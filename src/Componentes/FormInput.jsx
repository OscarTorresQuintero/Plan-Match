//DOCUMENTAR Y ACTUALIZAR

export default function FormInput({ label, type, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
      />
    </div>
  );
}

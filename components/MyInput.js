export default function MyInput({ value, onChange, type, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      required=""
      placeholder={placeholder}
      className="my-3 rounded border-2 border-solid p-2.5"
    />
  );
}

export default function MyButton({ name }) {
  return (
    <button type="submit" className="my-3 rounded bg-sky-600 p-4  text-white">
      {name}
    </button>
  );
}

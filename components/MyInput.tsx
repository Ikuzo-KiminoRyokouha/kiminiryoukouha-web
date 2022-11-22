import { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
}

export default function MyInput({ type, ...inputProps }: Props) {
  return (
    <input
      {...inputProps}
      type={type}
      required
      className="my-3 rounded border-2 border-solid p-2.5"
    />
  );
}

type TextFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function TextField({
  value,
  onChange = () => {},
}: TextFieldProps) {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

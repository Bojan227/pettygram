type TextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  className: string;
};

export default function TextField({
  value,
  onChange = () => {},
  className = '',
}: TextFieldProps) {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </>
  );
}

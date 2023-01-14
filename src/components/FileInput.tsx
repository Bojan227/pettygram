export default function FileInput({
  handleImageUpload,
  title,
}: {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}) {
  return (
    <div className="file-input">
      <input
        onChange={(e) => handleImageUpload(e)}
        type="file"
        id="actual-btn"
      />

      <label htmlFor="actual-btn">{title}</label>
    </div>
  );
}

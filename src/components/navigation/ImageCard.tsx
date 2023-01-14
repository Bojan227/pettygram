export default function ImageCard({ file }: { file: File }) {
  return (
    <div className="image-card">
      <img src={URL.createObjectURL(file)} />
    </div>
  );
}

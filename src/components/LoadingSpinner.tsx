export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`spinner-container ${className || ''}`}>
      <div className="loading-spinner"></div>
    </div>
  );
}

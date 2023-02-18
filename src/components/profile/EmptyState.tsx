import { CameraIcon } from '@heroicons/react/24/solid';

export default function EmptyState({
  isLoggedUser,
}: {
  isLoggedUser: boolean;
}) {
  return isLoggedUser ? (
    <div className="empty-state">
      <CameraIcon />
      <h1>Share Photos</h1>
      <p>When you share photos, they will appear on your profile.</p>
    </div>
  ) : (
    <div className="empty-state">
      <CameraIcon />
      <h1>No Posts Yet</h1>
    </div>
  );
}

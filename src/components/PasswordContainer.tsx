import { Dispatch, SetStateAction, useState } from 'react';

export default function PasswordContainer({
  password,
  setPassword,
}: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  return (
    <div
      style={{ position: 'relative' }}
      className="flex flex-col w-full justify-center items-center text-white register-form"
    >
      Password
      <input
        onFocus={() => setIsPasswordModalOpen(true)}
        onBlur={() => setIsPasswordModalOpen(false)}
        type="password"
        className={
          'bg-[#e1306c] rounded-lg p-2 w-5/6 sm:w-3/5 md:w-2/5 2xl:w-1/5'
        }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isPasswordModalOpen && (
        <div
          className="password-modal"
          onClick={() => setIsPasswordModalOpen(false)}
        >
          <h1>Your password needs to:</h1>
          <ul>
            <li>include both lower and uppercase characters.</li>
            <li>include at least one number and symbol.</li>
            <li>be at least 8 characters long</li>
          </ul>
        </div>
      )}
    </div>
  );
}

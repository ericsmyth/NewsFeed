import { useEffect } from 'react';

interface SuccessModalProps {
  message: string;
  redirectTo: string;
  delay?: number;
}

export default function SuccessModal({ message, redirectTo, delay = 2000 }: SuccessModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = redirectTo;
    }, delay);

    return () => clearTimeout(timer);
  }, [redirectTo, delay]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <p className="text-sm text-gray-500">Redirecting you to login...</p>
        </div>
      </div>
    </div>
  );
} 
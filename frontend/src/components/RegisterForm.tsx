import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import SuccessModal from './SuccessModal';

const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="login-form">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              {...register('name')}
              id="name"
              type="text"
              className={`w-full px-3 py-2 ${
                errors.name ? 'border-red-500 dark:border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="text-red-500 dark:text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              className={`w-full px-3 py-2 ${
                errors.email ? 'border-red-500 dark:border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              className={`w-full px-3 py-2 ${
                errors.password ? 'border-red-500 dark:border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>
          {errors.root && (
            <p className="text-red-500 dark:text-red-400 text-sm text-center">{errors.root.message}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:text-blue-700 dark:hover:text-blue-400">
              Login here
            </a>
          </p>
        </form>
      </div>
      {showSuccessModal && (
        <SuccessModal
          message="Thanks for registering! Please log in to continue."
          redirectTo="/login"
        />
      )}
    </div>
  );
} 
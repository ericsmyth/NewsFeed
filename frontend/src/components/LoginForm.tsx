import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../lib/auth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      // Use window.location for full page navigation in Astro
      window.location.href = '/user';
    } catch (error) {
      console.error('Login form error:', error);
      setError('root', {
        type: 'manual',
        message: 'Invalid email or password',
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="login-form">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
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
              type="password"
              id="password"
              {...register('password')}
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
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="text-primary hover:text-blue-700 dark:hover:text-blue-400">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
} 
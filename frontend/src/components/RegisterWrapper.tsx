import { BrowserRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';

export default function RegisterWrapper() {
  return (
    <BrowserRouter>
      <RegisterForm />
    </BrowserRouter>
  );
} 
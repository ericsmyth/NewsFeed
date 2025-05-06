import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserDashboardWrapper } from './UserDashboardWrapper';
import { useAuth } from '../hooks/useAuth';
import { getTheme, setTheme, applyTheme, type Theme } from '../utils/theme';

// Mock the hooks and utilities
jest.mock('../hooks/useAuth');
jest.mock('../utils/theme');
jest.mock('./NewsApiOrg', () => ({
  NewsApiOrg: () => <div data-testid="news-api-org">News API Component</div>,
}));

type UserSidebarProps = {
  user: { id: number; name: string; email: string };
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
};

jest.mock('./UserSidebar', () => ({
  UserSidebar: ({ user, currentTheme, onThemeChange }: UserSidebarProps) => (
    <div data-testid="user-sidebar">
      User Sidebar Component
      <button onClick={() => onThemeChange('dark')}>Change Theme</button>
    </div>
  ),
}));

// Mock React's useState
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('UserDashboardWrapper', () => {
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  };

  let mockIsClient = false;
  const setIsClient = jest.fn();
  const setCurrentTheme = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockIsClient = false;
    
    // Mock useState for isClient and currentTheme
    (React.useState as jest.Mock)
      .mockImplementationOnce(() => [mockIsClient, setIsClient])
      .mockImplementationOnce(() => ['light', setCurrentTheme]);
    
    // Mock useAuth hook
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: jest.fn(),
    });

    // Mock theme utilities
    (getTheme as jest.Mock).mockReturnValue('light');
    (setTheme as jest.Mock).mockImplementation(() => {});
    (applyTheme as jest.Mock).mockImplementation(() => {});
  });

  it('renders nothing when not on client side', () => {
    render(<UserDashboardWrapper />);
    expect(screen.queryByTestId('news-api-org')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-sidebar')).not.toBeInTheDocument();
  });

  it('renders nothing when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    mockIsClient = true;
    (React.useState as jest.Mock)
      .mockImplementationOnce(() => [mockIsClient, setIsClient])
      .mockImplementationOnce(() => ['light', setCurrentTheme]);

    render(<UserDashboardWrapper />);
    expect(screen.queryByTestId('news-api-org')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-sidebar')).not.toBeInTheDocument();
  });

  it('renders dashboard components when authenticated and on client side', async () => {
    mockIsClient = true;
    (React.useState as jest.Mock)
      .mockImplementationOnce(() => [mockIsClient, setIsClient])
      .mockImplementationOnce(() => ['light', setCurrentTheme]);

    render(<UserDashboardWrapper />);
    expect(screen.getByTestId('news-api-org')).toBeInTheDocument();
    expect(screen.getByTestId('user-sidebar')).toBeInTheDocument();
  });

  it('handles theme changes correctly', async () => {
    mockIsClient = true;
    (React.useState as jest.Mock)
      .mockImplementationOnce(() => [mockIsClient, setIsClient])
      .mockImplementationOnce(() => ['light', setCurrentTheme]);

    render(<UserDashboardWrapper />);
    
    // Trigger theme change
    fireEvent.click(screen.getByText('Change Theme'));
    
    expect(setTheme).toHaveBeenCalledWith('dark');
    expect(applyTheme).toHaveBeenCalledWith('dark');
  });
}); 
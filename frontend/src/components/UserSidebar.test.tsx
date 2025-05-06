import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserSidebar } from './UserSidebar';
import { type Theme } from '../utils/theme';

describe('UserSidebar', () => {
  const mockUser = {
    name: 'Test User',
  };

  const mockOnThemeChange = jest.fn();
  const currentTheme: Theme = 'light';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user name correctly', () => {
    render(
      <UserSidebar
        user={mockUser}
        currentTheme={currentTheme}
        onThemeChange={mockOnThemeChange}
      />
    );

    expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
  });

  it('renders theme selector', () => {
    render(
      <UserSidebar
        user={mockUser}
        currentTheme={currentTheme}
        onThemeChange={mockOnThemeChange}
      />
    );

    const themeSelect = screen.getByLabelText('Theme:');
    expect(themeSelect).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Dark' })).toBeInTheDocument();
  });

  it('calls onThemeChange when theme is changed', () => {
    render(
      <UserSidebar
        user={mockUser}
        currentTheme={currentTheme}
        onThemeChange={mockOnThemeChange}
      />
    );

    const themeSelect = screen.getByLabelText('Theme:');
    fireEvent.change(themeSelect, { target: { value: 'dark' } });

    expect(mockOnThemeChange).toHaveBeenCalledWith('dark');
  });

  it('displays current theme correctly', () => {
    render(
      <UserSidebar
        user={mockUser}
        currentTheme={currentTheme}
        onThemeChange={mockOnThemeChange}
      />
    );

    const themeSelect = screen.getByLabelText('Theme:') as HTMLSelectElement;
    expect(themeSelect.value).toBe('light');
  });

  it('renders default user name when name is not provided', () => {
    render(
      <UserSidebar
        user={{}}
        currentTheme={currentTheme}
        onThemeChange={mockOnThemeChange}
      />
    );

    expect(screen.getByText('Welcome, User')).toBeInTheDocument();
  });
}); 
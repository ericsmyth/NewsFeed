import { RouterWrapper } from './RouterWrapper';
import { ErrorBoundary } from './ErrorBoundary';
import { UserDashboardWrapper } from './UserDashboardWrapper';

export const DashboardRoot = () => {
  return (
    <RouterWrapper>
      <ErrorBoundary>
        <UserDashboardWrapper />
      </ErrorBoundary>
    </RouterWrapper>
  );
}; 
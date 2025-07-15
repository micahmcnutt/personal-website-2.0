import PortfolioPage from '../components/pages/PortfolioPage';
import Layout from '../components/layout/Layout';
import ErrorBoundary from '../components/ui/ErrorBoundary';

export default function Portfolio() {
  return (
    <Layout>
      <ErrorBoundary>
        <PortfolioPage />
      </ErrorBoundary>
    </Layout>
  );
} 
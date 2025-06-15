
import React from 'react';
import CustomerDashboard from '@/components/CustomerDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CustomerDashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Helmet>
        <title>My Account - Customer Dashboard | Debora Cosmetics</title>
        <meta name="description" content="Manage your profile, view order history, and update your addresses in your customer dashboard." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <CustomerDashboard />
    </>
  );
};

export default CustomerDashboardPage;

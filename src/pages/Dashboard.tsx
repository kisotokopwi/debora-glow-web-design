
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Navigate } from 'react-router-dom';
import CustomerDashboard from '@/components/CustomerDashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect based on user role
  if (profile?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <CustomerDashboard />;
};

export default Dashboard;

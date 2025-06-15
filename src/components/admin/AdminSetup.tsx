
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Shield, UserPlus } from 'lucide-react';

const AdminSetup = () => {
  const [email, setEmail] = useState('admin@deboracosmetics.com');
  const [isCreating, setIsCreating] = useState(false);

  const createAdminMutation = useMutation({
    mutationFn: async (adminEmail: string) => {
      // Update the profile to admin role for the specified email
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('email', adminEmail)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data && data.length > 0) {
        toast.success(`Successfully granted admin role to ${email}`);
      } else {
        toast.error(`No user found with email ${email}. Please ensure the user has signed up first.`);
      }
      setIsCreating(false);
    },
    onError: (error) => {
      toast.error('Failed to create admin user');
      console.error('Admin creation error:', error);
      setIsCreating(false);
    }
  });

  const handleCreateAdmin = () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }
    setIsCreating(true);
    createAdminMutation.mutate(email);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-rose-600" />
          <span>Admin Setup</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">
            Admin Email Address
          </label>
          <Input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            The user must already be registered before granting admin access.
          </p>
        </div>
        
        <Button 
          onClick={handleCreateAdmin}
          disabled={isCreating || createAdminMutation.isPending}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {isCreating ? 'Creating Admin...' : 'Grant Admin Access'}
        </Button>

        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Steps to create an admin:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>User must first sign up normally</li>
            <li>Enter their email above</li>
            <li>Click "Grant Admin Access"</li>
            <li>User will have admin privileges on next login</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSetup;

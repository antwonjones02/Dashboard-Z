import Head from 'next/head';
import { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardOverview from '@/components/DashboardOverview';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/utils/AuthContext';

export default function Home() {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute>
      <Head>
        <title>Dashboard-Z | Dashboard</title>
        <meta name="description" content="A unified dashboard solution that intelligently centralizes all aspects of professional life" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <DashboardOverview />
      </Layout>
    </ProtectedRoute>
  );
}
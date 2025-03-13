import Head from 'next/head';
import { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardOverview from '@/components/DashboardOverview';

export default function Home() {
  return (
    <>
      <Head>
        <title>Workflow Nexus | Dashboard</title>
        <meta name="description" content="A unified dashboard solution that intelligently centralizes all aspects of professional life" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <DashboardOverview />
      </Layout>
    </>
  );
}
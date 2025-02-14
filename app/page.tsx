import React from 'react';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import HomePage from '@/components/Home';

export default function Home() {
  return (
    <ReactQueryProvider>
      <div>
        <HomePage />
      </div>
    </ReactQueryProvider>
  );
}

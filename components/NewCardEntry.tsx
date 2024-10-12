'use client'

import { newEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NewCardEntry() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state to track API call

  const handleOnClick = async () => {
    setLoading(true); // Set loading to true when API call starts
    const data = await newEntry();
    setLoading(false);
    router.push(`/journal/${data.id}`);
  };

  return (
    <div
      className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow newEntry ${
        loading ? 'loading' : ''
      }`}
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
}

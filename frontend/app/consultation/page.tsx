'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { ChatInterface } from '@/components/chat-interface';
import { mockBrands } from '@/library/mock-data';

function ConsultationContent() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get('brand');
  const brand = brandId ? mockBrands.find(b => b.id === brandId) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-balance">브랜드 상담</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            {brand
              ? `${brand.name} 브랜드 창업에 궁금한 점을 물어보세요`
              : '퍼스널 가이드를 위해 저희의 전문가와 상담하세요'}
          </p>
        </div>
        <ChatInterface brandContext={brand} />
      </main>
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConsultationContent />
    </Suspense>
  );
}

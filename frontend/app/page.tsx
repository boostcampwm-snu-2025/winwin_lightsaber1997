'use client';

import { Navbar } from '@/components/navbar';
import { SearchBar } from '@/components/search-bar';
import { BrandCard } from '@/components/brand-card';
import { AdvertisementCarousel } from '@/components/advertisement-carousel';

import { useEffect, useState } from 'react';
import { getPopularBrands } from '@/library/services/brandService';
import type { BrandCardResponse } from '@/library/services/brandService';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [subcategory, setSubcategory] = useState('all');

  const [brands, setBrands] = useState<BrandCardResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      setLoading(true);
      try {
        const data = await getPopularBrands();
        setBrands(data);
      } catch (error) {
        console.error('Failed to fetch popular brands:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []); // no dependencies, runs once

  const handleToggleFavorite = (brandId: string) => {
    setBrands(prev =>
      prev.map(brand =>
        brand.id === brandId ? { ...brand, isFavorite: !brand.isFavorite } : brand,
      ),
    );
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSubcategory('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <AdvertisementCarousel />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            나에게 딱 맞는 프랜차이즈를 발견하세요
          </h1>
          <p className="mt-2 text-lg text-muted-foreground leading-relaxed">
            다양한 업종의 프랜차이즈 기회를 살펴보고, 당신의 비즈니스 목표에 꼭 맞는 브랜드를
            찾아보세요.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            category={category}
            subcategory={subcategory}
            onSearchChange={setSearchQuery}
            onCategoryChange={handleCategoryChange}
            onSubcategoryChange={setSubcategory}
          />
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">로딩중...</div>
        ) : brands.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">조건에 맞는 브랜드를 찾을 수 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map(brand => (
              <BrandCard key={brand.id} brand={brand} onToggleFavorite={handleToggleFavorite} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

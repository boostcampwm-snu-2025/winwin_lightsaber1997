'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { SearchBar } from '@/components/search-bar';
import { BrandCard } from '@/components/brand-card';
import { mockBrands } from '@/library/mock-data';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [inputValue, setInputValue] = useState(queryParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [category, setCategory] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [brands, setBrands] = useState(mockBrands);

  useEffect(() => {
    setInputValue(queryParam);
    setSearchQuery(queryParam);
  }, [queryParam]);

  const filteredBrands = useMemo(() => {
    return brands.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [brands, searchQuery]);

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
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            브랜드 검색 결과
          </h1>
          <p className="mt-2 text-lg text-muted-foreground leading-relaxed">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : 'Search for franchise opportunities'}
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            searchQuery={inputValue}
            category={category}
            subcategory={subcategory}
            onSearchChange={setInputValue}
            onCategoryChange={handleCategoryChange}
            onSubcategoryChange={setSubcategory}
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Found {filteredBrands.length} {filteredBrands.length === 1 ? 'brand' : 'brands'}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBrands.map(brand => (
            <BrandCard key={brand.id} brand={brand} onToggleFavorite={handleToggleFavorite} />
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">조건에 맞는 브랜드를 찾을 수 없습니다</p>
            <p className="mt-2 text-sm text-muted-foreground">다른 검색어로 다시 시도바랍니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}

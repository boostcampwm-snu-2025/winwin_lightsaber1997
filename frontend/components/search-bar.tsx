'use client';

import type React from 'react';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES, SUBCATEGORIES } from '@/library/types';

interface SearchBarProps {
  searchQuery: string;
  category: string;
  subcategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
}

export function SearchBar({
  searchQuery,
  category,
  subcategory,
  onSearchChange,
  onCategoryChange,
  onSubcategoryChange,
}: SearchBarProps) {
  const router = useRouter();
  const subcategoryOptions = category ? SUBCATEGORIES[category] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:flex-row bg-card rounded-full p-6 shadow-xl border-2"
    >
      <div className="relative flex-1">
        <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="브랜드를 검색하세요"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="!h-14 pr-12 text-2xl placeholder:text-xl py-2 rounded-full border-0 focus-visible:ring-0 bg-background/50"
        />
      </div>
      <div className="flex gap-4">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-[200px] !h-14 text-xl py-2 rounded-full border-0 bg-background/50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">업종 카테고리</SelectItem>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={subcategory}
          onValueChange={onSubcategoryChange}
          disabled={!category || category === 'all'}
        >
          <SelectTrigger className="w-full sm:w-[200px] !h-14 text-xl py-2 rounded-full border-0 bg-background/50">
            <SelectValue placeholder="Subcategory" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">세부 카테고리</SelectItem>
            {subcategoryOptions.map(subcat => (
              <SelectItem key={subcat.value} value={subcat.value}>
                {subcat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}

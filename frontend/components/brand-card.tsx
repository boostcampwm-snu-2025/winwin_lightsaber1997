'use client';

import type React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BrandCardResponse } from '@/library/services/brandService';
import { cn } from '@/library/utils';

interface BrandCardProps {
  brand: BrandCardResponse;
  onToggleFavorite?: (brandId: string) => void;
}

export function BrandCard({ brand, onToggleFavorite }: BrandCardProps) {
  const [isFavorite, setIsFavorite] = useState(brand.isFavorite || false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(brand.id);
  };

  return (
    <Link href={`/brand/${brand.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={brand.imageUrl || '/placeholder.svg'}
              alt={brand.brandName}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'absolute right-2 top-2 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-background hover:shadow-md',
                isFavorite && 'bg-red-50/90 hover:bg-red-50',
              )}
              onClick={handleFavoriteClick}
            >
              <Heart
                className={cn(
                  'h-5 w-5 transition-all duration-300',
                  isFavorite
                    ? 'fill-red-500 text-red-500 scale-110'
                    : 'text-gray-600 hover:text-red-500 hover:scale-110',
                )}
              />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-balance">{brand.brandName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{brand.industry}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

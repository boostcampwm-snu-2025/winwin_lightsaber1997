'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/library/utils';

interface FavoriteButtonProps {
  brandId: string;
  brandName: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function FavoriteButton({
  brandId,
  brandName,
  className,
  variant = 'outline',
  size = 'lg',
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(brandId));
    setIsLoading(false);
  }, [brandId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((id: string) => id !== brandId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, brandId];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  if (isLoading) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Heart className="mr-2 h-4 w-4" />
        Add to Favorites
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'transition-all',
        isFavorite && 'bg-red-50 border-red-500 text-red-600 hover:bg-red-100 hover:text-red-700',
        className,
      )}
      onClick={toggleFavorite}
    >
      <Heart
        className={cn('mr-2 h-4 w-4 transition-all', isFavorite && 'fill-red-500 text-red-500')}
      />
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
  );
}

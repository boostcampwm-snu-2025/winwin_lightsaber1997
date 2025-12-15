import { fetcher } from '@/library/http/fetcher';

// ✅ Full Brand (matches `MutableBrand` in backend)
export interface Brand {
  id: number;
  brandName: string;
  corpName: string;
  industryLargeClassName: string;
  industryMiddleClassName: string;
  franchiseCount: number;
  avgSalesAmount: number;
  avgUnitSalesAmount: number;
  imageUrl: string;
  likesCount: number;
  serialNum: number;
}

// ✅ Compact Card view (matches `BrandCardResponse`)
export interface BrandCardResponse {
  id: number;
  brandName: string;
  imageUrl: string;
  likesCount: number;
}

// ✅ /api/brands?large=..&middle=..&name=..
export async function getBrands(params?: {
  large?: string;
  middle?: string;
  name?: string;
}): Promise<BrandCardResponse[]> {
  const query = new URLSearchParams(params as any).toString();
  return fetcher<BrandCardResponse[]>(`/api/brands${query ? `?${query}` : ''}`);
}

// ✅ /api/brands/popular?large=..&middle=..&name=..&limit=..
export async function getPopularBrands(params?: {
  large?: string;
  middle?: string;
  name?: string;
  limit?: number;
}): Promise<BrandCardResponse[]> {
  const query = new URLSearchParams(params as any).toString();
  return fetcher<BrandCardResponse[]>(`/api/brands/popular${query ? `?${query}` : ''}`);
}

// ✅ /api/brands/{id}
export async function getBrandDetail(id: number): Promise<Brand> {
  return fetcher<Brand>(`/api/brands/${id}`);
}

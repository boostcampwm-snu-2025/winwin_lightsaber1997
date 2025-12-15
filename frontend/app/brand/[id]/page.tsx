import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Heart, MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getBrandDetail } from '@/library/services/brandService';
import { FavoriteButton } from '@/components/favorite-button';

interface BrandPageProps {
  params: {
    id: string;
  };
}

export default async function BrandPage(props: BrandPageProps) {
  const { id } = await props.params;
  const brand = await getBrandDetail(Number(id)).catch(() => null);

  if (!brand) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          모든 브랜드로 돌아가기
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            <Image
              src={brand.imageUrl || '/placeholder.svg'}
              alt={brand.brandName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {brand.brandName}
              </h1>
              <div className="mt-4 space-y-2">
                <p className="text-base">
                  <span className="font-semibold">운영 본사:</span> {brand.corpName}
                </p>
                <p className="text-base">
                  <span className="font-semibold">산업 분야:</span> {brand.industryLargeClassName} /{' '}
                  {brand.industryMiddleClassName}
                </p>
                <div className="flex items-center gap-2 text-base">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="font-semibold">{brand.likesCount}</span>명이 관심을 가졌습니다
                </div>
              </div>
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">주요 지표</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">
                      {brand.franchiseCount?.toLocaleString() ?? 'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground">가맹점 수</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">
                      {(brand.avgSalesAmount / 1_000_000)?.toLocaleString() ?? 'N/A'}M
                    </p>
                    <p className="text-sm text-muted-foreground">
                      평균 매출액 (가맹점 기준, 백만원)
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">
                      {(brand.avgUnitSalesAmount / 1_000_000)?.toLocaleString() ?? 'N/A'}M
                    </p>
                    <p className="text-sm text-muted-foreground">면적당 평균 매출액 (백만원)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <FavoriteButton brandId={brand.id} brandName={brand.brandName} className="w-full" />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1" size="lg">
                  <a href={brand.imageUrl || '#'} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    정보공개서 보기
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1 bg-transparent" size="lg">
                  <Link href={`/consultation?brand=${brand.id}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    창업 상담
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">브랜드 소개</h2>
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-gray max-w-none">
                <p className="leading-relaxed text-muted-foreground">
                  {brand.brandName}는 {brand.corpName}에서 운영하는{' '}
                  {brand.industryLargeClassName.toLowerCase()} 분야의 대표적인 프랜차이즈
                  브랜드입니다. 전국에 {brand.franchiseCount?.toLocaleString()}개 매장을 운영하며,
                  신뢰받는 브랜드로 자리 잡고 있습니다.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  본사는 가맹점을 위한 체계적인 지원 프로그램을 운영합니다. 교육, 마케팅, 운영
                  가이드 등 다양한 지원을 통해 안정적이고 지속 가능한 성장을 도모합니다. 평균 매출
                  수치는 시장 수요와 검증된 비즈니스 모델의 성공을 보여줍니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 향후 기능 예시:
        {brand.growthData && brand.growthData.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">프랜차이즈 성장 추이</h2>
            <FranchiseGrowthChart
              data={brand.growthData}
              brandName={brand.brandName}
            />
          </div>
        )} */}
      </main>
    </div>
  );
}

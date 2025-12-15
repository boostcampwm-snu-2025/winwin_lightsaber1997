'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

// const advertisements: Advertisement[] = [
//   {
//     id: "1",
//     title: "Build Your Dream",
//     description:
//       "Discover endless opportunities to become your own boss. Whether it's food, fashion, healthcare, or lifestyle — find the perfect franchise that aligns with your passion and goals.",
//     image: "/ad-build-dream.jpg",
//     link: "#",
//   },
//   {
//     id: "2",
//     title: "Pizza Hut – A Global Franchise Icon",
//     description:
//       "Join one of the world's most recognized food brands. Pizza Hut combines proven business models, strong brand recognition, and a loyal customer base — empowering franchisees to succeed in every market.",
//     image: "/ad-pizza-hut.jpg",
//     link: "#",
//   },
//   {
//     id: "3",
//     title: "Franchise Success Insights",
//     description:
//       "Learn what it takes to run a thriving franchise. From financial planning to operational excellence, explore expert tips and real-world advice designed to help new franchise owners grow with confidence.",
//     image: "/ad-management-tips.jpg",
//     link: "/consultation",
//   },
//   {
//     id: "4",
//     title: "The Steakhouse Opportunity",
//     description:
//       "Step into the premium dining space with a brand that celebrates craftsmanship, quality, and taste. A steakhouse franchise that attracts discerning diners and drives sustainable growth.",
//     image: "/ad-steakhouse.jpg",
//     link: "#",
//   },
// ]

const advertisements: Advertisement[] = [
  {
    id: '1',
    title: '당신의 꿈을 현실로',
    description:
      '나만의 비즈니스를 시작할 무한한 기회를 만나보세요. 음식, 패션, 헬스케어, 라이프스타일까지 — 당신의 열정과 목표에 꼭 맞는 프랜차이즈를 찾아보세요.',
    image: '/ad-build-dream.jpg',
    link: '#',
  },
  {
    id: '2',
    title: '피자헛 – 글로벌 프랜차이즈의 아이콘',
    description:
      '전 세계적으로 사랑받는 대표 외식 브랜드, 피자헛의 일원이 되어보세요. 검증된 비즈니스 모델과 강력한 브랜드 인지도, 충성도 높은 고객층이 안정적인 성공을 돕습니다.',
    image: '/ad-pizza-hut.jpg',
    link: '#',
  },
  {
    id: '3',
    title: '프랜차이즈 성공 노하우',
    description:
      '성공적인 프랜차이즈 운영의 비결을 배워보세요. 재무 계획부터 운영 관리까지 — 신규 창업자가 자신 있게 성장할 수 있도록 전문가의 인사이트를 제공합니다.',
    image: '/ad-management-tips.jpg',
    link: '/consultation',
  },
  {
    id: '4',
    title: '프리미엄 스테이크하우스의 기회',
    description:
      '장인 정신과 품질, 그리고 맛을 중시하는 프리미엄 다이닝 브랜드에 함께하세요. 미식가를 사로잡는 스테이크하우스 프랜차이즈로 지속 가능한 성장을 이끌어보세요.',
    image: '/ad-steakhouse.jpg',
    link: '#',
  },
];

export function AdvertisementCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % advertisements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev - 1 + advertisements.length) % advertisements.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev + 1) % advertisements.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentAd = advertisements[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-lg bg-muted">
      <div className="relative aspect-[16/6] w-full">
        <Image
          src={currentAd.image || '/placeholder.svg'}
          alt={currentAd.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-white text-balance sm:text-3xl lg:text-4xl">
                {currentAd.title}
              </h2>
              <p className="mt-3 text-base text-white/90 leading-relaxed">
                {currentAd.description}
              </p>
              <Button asChild size="default" className="mt-4 bg-white text-black hover:bg-white/90">
                <a href={currentAd.link}>Learn More</a>
              </Button>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 hover:text-white"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 hover:text-white"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {advertisements.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

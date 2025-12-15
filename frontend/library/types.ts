export interface Brand {
  id: string;
  name: string;
  image: string;
  operatingCompany: string;
  industry: string;
  category: string;
  subcategory: string;
  totalStores: number;
  avgSales: number;
  avgSalesPerArea: number;
  likes: number;
  disclosureUrl: string;
  isFavorite?: boolean;
  growthData?: { year: number; stores: number }[];
}

// export const CATEGORIES = [
//   { value: "food", label: "Food & Beverage" },
//   { value: "beauty", label: "Beauty, Health & Wellness" },
//   { value: "retail", label: "Retail & Convenience" },
//   { value: "education", label: "Education & Kids" },
//   { value: "services", label: "Services & Lifestyle" },
//   { value: "consulting", label: "Franchise Support & Consulting" },
// ]

// export const SUBCATEGORIES: Record<string, { value: string; label: string }[]> = {
//   food: [
//     { value: "chicken", label: "Chicken" },
//     { value: "pizza", label: "Pizza" },
//     { value: "burgers", label: "Burgers / Fast Casual" },
//     { value: "korean", label: "Korean Cuisine" },
//     { value: "cafe", label: "Café / Coffee" },
//     { value: "dessert", label: "Dessert / Bakery" },
//     { value: "bubble-tea", label: "Bubble Tea / Juice / Smoothie" },
//     { value: "casual-dining", label: "Casual Dining / Family Restaurant" },
//   ],
//   beauty: [
//     { value: "hair-nail", label: "Hair / Nail / Beauty" },
//     { value: "spa", label: "Spa / Skincare / Massage" },
//     { value: "fitness", label: "Fitness / Pilates" },
//   ],
//   retail: [
//     { value: "convenience", label: "Convenience Stores" },
//     { value: "lifestyle", label: "Retail / Lifestyle" },
//     { value: "fashion", label: "Accessories / Fashion" },
//   ],
//   education: [
//     { value: "language", label: "Language / Tutoring" },
//     { value: "coding", label: "Coding / STEAM Education" },
//     { value: "kids-cafe", label: "Kids' Café / Early Learning" },
//   ],
//   services: [
//     { value: "laundry", label: "Laundry / Cleaning" },
//     { value: "pet", label: "Pet Services" },
//     { value: "car", label: "Car Wash / Maintenance" },
//     { value: "delivery", label: "Delivery / Logistics" },
//   ],
//   consulting: [
//     { value: "consulting", label: "Consulting / Brokerage" },
//     { value: "marketing", label: "Marketing / Branding" },
//   ],
// }

export const CATEGORIES = [
  { value: 'food', label: '음식 & 음료' },
  { value: 'beauty', label: '뷰티 · 헬스 & 웰니스' },
  { value: 'retail', label: '소매 · 편의점' },
  { value: 'education', label: '교육 · 키즈' },
  { value: 'services', label: '서비스 · 라이프스타일' },
  { value: 'consulting', label: '프랜차이즈 지원 · 컨설팅' },
];

export const SUBCATEGORIES: Record<string, { value: string; label: string }[]> = {
  food: [
    { value: 'chicken', label: '치킨' },
    { value: 'pizza', label: '피자' },
    { value: 'burgers', label: '버거 / 패스트캐주얼' },
    { value: 'korean', label: '한식' },
    { value: 'cafe', label: '카페 / 커피' },
    { value: 'dessert', label: '디저트 / 베이커리' },
    { value: 'bubble-tea', label: '버블티 / 주스 / 스무디' },
    { value: 'casual-dining', label: '캐주얼 다이닝 / 패밀리 레스토랑' },
  ],
  beauty: [
    { value: 'hair-nail', label: '헤어 / 네일 / 뷰티' },
    { value: 'spa', label: '스파 / 스킨케어 / 마사지' },
    { value: 'fitness', label: '피트니스 / 필라테스' },
  ],
  retail: [
    { value: 'convenience', label: '편의점' },
    { value: 'lifestyle', label: '소매 / 라이프스타일' },
    { value: 'fashion', label: '패션 / 액세서리' },
  ],
  education: [
    { value: 'language', label: '어학 / 과외' },
    { value: 'coding', label: '코딩 / 융합교육(STEAM)' },
    { value: 'kids-cafe', label: '키즈카페 / 유아교육' },
  ],
  services: [
    { value: 'laundry', label: '세탁 / 청소' },
    { value: 'pet', label: '반려동물 서비스' },
    { value: 'car', label: '세차 / 차량정비' },
    { value: 'delivery', label: '배달 / 물류' },
  ],
  consulting: [
    { value: 'consulting', label: '컨설팅 / 중개' },
    { value: 'marketing', label: '마케팅 / 브랜딩' },
  ],
};

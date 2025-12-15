import { Navbar } from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ConsultationLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="mt-2 h-5 w-full" />
        </div>
        <Card className="h-[600px]">
          <Skeleton className="h-full w-full" />
        </Card>
      </main>
    </div>
  );
}

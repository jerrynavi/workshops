import { CubeIcon } from '@heroicons/react/solid';

export default function PageLoading() {
  return (
    <div className="fixed bottom-0 right-0 mr-2 mb-2 z-50">
      <CubeIcon className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}

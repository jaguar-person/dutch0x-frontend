import react from 'react';
import { Button } from '@/common';
import { useRouter } from 'next/router';
import NotFoundImage from '../assets/not_found.png';
import Image from 'next/image';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
      <Image
        src={NotFoundImage}
        alt="notFound"
        width={230}
        height={230}
        className="mx-auto mb-8"
      />
      <div className="text-[#868686] mb-8">
        <p className="font-bold text-5xl">Page not found</p>
        <p className="text-xl">Error code: 404</p>
      </div>
      <Button
        onClick={() => {
          router.push('/');
        }}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;

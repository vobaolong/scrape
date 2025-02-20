import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='text-center'>
        <h1 className='mb-4 text-6xl font-bold text-primary'>404</h1>
        <h2 className='mb-4 text-2xl font-semibold text-gray-600'>
          Page Not Found
        </h2>
        <p className='max-w-md mb-8 text-gray-500'>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Link
            href='/'
            className='flex items-center justify-center px-4 py-2 text-white transition-colors rounded-md bg-primary hover:bg:primary/80'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Home
          </Link>
        </div>
      </div>
      <div className='mt-12 text-center'>
        <footer className='text-sm text-muted-foreground'>
          If you think this is a mistake, please contact our support team.
        </footer>
      </div>
    </div>
  )
}

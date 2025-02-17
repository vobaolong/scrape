import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center p-4 flex-col'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-primary mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Page Not Found
        </h2>
        <p className='text-gray-500 mb-8  max-w-md'>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <Link
            href='/'
            className='flex items-center justify-center px-4 py-2 bg-primary hover:bg:primary/80 transition-colors text-white rounded-md'
          >
            <ArrowLeft className='mr-2 w-4 h-4' />
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

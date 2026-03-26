export const dynamic = 'force-dynamic';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900">404 - Page Not Found</h2>
            <p className="mt-4 text-gray-600">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <a
                href="/"
                className="mt-6 inline-block rounded-full bg-[#285e2c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-opacity-90"
            >
                Return to Home
            </a>
        </div>
    );
}
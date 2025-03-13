import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ErrorProps {
  statusCode: number;
  hasGetInitialPropsRun: boolean;
  err?: Error;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  const router = useRouter();

  let title = 'An error occurred';
  let message = 'Please try again later.';

  if (statusCode === 404) {
    title = 'Page not found';
    message = 'The page you are looking for does not exist.';
  } else if (statusCode === 500) {
    title = 'Server error';
    message = 'Our server encountered an error. Please try again later.';
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>{title} | Dashboard-Z</title>
        <meta name="description" content={message} />
      </Head>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            {statusCode ? `Error ${statusCode}` : 'Client Error'}
          </h1>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
          
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => router.back()}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Go Back
            </button>
            
            <Link href="/" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode, hasGetInitialPropsRun: true };
};

export default Error;
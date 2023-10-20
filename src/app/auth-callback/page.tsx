'use client';

import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { useEffect } from 'react';

export default function AuthCallBackPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	// Get origin where user was redirected from
	const origin = searchParams.get('origin');
	// Check if user is synced/saved to DB
	const { isError, error, data } = trpc.authCallback.useQuery();

	useEffect(() => {
		if (isError) router.push('/sign-in');

		// Redirect user to previous page
		if (data?.status === 'success')
			router.push(origin ? `/${origin}` : '/dashboard');
	});

	return (
		<div className='w-full mt-24 flex justify-center'>
			<div className='flex flex-col items-center gap-2'>
				<Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
				<h3 className='font-semibold text-xl'>Setting up your account...</h3>
				<p>You will be redirected automatically.</p>
			</div>
		</div>
	);
}

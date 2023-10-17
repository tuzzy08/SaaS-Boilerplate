'use client';

import { PropsWithChildren, useState } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@/app/_trpc/client';
import { httpBatchLink } from '@trpc/react-query';

export function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:3000/api/trpc',
				}),
			],
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			{/* This exposes react query client so it can be used independently of trpc */}
			<QueryClientProvider client={queryClient}>
				<ClerkProvider>{children}</ClerkProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
}

import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Dashboard } from '@/components/Dashboard';
import { prisma as db } from '@/lib/prisma';

export default async function DashboardPage() {
	const { user: current_user } = auth();

	const user = await db.user.findFirst({
		where: {
			id: current_user?.id,
		},
	});

	if (!user) redirect('/auth-callback?origin=dashboard');

	return <Dashboard />;
}

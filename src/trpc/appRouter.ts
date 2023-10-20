import { z } from 'zod';
import { auth, currentUser } from '@clerk/nextjs';
import { publicProcedure, router } from './trpc';
import { prisma as db } from '@/lib/prisma';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
	authCallback: publicProcedure.query(async () => {
		const response: { status: string | null; data: any } = {
			status: null,
			data: null,
		};
		const { userId } = auth();
		if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
		// Check if user exists in the DB
		const user = await db.user.findFirst({
			where: {
				id: userId,
			},
		});

		const current_user = await currentUser();
		if (!user && current_user != null) {
			// User doesnt exist, create user and save in DB
			const res = await db.user.create({
				data: {
					id: current_user.id,
					first_name: current_user.firstName as string,
					last_name: current_user.lastName as string,
					email: current_user.emailAddresses[0].emailAddress,
				},
			});
			response.status = 'success';
			response.data = res;
		}
		return response;
	}),
});

// export type definition of API
export type AppRouter = typeof appRouter;

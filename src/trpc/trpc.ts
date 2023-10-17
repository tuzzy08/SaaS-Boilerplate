import { TRPCError, initTRPC } from '@trpc/server';
import { auth } from '@clerk/nextjs';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create();
// create middleware
const middleware = t.middleware;
// this middleware checks if the current user is
// authenticated before calling the API route
const isAuth = middleware(async (opts) => {
	const { user, userId } = auth();
	if (!userId) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return opts.next({
		ctx: {
			user,
			userId,
		},
	});
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);

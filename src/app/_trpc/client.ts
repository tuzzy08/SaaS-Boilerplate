import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '@/trpc/appRouter';

// export API handler
export const trpc = createTRPCReact<AppRouter>({});

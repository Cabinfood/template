import { authMiddleware } from '@cabinid/nextjs';

export default authMiddleware({
  publicRoutes: [],
  ignoredRoutes: [],
});

import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Cross-fade between category pages (browsers without the View Transitions API just cut).
    defaultViewTransition: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

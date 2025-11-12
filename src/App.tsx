import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StructuredData } from "@/components/StructuredData";
import { ModalProvider } from "@/contexts/ModalContext";
import { ModalManager } from "@/components/modals/ModalManager";
import { SkipToContent } from "@/components/atomic/SkipToContent";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DAODashboard from "./pages/DAODashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Documentation from "./pages/Documentation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <TooltipProvider>
          <SkipToContent />
          <StructuredData />
          <Toaster />
          <Sonner />
          <ModalManager />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dao" element={<DAODashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/docs" element={<Documentation />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ModalProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

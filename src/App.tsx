import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Index from "./pages/Index";
import DiseaseDetection from "./pages/DiseaseDetection";
import SoilAnalyzer from "./pages/SoilAnalyzer";
import FarmersHub from "./pages/FarmersHub";
import USSDTips from "./pages/USSDTips";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/soil-analyzer" element={<SoilAnalyzer />} />
            <Route path="/farmers-hub" element={<FarmersHub />} />
            <Route path="/ussd" element={<USSDTips />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

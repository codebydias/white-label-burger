/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigContext } from "./context/config-context";
import Index from "./pages";
import { Toaster } from "./components/ui/sonner";

interface AppProps {
  config: any;
}

export default function App({ config }: AppProps) {
  return (
    <ConfigContext.Provider value={config}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </ConfigContext.Provider>
  );
}

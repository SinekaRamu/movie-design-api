import "./App.css";
import "@picocss/pico";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import NotfoundPage from "./pages/NotfoundPage";
import Loading from "./components/Loading";
const Addmovie = lazy(() => import("./pages/AddmoviePage"));
const EditPage = lazy(() => import("./pages/EditPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Addmovie />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

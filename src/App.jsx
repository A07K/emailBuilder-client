import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./components/intro/IntroPage";
import EmailBuilder from "./components/editor/EmailBuilder";
import TemplatesList from "./components/templates/TemplatesList";
import { useRecoilValue } from "recoil";
import { sidebarAtom } from "./store/atoms/sidebarAtom";
import ViewAndEdit from "./components/view/ViewAndEdit";

const App = () => {
  const isSidebarOpen = useRecoilValue(sidebarAtom);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route
            path="/builder/*"
            element={
              <div
                className={`flex transition-all duration-300 ease-in-out ${
                  isSidebarOpen ? "ml-64" : "ml-20"
                }`}
              >
                <EmailBuilder />
              </div>
            }
          />
          <Route
            path="/templates/*"
            element={
              <div
                className={`flex transition-all duration-300 ease-in-out ${
                  isSidebarOpen ? "ml-64" : "ml-20"
                }`}
              >
                <TemplatesList />
              </div>
            }
          />
          <Route
            path="/view/*"
            element={
              <div
                className={`flex transition-all duration-300 ease-in-out ${
                  isSidebarOpen ? "ml-64" : "ml-20"
                }`}
              >
                <ViewAndEdit />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

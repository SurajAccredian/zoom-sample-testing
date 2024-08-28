import MeetingEnter from "./Components/MeetingEnter";
import MeetingPage from "./Components/MeetingPage";
import { Route, Routes } from "react-router-dom";
import WebinarPage from "./Components/WebinarPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MeetingEnter />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/webinar" element={<WebinarPage />} />
    </Routes>
  );
}

export default App;

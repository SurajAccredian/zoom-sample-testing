import MeetingEnter from "./Components/MeetingEnter";
import MeetingPage from "./Components/MeetingPage";
import { Route,Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MeetingEnter />} />
      <Route path="/meeting" element={<MeetingPage />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

interface RightSideContentProps {}

const RightSideContent: React.FC<RightSideContentProps> = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<div className="placeholder">content right</div>}
        />
      </Routes>
    </>
  );
};

export default RightSideContent;

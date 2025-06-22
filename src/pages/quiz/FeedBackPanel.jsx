import React from "react";

const FeedbackPanel = ({ feedback }) => {
  if (!feedback) return null;
  return (
    <div className={`feedback ${feedback}`}>
      {feedback === "correct" ? "✅ Correct!" : "❌ Incorrect"}
    </div>
  );
};

export default FeedbackPanel;

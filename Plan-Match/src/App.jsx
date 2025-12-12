import { useState } from 'react'
import './App.css'

import QuestionFlow from "./components/QuestionFlow.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <QuestionFlow />
    </div>
  );
}

export default App;

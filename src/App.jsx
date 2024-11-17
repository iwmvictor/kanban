import React from "react";

import "./App.css";
import KanbanBoard from "./components/KanbanBoard";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <h1>Workflow Kanban Board</h1>
      <div className="wid">
        <KanbanBoard />
      </div>
    </ErrorBoundary>
  );
};

export default App;

import React from 'react';
import './App.css';
import AppStateWrapper from './components/AppStateWrapper'
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <AppStateWrapper />
        </Layout>
      </Router>
    </div>
  );
}

export default App;

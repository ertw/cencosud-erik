import React from 'react';
import './App.css';
import DataRequestWrapper from './components/AppStateWrapper'
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <DataRequestWrapper />
        </Layout>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import DataRequestWrapper from './components/DataRequestWrapper'
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';
const { Footer } = Layout;

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <DataRequestWrapper />
          <Footer>
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

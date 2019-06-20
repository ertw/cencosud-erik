import React from 'react';
import './App.css';
import FetchTest from './components/FetchTest'
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';
const { Footer } = Layout;

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
            <FetchTest>
            </FetchTest>
          <Footer>
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

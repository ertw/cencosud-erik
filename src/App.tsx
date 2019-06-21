import React from 'react';
import './App.css';
import AppStateWrapper from './components/AppStateWrapper'
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';
import CharacterWrapper from './components/CharacterWrapper';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <AppStateWrapper>
            <CharacterWrapper houses={[]} characters={[]}/>
          </AppStateWrapper>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

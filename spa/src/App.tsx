import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FetchTest } from './components/FetchTest'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Header>
          </Header>
          <Layout>
            <Sider>
              <Route path="/houses" component={FetchTest} />
            </Sider>
            <Content>
              Some content
          </Content>
          </Layout>
          <Footer>
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

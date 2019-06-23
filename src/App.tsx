import React from 'react';
import styles from './App.module.css'
import './App.css';
import AppStateWrapper, { HouseAndCharacterContext } from './components/AppStateWrapper'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, Card } from 'antd';
import CharacterWrapper from './components/CharacterWrapper';
import HouseSearch from './components/HouseSearch'
import HouseCard from './components/HouseCard'

const { Header, Content } = Layout;

export const routes = {
  home: '/',
  house: '/:house',
}

const App: React.FC = (props) => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <AppStateWrapper>
            <Layout>
              <Header className={styles.header}>
                <HouseAndCharacterContext.Consumer>
                  {value => (value.isLoaded ?
                    <HouseSearch {...value} />
                    : null
                  )}
                </HouseAndCharacterContext.Consumer>
              </Header>
              <Content className={styles.content}>
                <Route exact path={routes.home} component={() => (
                  <Card title={'Select a House'} />
                )} />
                <Route path={routes.house} component={() => (
                  <HouseAndCharacterContext.Consumer>
                    {value => (value.isLoaded ?
                      <React.Fragment>
                        <HouseCard {...value} />
                        <CharacterWrapper {...value} />
                      </React.Fragment>
                      : null
                    )}
                  </HouseAndCharacterContext.Consumer>
                )} />
              </Content>
            </Layout >
          </AppStateWrapper>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

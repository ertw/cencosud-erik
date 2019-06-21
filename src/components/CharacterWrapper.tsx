import * as React from 'react'
import { Layout, Select, Card, Col } from "antd"
import { Route, withRouter, RouteComponentProps } from "react-router"
import { endpoint } from "../helpers/fetchData"
import HouseCard from "./HouseCard"
import { Houses, Characters } from './AppStateWrapper'
import CharacterCard from './CharacterCard';

const { Header, Content } = Layout;
const { Option } = Select

interface Props extends RouteComponentProps {
    houses: Houses,
    characters: Characters,
}

const CharacterCardWrapper: React.FunctionComponent<Props> = (props) => {
    const {
        houses,
        characters,
        history,
    } = props
    const parseHouseUrlNumber = (houseUrl: string) => (parseInt((houseUrl).split('/').pop() as string).toString())

    return (
        <Layout>
            <Header style={{ position: 'fixed', width: '100%', zIndex: 1, padding: '0 1rem' }}>
                <Select
                    showSearch
                    style={{ float: 'right', margin: '1rem 0', width: '15rem' }}
                    placeholder="Select a House"
                    onChange={(value, option) => {
                        history.push(parseHouseUrlNumber(value as string))
                    }}
                    optionLabelProp="children"
                >
                    {houses.map((house, index: number) => (
                        <Option
                            key={index}
                            value={JSON.stringify({ name: house.name, url: house.url })}
                            label={house.name}
                        >
                            {house.name}
                        </Option>
                    ))}
                </Select>
            </Header>
            <Content style={{ marginTop: '4rem' }}>
                <Route exact path="/" component={() => (
                    <Card title={'Select a House'} style={{ width: '100%' }} />
                )} />
                <Route path={'/:house'} component={() => (
                    <React.Fragment>
                        {houses
                            .filter(house => (house.url === `${endpoint}/houses${history.location.pathname}`))
                            .map(house => (
                                <HouseCard key={house.name} house={house} characters={characters} />
                            ))
                        }
                    </React.Fragment>
                )} />
                {characters
                    .filter(character => (character.allegiances
                        .find(allegiance => allegiance === `${endpoint}/houses${history.location.pathname}`)))
                    .sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
                    .map((character, index) => (
                        <Col span={8} key={index}>
                            <CharacterCard key={character.name} houses={houses} characters={characters} character={character} />
                        </Col>
                    ))
                }
            </Content>
        </Layout >
    )
}

export default withRouter(CharacterCardWrapper)

import * as React from 'react'
import { Select, Layout, Card, Col, Typography, List } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router';
const { Option } = Select
const { Header, Content } = Layout;
const { Text, Title } = Typography
const endpoint = 'https://anapioficeandfire.com/api'

//
// this module declaration is a workaround for missing label on <OptionProps>
//
declare module "antd/lib/select" {
    export interface OptionProps {
        label?: string;
    }
}

interface State {
    error: any,
    isLoaded: boolean,
    houses: Houses,
    characters: Characters,
}

export interface Houses extends Array<HouseDetails> { }

export interface HouseDetails {
    name: string;
    region: string;
    words: string;
    currentLord: string;
    url?: string;
    coatOfArms?: string;
    titles?: string[];
    seats?: string[];
    heir?: string;
    overlord?: string;
    founded?: string;
    founder?: string;
    diedOut?: string;
    ancestralWeapons?: string[];
    cadetBranches?: string[];
    swornMembers?: string[];
}

export interface Characters extends Array<CharacterDetails> { }

export interface CharacterDetails {
    name: string;
    gender: string;
    culture: string;
    born: string;
    died: string;
    titles: string[];
    aliases: string[];
    father: string;
    mother: string;
    spouse: string;
    allegiances: string[];
    url?: string;
    books?: string[];
    povBooks?: string[];
    tvSeries?: string[];
    playedBy?: string[];
}

const parseHouseUrlNumber = (houseUrl: string) => (parseInt((houseUrl).split('/').pop() as string).toString())

const findHouseByUrlNumber = (houseUrlNumber: string | number, houses: Houses) => (houses
    .find(house => house.url === `${endpoint}/houses/${houseUrlNumber}`))

const findCharacterByUrl = (characterUrl: string, characters: Characters) => (characters
    .find(character => character.url === characterUrl))

class DataRequestWrapper extends React.Component<RouteComponentProps, State> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            houses: [],
            characters: [],
        };
    }

    componentDidMount() {

        const pageSize = 50

            ; (async () => {
                let housePageNumber = 1
                let houses: Houses = []
                let houseResponse = await fetch(`${endpoint}/houses?page=${housePageNumber}&pageSize=${pageSize}`)
                let returnedHouses = await houseResponse.json()
                houses = houses.concat(returnedHouses)
                while (returnedHouses.length === pageSize) {
                    ++housePageNumber
                    houseResponse = await fetch(`${endpoint}/houses?page=${housePageNumber}&pageSize=${pageSize}`)
                    returnedHouses = await houseResponse.json()
                    houses = houses.concat(returnedHouses)
                }
                let characterPageNumber = 1
                let characters: Characters = []
                let characterResponse = await fetch(`${endpoint}/characters?page=${characterPageNumber}&pageSize=${pageSize}`)
                let returnedCharacters = await characterResponse.json()
                characters = characters.concat(returnedCharacters)
                while (returnedCharacters.length === pageSize) {
                    ++characterPageNumber
                    characterResponse = await fetch(`${endpoint}/characters?page=${characterPageNumber}&pageSize=${pageSize}`)
                    returnedCharacters = await characterResponse.json()
                    characters = characters.concat(returnedCharacters)
                }
                this.setState({
                    isLoaded: true,
                    houses,
                    characters,
                });
            })()
    }


    render() {
        const { error, isLoaded, houses, characters } = this.state
        const { history } = this.props
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
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
                    <Content>
                        {houses
                            .filter(house => (house.url === `https://anapioficeandfire.com/api/houses${history.location.pathname}`))
                            .map(house => (
                                <Card title={house.name} style={{ width: '100%' }}>
                                    <p>{house.currentLord}</p>
                                </Card>
                            ))
                        }
                        {characters
                            .filter(character => (character.allegiances[0] === `https://anapioficeandfire.com/api/houses${history.location.pathname}`))
                            .sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
                            .map((character, index) => (
                                <Col span={8} key={index}>
                                    <Card
                                        title={<React.Fragment>
                                            <Title level={2}>{character.name}</Title>
                                            <Text style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                                {character.gender === 'Male' ? '♂' : '♀'}
                                            </Text>
                                            {character.born ? <div><Text type='secondary'>{`Born ${character.born}`}</Text></div> : null}
                                            {character.died ? <div><Text type='secondary'>{`Died ${character.died}`}</Text></div> : null}
                                        </React.Fragment>}
                                        style={{
                                            height: '20rem',
                                            margin: '1rem',
                                            textAlign: 'left',
                                            overflowY: 'auto',
                                            overflowX: 'hidden',
                                        }}>
                                        {character.aliases && character.aliases[0] !== '' ?
                                            <List
                                                size='small'
                                                style={{ marginBottom: '1rem' }}
                                                header={<div><Text strong>Aliases</Text></div>}
                                                bordered
                                                dataSource={character.aliases}
                                                renderItem={item => (
                                                    <List.Item>
                                                        {item}
                                                    </List.Item>
                                                )}
                                            />
                                            : null
                                        }
                                        {character.titles && character.titles[0] !== '' ?
                                            <List
                                                size='small'
                                                style={{ marginBottom: '1rem' }}
                                                header={<div><Text strong>Titles</Text></div>}
                                                bordered
                                                dataSource={character.titles}
                                                renderItem={item => (
                                                    <List.Item>
                                                        {item}
                                                    </List.Item>
                                                )}
                                            />
                                            : null
                                        }
                                        <List
                                            size='small'
                                            style={{ marginBottom: '1rem' }}
                                            header={<div><Text strong>Allegiances</Text></div>}
                                            bordered
                                            dataSource={character.allegiances.map(allegiance => findHouseByUrlNumber(parseHouseUrlNumber(allegiance), houses)!.name)}
                                            renderItem={item => (
                                                <List.Item>
                                                    {item}
                                                </List.Item>
                                            )}
                                        />
                                        {character.culture || character.father || character.mother || character.spouse ?
                                            <List
                                                size='small'
                                                style={{ marginBottom: '1rem' }}
                                                header={<div><Text strong>Other Data</Text></div>}
                                                bordered
                                                dataSource={[
                                                    character.culture ? `Culture: ${character.culture}` : null,
                                                    character.father ? `Father: ${character.father}` : null,
                                                    character.mother ? `Mother: ${character.mother}` : null,
                                                    character.spouse ? `Spouse: ${findCharacterByUrl(character.spouse, characters)!.name}` : null,
                                                ].filter(x => !!x)}
                                                renderItem={item => (
                                                    <List.Item>
                                                        {item}
                                                    </List.Item>
                                                )}
                                            />
                                            : null
                                        }
                                    </Card>
                                </Col>
                            ))
                        }
                    </Content>
                </Layout >
            );
        }
    }
}

export default withRouter(DataRequestWrapper)
import * as React from 'react'
import { Select, Layout } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router';
const { Option } = Select
const { Sider, Content } = Layout;

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

class FetchTest extends React.Component<RouteComponentProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            houses: [],
            characters: [],
        };
    }

    componentDidMount() {

        const endpoint = 'https://anapioficeandfire.com/api'
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
                    <Sider>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
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
                    </Sider>
                    <Content>
                        {characters
                            .filter(character => (character.allegiances[0] === `https://anapioficeandfire.com/api/houses${history.location.pathname}`))
                            .sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
                            .map((character, index) => (
                                <div key={index}>
                                    <p>
                                        {character.name}
                                    </p>
                                </div>
                            ))
                        }
                    </Content>
                </Layout >
            );
        }
    }
}

export default withRouter(FetchTest)
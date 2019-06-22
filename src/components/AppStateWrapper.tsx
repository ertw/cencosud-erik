import * as React from 'react'
import {
    Spin,
    Typography,
} from 'antd'
import { withRouter, RouteComponentProps } from 'react-router';
import { fetchData, endpoint } from '../helpers/fetchData'

const { Title } = Typography

//
// this module declaration is a workaround for missing label on <OptionProps>
//
declare module "antd/lib/select" {
    export interface OptionProps {
        label?: string;
    }
}

export interface State {
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

const houseErrorMsg = 'Error: unable to load house details'
const houseError: HouseDetails = {
    name: houseErrorMsg,
    region: houseErrorMsg,
    words: houseErrorMsg,
    currentLord: houseErrorMsg,
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

const characterErrorMsg = 'Error: unable to load character details'
const characterError: CharacterDetails = {
    name: characterErrorMsg,
    gender: characterErrorMsg,
    culture: characterErrorMsg,
    born: characterErrorMsg,
    died: characterErrorMsg,
    titles: [characterErrorMsg],
    aliases: [characterErrorMsg],
    father: characterErrorMsg,
    mother: characterErrorMsg,
    spouse: characterErrorMsg,
    allegiances: [characterErrorMsg],
}

export const HouseAndCharacterContext = React.createContext(
    {
        houses: [],
        characters: [],
        isLoaded: false,
        error: null,
    } as State
)

export const findHouseByUrlNumber = (houseUrlNumber: string | number, houses: Houses) => (houses
    .find(house => house.url === `${endpoint}/houses/${houseUrlNumber}`) || houseError)

export const findHouseByUrl = (houseUrl: string, houses: Houses) => (houses
    .find(house => house.url === houseUrl) || houseError)

export const findCharacterByUrl = (characterUrl: string, characters: Characters) => (characters
    .find(character => character.url === characterUrl) || characterError)

class AppStateWrapper extends React.Component<RouteComponentProps, State> {
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
        ; (async () => {
            this.setState(
                await fetchData()
            )
        })()
    }

    render() {
        const { error, isLoaded } = this.state
        const { children } = this.props

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Title>Loading external data...</Title><Spin /></div>
        }
        return (
            <HouseAndCharacterContext.Provider value={{ ...this.state }}>
                {children}
            </HouseAndCharacterContext.Provider>
        );
    }
}

export default withRouter(AppStateWrapper)
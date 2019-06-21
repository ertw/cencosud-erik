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

export const findHouseByUrlNumber = (houseUrlNumber: string | number, houses: Houses) => (houses
    .find(house => house.url === `${endpoint}/houses/${houseUrlNumber}`))

export const findHouseByUrl = (houseUrl: string, houses: Houses) => (houses
    .find(house => house.url === houseUrl))

export const findCharacterByUrl = (characterUrl: string, characters: Characters) => (characters
    .find(character => character.url === characterUrl))

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
        const { error, isLoaded, houses, characters } = this.state
        const { children } = this.props

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Title>Loading external data...</Title><Spin /></div>
        } else {
            const childrenWithProps = React.Children
                .map(children, child =>
                    React.cloneElement(child as React.ReactElement<any>, { houses, characters })
                )
            return (
                childrenWithProps
            );
        }
    }
}

export default withRouter(AppStateWrapper)
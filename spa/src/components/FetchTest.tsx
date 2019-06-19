import * as React from 'react'

interface Props {
}

interface State {
    error: any,
    isLoaded: boolean,
    houses: Houses,
    linkHeader: string,
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

export class FetchTest extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            houses: [],
            linkHeader: '',
        };
    }

    componentDidMount() {

        const endpoint = 'https://anapioficeandfire.com/api'
        const pageSize = 50

            ; (async () => {
                let pageNumber = 1
                let houses: Houses = []
                let response = await fetch(`${endpoint}/houses?page=${pageNumber}&pageSize=${pageSize}`)
                let returnedHouses = await response.json()
                houses = houses.concat(returnedHouses)
                while (returnedHouses.length === pageSize) {
                    ++pageNumber
                    response = await fetch(`${endpoint}/houses?page=${pageNumber}&pageSize=${pageSize}`)
                    returnedHouses = await response.json()
                    houses = houses.concat(returnedHouses)
                }
                this.setState({
                    isLoaded: true,
                    houses,
                });
            })()
    }

    render() {
        const { error, isLoaded, houses } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {houses.map((house, index: number) => (
                        <li key={index}>
                            {house.name}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}
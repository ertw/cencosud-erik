import * as React from 'react'

interface Props {
}

interface State {
    error: any,
    isLoaded: boolean,
    houseDetails: HouseDetails,
}

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

export default class FetchTest extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            houseDetails: {
                name: '',
                region: '',
                words: '',
                currentLord: '',
            }
        };
    }

    componentDidMount() {
        fetch("https://anapioficeandfire.com/api/houses/378")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        houseDetails: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, houseDetails } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <p>
                    {houseDetails.name}
                </p>
                //                <ul>
                //                    {Object.keys(items).map((item: string, index: number) => (
                //                        <li key={index}>
                //                            {item}
                //                        </li>
                //                    ))}
                //                </ul>
            );
        }
    }
}
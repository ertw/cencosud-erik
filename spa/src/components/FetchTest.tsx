import * as React from 'react'

interface Props {
}

interface State {
    error: any,
    isLoaded: boolean,
    items: any,
}

export default class FetchTest extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://anapioficeandfire.com/api/houses/378")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.swornMembers
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
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map((item: string, index: number) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}
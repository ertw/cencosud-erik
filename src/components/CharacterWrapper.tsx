import * as React from 'react'
import { Col } from "antd"
import { withRouter, RouteComponentProps } from "react-router"
import { endpoint } from "../helpers/fetchData"
import { State } from './AppStateWrapper'
import CharacterCard from './CharacterCard';

interface Props extends RouteComponentProps { }
interface Props extends State { }

const CharacterWrapper: React.FunctionComponent<Props> = (props) => {
    const {
        history,
        characters,
        houses,
    } = props

    return (
        <React.Fragment>
            {
                characters
                    .filter(character => (character.allegiances
                        .find(allegiance => allegiance === `${endpoint}/houses${history.location.pathname}`)))
                    .sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
                    .map((character, index) => (
                        <Col span={8} key={index}>
                            <CharacterCard key={character.name} houses={houses} characters={characters} character={character} />
                        </Col>
                    ))
            }
        </React.Fragment >
    )
}

export default withRouter(CharacterWrapper)
import * as React from 'react'
import styles from './CharacterWrapper.module.css'
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
        <div className={styles.characterWrapper}>
            {
                characters
                    .filter(character => (character.allegiances
                        .find(allegiance => allegiance === `${endpoint}/houses${history.location.pathname}`)))
                    .sort((c1, c2) => (c1.name > c2.name ? 1 : -1))
                    .map((character, index) => (
                        <CharacterCard
                            key={`${character.name}-${index}`}
                            houses={houses}
                            characters={characters}
                            character={character}
                        />
                    ))
            }
        </div>
    )
}

export default withRouter(CharacterWrapper)
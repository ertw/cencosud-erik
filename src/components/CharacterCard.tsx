import * as React from 'react'
import { Card, Typography, List } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router';
import {
    Characters,
    Houses,
    CharacterDetails,
    findCharacterByUrl,
    findHouseByUrlNumber,
    parseHouseUrlNumber,
} from './AppStateWrapper'

const { Text, Title } = Typography

interface Props extends RouteComponentProps {
    houses: Houses,
    characters: Characters,
    character: CharacterDetails,
}

const CharacterCard: React.FunctionComponent<Props> = (props) => {

    const {
        houses,
        characters,
        character,
    } = props

    return (
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
                height: '25rem',
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
    )
}

export default withRouter(CharacterCard)
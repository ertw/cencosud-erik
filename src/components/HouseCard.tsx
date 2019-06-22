import * as React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router';
import {
    findCharacterByUrl,
    State,
    findHouseByUrl,
} from './AppStateWrapper'
import { endpoint } from '../helpers/fetchData';

const { Text, } = Typography

interface Props extends RouteComponentProps { }
interface Props extends State { }

const HouseCard: React.FunctionComponent<Props> = (props) => {
    const {
        characters,
        history,
        houses,
    } = props
    const house = findHouseByUrl(`${endpoint}/houses${history.location.pathname}`, houses)

    return (
        <Card title={house.name} style={{ width: '100%' }}>
            <Row>
                {house.currentLord ?
                    <Col span={8}>
                        <Text>Current Lord: </Text><Text>{findCharacterByUrl(house.currentLord, characters)!.name}</Text>
                    </Col>
                    : null
                }
                {house.region ?
                    <Col span={8}>
                        <Text>Region: </Text><Text>{house.region}</Text>
                    </Col>
                    : null
                }
                {house.words ?
                    <Col span={8}>
                        <Text>{house.words}</Text>
                    </Col>
                    : null
                }
            </Row>
        </Card>
    )
}

export default withRouter(HouseCard)

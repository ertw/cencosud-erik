import * as React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router';
import {
    Characters,
    HouseDetails,
    findCharacterByUrl,
} from './DataRequestWrapper'

const { Text, } = Typography


interface Props extends RouteComponentProps {
    house: HouseDetails,
    characters: Characters,
}

const HouseCard: React.FunctionComponent<Props> = (props) => {

    const {
        house,
        characters,
    } = props

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
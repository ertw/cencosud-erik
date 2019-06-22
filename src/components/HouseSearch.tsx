import * as React from 'react'
import { Select, } from "antd"
import { withRouter, RouteComponentProps } from "react-router"
import { State } from './AppStateWrapper'

const { Option } = Select

interface Props extends RouteComponentProps { }
interface Props extends State { }

const HouseSearch: React.FunctionComponent<Props> = (props) => {
    const {
        history,
        houses,
    } = props
    const parseHouseUrlNumber = (houseUrl: string) => (parseInt((houseUrl).split('/').pop() as string).toString())

    return (
        <Select
            showSearch
            style={{ float: 'right', margin: '1rem 0', width: '15rem' }}
            placeholder="Select a House"
            onChange={(value, option) => {
                history.push(parseHouseUrlNumber(value as string))
            }}
            optionLabelProp="children"
        >
            {houses.map((house, index: number) => (
                <Option
                    key={index}
                    value={JSON.stringify({ name: house.name, url: house.url })}
                    label={house.name}
                >
                    {house.name}
                </Option>
            ))}
        </Select>
    )
}

export default withRouter(HouseSearch)

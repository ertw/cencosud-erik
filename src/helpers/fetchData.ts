import {Houses, Characters, State as DataRequestWrapperState} from '../components/DataRequestWrapper'

export const endpoint = 'https://anapioficeandfire.com/api'
export const fetchData = async () : Promise<DataRequestWrapperState> => {
const pageSize = 50
    try {
        let housePageNumber = 1
        let houses: Houses = []
        let houseResponse = await fetch(`${endpoint}/houses?page=${housePageNumber}&pageSize=${pageSize}`)
        let returnedHouses = await houseResponse.json()
        houses = houses.concat(returnedHouses)
        while (returnedHouses.length === pageSize) {
            ++housePageNumber
            houseResponse = await fetch(`${endpoint}/houses?page=${housePageNumber}&pageSize=${pageSize}`)
            returnedHouses = await houseResponse.json()
            houses = houses.concat(returnedHouses)
        }
        let characterPageNumber = 1
        let characters: Characters = []
        let characterResponse = await fetch(`${endpoint}/characters?page=${characterPageNumber}&pageSize=${pageSize}`)
        let returnedCharacters = await characterResponse.json()
        characters = characters.concat(returnedCharacters)
        while (returnedCharacters.length === pageSize) {
            ++characterPageNumber
            characterResponse = await fetch(`${endpoint}/characters?page=${characterPageNumber}&pageSize=${pageSize}`)
            returnedCharacters = await characterResponse.json()
            characters = characters.concat(returnedCharacters)
        }
        return ({
            isLoaded: true,
            houses,
            characters,
            error: null,
        })
    } catch (error) {
        return ({
            isLoaded: false,
            houses: [],
            characters: [],
            error,
        })
    }
}
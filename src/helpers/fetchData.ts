import { Houses, Characters, State as DataRequestWrapperState, HouseDetails, CharacterDetails } from '../components/AppStateWrapper'

export const endpoint = 'https://anapioficeandfire.com/api'

const apiRequestor = (data: 'houses' | 'characters') => {
    const makeSingleRequest = async function (pageNo = 1) {
        const pageSize = 50
        const apiResponse = await fetch(`${endpoint}/${data}?page=${pageNo}&pageSize=${pageSize}`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                throw Error(resp.statusText)
            })
        return apiResponse
    }

    const makeAllRequests = async (pageNo = 1): Promise<HouseDetails[] | CharacterDetails[]> => {
        const results = await makeSingleRequest(pageNo)
        console.log("Retreiving data from API for page : " + pageNo)
        if (results.length > 0) {
            return results.concat(await makeAllRequests(pageNo + 1))
        } else {
            return results
        }
    }
    return (makeAllRequests())
}

export const fetchData = async (): Promise<DataRequestWrapperState> => {
    try {
        const houses = await apiRequestor('houses') as Houses
        const characters = await apiRequestor('characters') as Characters
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
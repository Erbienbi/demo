const { gql } = require('apollo-server-express')
const Redis = require('ioredis')
const redis = new Redis()

const ERBIENBI_SERVER = 'http://localhost:3000'
const axios = require('axios')

const schema = gql`

    type Building {
        id: Int
        OwnerId: Int
        area: String
        address: String
        Rooms: [Room!]
    }

    type Room {
        id: Int
        price: Int
        UserId: Int
        BuildingId: Int
        ac: Boolean
        bathroom: Boolean
        carPort: Boolean
        laundry: Boolean
        gender: String
    }

    type Message {
        message: String!
    }

    extend type Query {
        getAllBuilding: [Building]
        getOneBuilding(id:Int): Building
    }

    extend type Mutation {
        postBuilding(
            token: String!
            OwnerId:Int!
            area: String!
            address: String!
            coordinate: String!
        ) : Message

        deleteBuilding(
            token: String!
            id: Int!
        ): Message
    }


`

const resolver = {
    Query: {
        getAllBuilding: async () => {
            const cache = await redis.get('Buildings')
            if (cache) {
                return JSON.parse(cache)
            }

            const { data } = await axios.get(`${ERBIENBI_SERVER}/building`)
            await redis.set('Buildings', JSON.stringify(data))
            return data
        },
        getOneBuilding: async(_,args) => {
            const { data } = await axios.get(`${ERBIENBI_SERVER}/building/${args.id}`)
            return data
        }
    },

    Mutation: {
        postBuilding: async (_, args) => {
            const { OwnerId, area, coordinate, address, token } = args
            const newBuilding = {
                OwnerId,
                area,
                coordinate,
                address
            }

            const { data } = await axios({
                method: 'POST',
                url: `${ERBIENBI_SERVER}/building`,
                headers: {token},
                data: newBuilding
            })
            await redis.del('Buildings')
            const getAllBuilding = await axios.get(`${ERBIENBI_SERVER}/building`)
            await redis.set('Buildings', JSON.stringify(getAllBuilding.data))
            return {message:data}
        },

        deleteBuilding: async (_, args) => {
            const { id, token } = args
            const { data } = await axios({
                method:'DELETE',
                url: `${ERBIENBI_SERVER}/building/${id}`,
                headers: {token}
            })
            await redis.del('Buildings')
            const getAllBuilding = await axios.get(`${ERBIENBI_SERVER}/building`)
            await redis.set('Buildings', JSON.stringify(getAllBuilding.data))
            return {message:data}
        }
    }
}

module.exports = {
    schema,
    resolver
}
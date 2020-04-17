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

    extend type Query {
        getAllBuilding: [Building]
        getOneBuilding(id:Int): Building
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
            console.log(data)
            return data
        }
    }
}

module.exports = {
    schema,
    resolver
}
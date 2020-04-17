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

    type loginFeedback {
        token: String!
        user: userInfo!
    }

    type userInfo {
        id: Int!
        name: String!
        email: String!
    }

    type userProfile {
        name: String!
        email: String!
        phone: String
        KTP: String
        role: String
        RoomId: Int
    }




    extend type Query {
        getAllBuilding: [Building]
        getOneBuilding(id:Int): Building
        getOneUser(token:String): userProfile
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

        userLogin(
            email: String!
            password: String!
        ) : loginFeedback

        userRegister(
            name: String!
            email: String!
            password: String!
        ) : Message
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
        },

        //get specific user based on the ID got from the token
        getOneUser: async (_, args) => {
            const { token } = args
            const { data } = await axios({
                method:'GET',
                url: `${ERBIENBI_SERVER}/user`,
                headers: { token }
            })
            return data
        }
    },

    Mutation: {
        //posting new building (go through authentication as need token as the headers)
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

        //deleteing building, need authentication as only the owner of the building can delete the building
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
        },

        // handling user login
        userLogin: async (_, args) => {
            const { email, password } = args
            const { data } = await axios({
                method:'POST',
                url:`${ERBIENBI_SERVER}/user/login`,
                data: { email, password }
            })
            return data
        },

        //handling user register
        userRegister: async (_, args) => {
            const { name, email, password } = args
            const { data } = await axios({
                method:'POST',
                url:`${ERBIENBI_SERVER}/user/register`,
                data: { name, email, password }
            })
            return {message:data}
        }
    }
}

module.exports = {
    schema,
    resolver
}
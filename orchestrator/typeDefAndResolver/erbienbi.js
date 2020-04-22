const { gql } = require('apollo-server-express')
const Redis = require('ioredis')
const redis = new Redis()
const ERBIENBI_SERVER = 'https://enigmatic-inlet-64583.herokuapp.com'
const axios = require('axios')
const schema = gql`
    type Building {
        id: Int!
        name: String
        OwnerId: Int!
        area: String!
        address: String!
        coordinate: String!
        image: String
        Rooms: [Room]
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
        date_occupied: String
        image: String
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
    type ownerProfile {
        name: String!
        email: String!
        phone: String!
        ktp: String!
    }
    
    extend type Query {
        getAllBuilding: [Building!]!
        getOneBuilding(id:Int): Building!
        getOneUser(token:String): userProfile!
        getOneOwner(token:String) : ownerProfile!
        getAllRoom: [Room!]!
        getOneRoom(id:Int!): Room!
    }
    extend type Mutation {
        clean(
            token: String
        ) : Message
        postBuilding(
            token: String!
            name: String!
            area: String!
            address: String!
            coordinate: String!
            image: String
        ) : Message
        updateRoom(
            date_occupied: String!
            RoomId: Int!
            token: String!
        ) : Message
        postRoom(
            token: String!
            BuildingId:Int!
            price: Int!
            ac: Boolean
            bathroom: Boolean
            carPort: Boolean
            laundry: Boolean
            gender: String
            date_occupied: String
            image: String
        ) : Message
        deleteBuilding(
            token: String!
            id: Int!
        ): Message
        deleteRoom(
            token: String!
            BuildingId: Int!
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
        ownerRegister(
            name: String!
            email: String!
            password: String!
            phone: String!
            ktp: String!
        ) : Message
        ownerLogin(
            email: String!
            password: String
        ) : loginFeedback
    }
`
const resolver = {
    Query: {
        getAllBuilding: async () => {
            const cache = await redis.get('Buildings')
            if (cache) {
                const parsed = JSON.parse(cache)
                return parsed
            }
            const { data } = await axios.get(`${ERBIENBI_SERVER}/building`)
            await redis.set('Buildings', JSON.stringify(data))
            return data
        },
        getOneBuilding: async(_,args) => {
            const cache = await redis.get('Buildings')
            if (cache) {
                const parsed = JSON.parse(cache)
                const found = parsed.find(i => {
                    return i.id === args.id
                })
                return found
            }
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
        },
        //get specific user based on the ID got from the token
        getOneOwner: async (_, args) => {
            const { token } = args
            const { data } = await axios({
                method:'GET',
                url: `${ERBIENBI_SERVER}/owner`,
                headers: { token }
            })
            return data
        },
        //get all room that posted in the server
        getAllRoom: async (_, args) => {
            const cache = await redis.get('Rooms')
            if (cache) {
                const parsed = JSON.parse(cache)
                return parsed
            }
            const { data } = await axios.get(`${ERBIENBI_SERVER}/room`)
            await redis.set('Rooms', JSON.stringify(data))
            return data
        },
        //get specific room
        getOneRoom: async (_, args) => {
            const cache = await redis.get('Rooms')
            const parsed = JSON.parse(cache)
            if (cache) {
                const found = parsed.find(i => {
                    return i.id === args.id
                })
                console.log(found)
                return found
            }
            const { data } = await axios.get(`${ERBIENBI_SERVER}/room/${args.id}`)
            return data
        }
    },
    Mutation: {
        clean: async (_, args) => {
            console.log('ASLKASKJASLAKJS asklaskl;aks;laks;ask;lk')
            const message = 'success'
            await redis.del("Buildings");
            await redis.del("Rooms");
            const getAllBuilding = await axios.get(
              `${ERBIENBI_SERVER}/building`
            );
            const getAllRooms = await axios.get(`${ERBIENBI_SERVER}/room`)
            await redis.set("Buildings", JSON.stringify(getAllBuilding.data));
            await redis.set("Rooms", JSON.stringify(getAllRooms.data));
            return {message:message}
        },
        //posting new building (go through authentication as need token as the headers)
        postBuilding: async (_, args) => {
            const { name, area, coordinate, address, token, image } = args
            const newBuilding = {
                // OwnerId,
                name,
                area,
                coordinate,
                address,
                image
            }
            console.log(args)
            const { data } = await axios({
                method: 'POST',
                url: `${ERBIENBI_SERVER}/building`,
                headers: {token},
                data: newBuilding
            })
            await console.log(data)
            await redis.del('Buildings')
            const getAllBuilding = await axios.get(`${ERBIENBI_SERVER}/building`)
            await redis.set('Buildings', JSON.stringify(getAllBuilding.data))
            return {message:data}
        },
        //Add new room to the desired building (need building id as params) goes through authentication as only owner can add building
        postRoom: async (_, args) => {
            const { token, BuildingId, price, ac, bathroom, carPort, laundry, gender, image } = args
            const newRoom = { price, ac, bathroom, carPort, laundry, gender, image }
            console.log(args)
            const { data } = await axios({
                method:'POST',
                url:`${ERBIENBI_SERVER}/room/${BuildingId}`,
                headers: {token},
                data: newRoom
            })
            await redis.del('Rooms')
            await redis.del('Buildings')
            const getAllRooms = await axios.get(`${ERBIENBI_SERVER}/room`)
            const getAllBuilding = await axios.get(`${ERBIENBI_SERVER}/building`)
            await redis.set('Buildings', JSON.stringify(getAllBuilding.data))
            await redis.set('Rooms', JSON.stringify(getAllRooms.data))
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
        //updating room once the user book and paid the room
        updateRoom: async (_, args) => {
            console.log(args)
            const { date_occupied, RoomId, token } = args
            const { data } = await axios({
                method:'PUT',
                url:`${ERBIENBI_SERVER}/room/${RoomId}`,
                headers: {token},
                data: {
                    date_occupied
                }
            })
            await redis.del('Rooms')
            await redis.del('Buildings')
            const getAllRooms = await axios.get(`${ERBIENBI_SERVER}/room`)
            const getAllBuilding = await axios.get(`${ERBIENBI_SERVER}/building`)
            await redis.set('Buildings', JSON.stringify(getAllBuilding.data))
            await redis.set('Rooms', JSON.stringify(getAllRooms.data))
            return {message:data}
        },
        //deleting room in a certain building (need BuildingId as params) and goes through authentication, only owner of the building can delete the room
        deleteRoom: async (_, args) => {
            const { token, id, BuildingId } = args
            const { data } = await axios({
                method:'DELETE',
                url:`${ERBIENBI_SERVER}/room/${BuildingId}/${id}`,
                headers: {token}
            })
            await redis.del('Buildings')
            await redis.del('Rooms')
            const getAllRooms = await axios.get(`${ERBIENBI_SERVER}/room`)
            const getAllBuilding = await axios.get(`${ERBIENBI_SERVER}/building`)
            await redis.set('Buildings', JSON.stringify(getAllBuilding.data))
            await redis.set('Rooms', JSON.stringify(getAllRooms.data))
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
        },
        //handling owner register
        ownerRegister: async (_, args) => {
            const { name, email, password, phone, ktp } = args
            const { data } = await axios({
                method:'POST',
                url:`${ERBIENBI_SERVER}/owner/register`,
                data: { name, email, password, phone, ktp }
            })
            return {message:data}
        },
        //handling owner login
        ownerLogin: async (_, args) => {
            const { email, password } = args
            const { data } = await axios({
                method:'POST',
                url:`${ERBIENBI_SERVER}/owner/login`,
                data: { email, password }
            })
            return data
        }
    }
}
module.exports = {
    schema,
    resolver
}
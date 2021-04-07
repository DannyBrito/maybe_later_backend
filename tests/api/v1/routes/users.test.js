const request = require('supertest');
const dbHelper = require('../../../helpers/dbConnection');
const app = require('../../../../bin/app');
const USERS_BASE_ROUTE = '/api/v1/users';

const setup = async (...userObjects) =>{
    const userMap = userObjects.map(individualSetUp)
    const users = await Promise.all(userMap)
    users = users.sort((a,b) => a.id - b.id)
    return users
}

const individualSetUp = async(user) =>{
    const response = await request(app)
    .post(USERS_BASE_ROUTE)
    .send(user);
    return response.body
}

const formatObjectToCompare = (body) =>{
    delete body.id
    delete body.createdAt
    delete body.updatedAt
    delete body.password
}
describe('Testing USER Routes:',()=>{
    let dbConnection = null;

    const user1 = {
        "firstName":"Dan",
        "lastName":"Brito",
        "username":"danBrito",
        "password":"test"
    }
    const alterUser1 = {
        "firstName":"Tony",
        "lastName":"Johnson",
        "username":"tonyJohnson",
        "password":"test"
    }
    
    const similarUser1 = {
        "firstName":"Dan",
        "lastName":"Johnson",
        "username":"danBrito",
        "password":"test"
    }
    const user2 = {
        "firstName":"Alex",
        "lastName":"Rest",
        "username":"alexRest",
        "password":"test"
    }
    const user3 = {
        "firstName":"Ema",
        "lastName":"So",
        "username":"emaSo",
        "password":"test"
    }
    const user4 = {
        "firstName":"David",
        "lastName":"Clark",
        "username":"davidClark",
        "password":"test"
    }
    
    const deleteUsers = () => dbHelper.deleteUsers(dbConnection)
    
    beforeAll(async() =>{
        dbConnection = await dbHelper.connect()
    });
    
    afterAll(() => dbHelper.disconnect(dbConnection))
    
    
    test('GET /users without any existing user',async()=>{
        const res = await request(app).get(USERS_BASE_ROUTE)
        expect(res.statusCode).toBe(302)
        expect(res.body.records).toEqual([])
    })
    
    test('GET /users',async()=>{
        let result = await setup(user1,user2,user3,user4)
        const res = await request(app).get(USERS_BASE_ROUTE)
        expect(res.statusCode).toBe(302)
        expect(res.body.records).toEqual(result)
    })
    
    test('GET /users/:id', async()=>{
        await deleteUsers()
        const result = await individualSetUp(user1)
        const res = await request(app).get(USERS_BASE_ROUTE + '/' + result.id)
        expect(res.statusCode).toBe(302)
        expect(res.body).toEqual(result)
    })
    
    test('GET /users/:id with invalid ID', async()=>{
        await deleteUsers()
        const res = await request(app).get(USERS_BASE_ROUTE + '/' + '777')
        expect(res.statusCode).toBe(404)
        expect(res.body).toBe('User Not Found')
    })
    
    test('POST /users',async()=>{
        await deleteUsers()
        const tempUser = {...user2}
        const res = await request(app).post(USERS_BASE_ROUTE)
        .send(user2)

        formatObjectToCompare(res.body)
        formatObjectToCompare(tempUser)

        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(tempUser)
    })
    
    test('POST /users with invalid body',async()=>{
        await deleteUsers()
        const res = await request(app).post(USERS_BASE_ROUTE)
        .send({})
        expect(res.statusCode).toBe(400)
        // Type Error Could Change depending Validations or Restrictions
        expect(res.body.errorType).toBe('SequelizeValidationError')
    })
    
    test('POST /users with already created user',async()=>{
        await deleteUsers()
        const result = await individualSetUp(user1)
        const res = await request(app).post(USERS_BASE_ROUTE)
        .send(user1)
        expect(res.statusCode).toBe(400)
        expect(res.body.errorType).toBe('SequelizeUniqueConstraintError')
    })
    
    test('PUT /users/:id update User (all fields)',async()=>{
        await deleteUsers()
        const result = await individualSetUp(user1)
        const tempUser = {...alterUser1}
        const res = await request(app).put(USERS_BASE_ROUTE + '/' + result.id)
        .send(tempUser)
        formatObjectToCompare(res.body)
        formatObjectToCompare(tempUser)
        expect(res.statusCode).toBe(202)
        expect(res.body).toEqual(tempUser)
    })
    
    test('PUT /users/:id update User (some fields)',async()=>{
        await deleteUsers()
        const result = await individualSetUp(user1)
        const tempUser = {...similarUser1}
        const res = await request(app).put(USERS_BASE_ROUTE + '/' + result.id)
        .send({"lastName":"Johnson"})
        formatObjectToCompare(res.body)
        formatObjectToCompare(tempUser)
        expect(res.statusCode).toBe(202)
        expect(res.body).toEqual(tempUser)
    })
})
const request = require('supertest');
const dbHelper = require('../../../helpers/dbConnection');
const app = require('../../../../bin/app');
const USERS_BASE_ROUTE = '/api/v1/users';

const setup = async (...userObjects) =>{
    const userMap = userObjects.map(individualSetUp)
    const users = await Promise.all(userMap)
    return users
}

const individualSetUp = async(user) =>{
    const response = await request(app)
    .post(USERS_BASE_ROUTE)
    .send(user);
    return response.body
}

describe('Testing USER Routes:',()=>{
    let dbConnection = null;

    const user1 = {
        "firstName":"Dan",
        "lastName":"Brito",
        "username":"danBrito"
    }
    const user2 = {
        "firstName":"Alex",
        "lastName":"Rest",
        "username":"alexRest"
    }
    const user3 = {
        "firstName":"Ema",
        "lastName":"So",
        "username":"emaSo"
    }
    const user4 = {
        "firstName":"David",
        "lastName":"Clark",
        "username":"davidClark"
    }

    beforeAll(async() =>{
        dbConnection = await dbHelper.connect()
    });
    
    afterAll(() => dbHelper.disconnect(dbConnection))
      
    
    test('GET /users without any existing user',async()=>{
        const res = await request(app).get(USERS_BASE_ROUTE)
        expect(res.statusCode).toBe(302)
        expect(res.body).toEqual([])
    })

    test('GET /users',async()=>{
        const result = await setup(user1,user2,user3,user4)
        const res = await request(app).get(USERS_BASE_ROUTE)
        expect(res.statusCode).toBe(302)
        expect(res.body).toEqual(result)
    })

    test('GET /users/:id', async()=>{
        await dbConnection.models.User.deleteAll()
        const result = await individualSetUp(user1)
        const res = await request(app).get(USERS_BASE_ROUTE + '/' + result.id)
        // console.log(res)
    })
})
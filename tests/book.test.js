const request = require('supertest');
const {Book} = require('../models/book');
let server;

describe('Book',()=>{
    let book = new Book({
        author:"JK Rowking",
        title:"Harry Potter"
    });
    let book1 = new Book({
        author:"JK Rowking",
        title:"Harry Potter",
        genre:"Magical"
    });

    beforeEach(()=>{
        server = require("../index");
    })
    afterEach(()=>{
        server.close();
    })
    it('should return a error if book not suitable',async()=>{
        const res = await request(server)
        .post('/books')
        .send({book});
        expect(res.status).toBe(200)
    })
    it('should return a book if valid request',async()=>{
        const res = await request(server)
            .post('/books')
            .send({book1});
        //erver could not find what was requested
        expect(res.status).toBe(200);
    })
});
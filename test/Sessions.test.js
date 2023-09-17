import chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')


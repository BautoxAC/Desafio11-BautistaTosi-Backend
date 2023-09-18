import chai from 'chai'
import supertest from 'supertest'
import { fakerES } from '@faker-js/faker'
import { describe, it } from 'mocha'
const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('ENDPOINT /auth', function () {
  let sessionUser
  const mockUser = {
    email: fakerES.internet.email(),
    firstName: fakerES.person.firstName(),
    lastName: fakerES.person.lastName(),
    age: fakerES.number.int({ min: 18, max: 65 }),
    password: fakerES.internet.password()
  }
  it('POST de un usuario (register)', async function () {
    this.timeout(5000)
    const response = await requester.post('/auth/register').send(mockUser)
    sessionUser = response.headers['set-cookie'][0]
    expect(sessionUser).to.be.ok
    const { status } = response
    expect(status).to.equal(302)
  })
  it('POST de un usuario (login)', async function () {
    this.timeout(5000)
    const response = await requester.post('/auth/login').send({ email: sessionUser.email, password: mockUser.password })
    const { status } = response
    expect(status).to.equal(302)
  })
  it('GET de un usuario', async function () {
    this.timeout(5000)
    const response = await requester.get('/auth/perfil').set('Cookie', [sessionUser])
    const { status, _body } = response
    expect(status).to.equal(200)
  })
})

import chai from 'chai'
import supertest from 'supertest'
import { describe, it } from 'mocha'
const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('ENDPONT /api/carts', function () {
  let cart
  it('POST de un carrito', async function () {
    this.timeout(5000)
    const response = await requester.post('/api/carts')
    const { status, _body } = response
    expect(status).to.equal(200)
    expect(_body).to.have.property('data')
    expect(_body.data).to.have.property('_id')
    expect(_body.status).to.equal('success')
    cart = _body.data
  })
  it('GET de un carrito por id', async function () {
    this.timeout(5000)
    const response = await requester.get(`/api/carts/${cart._id}`)
    const { status, _body } = response
    expect(status).to.equal(200)
    expect(_body).to.have.property('status')
    expect(_body.status).to.equal('success')
    expect(_body).to.have.property('data')
    expect(_body.data).to.be.an('object')
    expect(_body.data).to.not.be.an('array')
    expect(_body.data.data).to.be.an('object')
    expect(_body.data.data).to.not.be.an('array')
    expect(_body.data.data).to.have.property('_id')
    expect(_body.data.data).to.have.property('products')
    expect(_body.data.data.products).to.be.an('array')
  })
  it('DELETE de un carrito', async function () {
    this.timeout(5000)
    const response = await requester.delete(`/api/carts/${cart._id}`)
    const { status, _body } = response
    expect(status).to.equal(200)
    expect(_body).to.have.property('data')
    expect(_body.data).to.have.property('_id')
    expect(_body.status).to.equal('success')
  })
})

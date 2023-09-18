import chai from 'chai'
import supertest from 'supertest'
import { fakerES } from '@faker-js/faker'
import { describe, it } from 'mocha'

const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('ENDPONT /api/products', function () {
  it('GET de todos los productos', async function () {
    this.timeout(5000)
    const response = await requester.get('/api/products')
    const { status, _body } = response
    expect(status).to.equal(200)
    expect(_body).to.have.property('payload')
    expect(_body).to.have.property('status')
    expect(_body.payload).to.be.an('array')
    expect(_body.status).to.equal('success')
    _body.payload.forEach((elemento) => {
      expect(elemento).to.have.property('_id')
    })
  })
  it('POST de un producto', async function () {
    this.timeout(5000)
    const Mockproduct = {
      title: fakerES.commerce.product(),
      description: fakerES.commerce.productDescription(),
      code: fakerES.database.mongodbObjectId(),
      stock: fakerES.finance.amount(),
      price: fakerES.commerce.price(),
      status: fakerES.datatype.boolean(),
      category: fakerES.commerce.productAdjective()
    }
    const response = await requester.post('/api/products')
      .field('title', Mockproduct.title)
      .field('description', Mockproduct.description)
      .field('code', Mockproduct.code)
      .field('stock', Mockproduct.stock)
      .field('price', Mockproduct.price)
      .field('category', Mockproduct.category)
      .attach('file', './test/productoImagenPrueba.avif')
    const { status } = response
    expect(status).to.equal(302)
  })
  it('GET de un producto por id', async function () {
    this.timeout(5000)
    const response = await requester.get('/api/products/65079ec808b05611619ef775')
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
  })
})

import chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import { describe, it } from 'mocha'

const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('Testing Products router', () => {
  // ENDPOINT ADPTION
  describe('ENDPONT /api/products', () => {
    describe('ENDPONT /api/products', function () {
      it('GET De todos los productos', async function () {
        this.timeout(5000)
        const response = await requester.get('/api/products')
        const { status, _body } = response
        expect(status).to.equal(200)
        expect(_body).to.have.property('payload')
        expect(_body).to.have.property('status')
        expect(_body.payload).to.be.an('array')
        expect(_body.status).to.equal('success')
      })
    })
    /*
    it('cuando posteo una pet sin el campo name debe devolver status 400', async () => {
      const petMock = {
        specie: 'cat',
        birthDate: '10-12-2020'
      }
      const response = await requester.post('/api/pets').send(petMock)
      const { status, ok, _body } = response
      expect(status).to.equal(400)
    })

    it('Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo', async () => {
      const response = await requester.get('/api/pets')
      const { status, ok, _body } = response
      expect(_body).to.have.property('payload')
      expect(_body).to.have.property('status')
      expect(_body.payload).to.be.an('array')
    })
    it('test01', async () => {
      const petMockUpdate = {
        name: 'GuilleUpadated',
        specie: 'foxter',
        birthDate: '10-10-2024'
      }
      const response = await requester.put('/api/pets/64ffaf1d32f53817f7872ef5').send(petMockUpdate)
      const { status, ok, _body } = response
      expect(_body).to.have.property('status')
      expect(_body.status).to.equal('success')
    })
    it('El método DELETE debe poder borrar la última mascota agregada, ésto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota  con el DELETE, y luego corroborar si la mascota existe con un GET', async () => {
      const petMock = {
        name: 'GuilleUpadated23',
        specie: 'foxter',
        birthDate: '10-10-2025'
      }
      const response = await requester.post('/api/pets').send(petMock)
      const { status, ok, _body } = response
      expect(_body).to.have.property('status')
      expect(status).to.equal(200)
      expect(_body.payload).to.have.property('_id')
      const id = _body.payload._id
      const responseDelete = await requester.delete(`/api/pets/${id}`)
      const { status: statusDelete } = responseDelete
      expect(statusDelete).to.equal(200)
      const responseAllProduct = await requester.get('/api/pets')
      const { status: responseAllProductStatus, _body: responseAllProductBody } = responseAllProduct
      expect(responseAllProductStatus).to.equal(200)
      expect(_body).to.have.property('payload')
      expect(responseAllProductBody.payload.find(pro => pro._id === id)).to.be.an('undefined')
    }) */
  })
})

import assert from 'assert'
import Immutable from 'immutable'

describe('(Framework) Karma Plugins', () => {
  it('Should expose "expect" globally.', () => {
    assert.ok(expect)
  })

  it('Should expose "should" globally.', () => {
    assert.ok(should)
  })

  it('Should have chai-as-promised helpers.', () => {
    const pass = new Promise(res => res('test'))
    const fail = new Promise((res, rej) => rej())

    return Promise.all([
      expect(pass).to.be.fulfilled,
      expect(fail).to.not.be.fulfilled
    ])
  })

  describe('Should have chai-immutable helpers', () => {
    it('can compare objects', function () {
      let a = Immutable.Map({key: 'value'}),
          b = a.merge({key: 'value'}),
          c = a.merge({key: 'other value'})

      a.should.equal(b)
      a.should.not.equal(c)
    })

    it('can check if an Immutable is empty', () => {
      Immutable.List().should.be.empty
    })
  })
})

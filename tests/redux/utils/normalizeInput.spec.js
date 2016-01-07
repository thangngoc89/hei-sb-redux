import { normalizePhone } from 'redux/utils/normalizeInput'

describe('(redux-utils) normalize input', () => {
  describe('normalizePhone', () => {
    let value, expected
    it('should exits', () => {
      expect(normalizePhone).to.be.ok
    })

    it('should return empty string when given one', () => {
      value = ''
      expect(normalizePhone(value)).to.deep.equal(value)
    })

    describe('typing forward', () => {
      it('should return original number when length < 4', () => {
        value = '012'
        expect(normalizePhone(value)).to.deep.equal(value)
      })

      it('should add space when length = 4', () => {
        value = '0123'
        expected = '0123 '
        expect(normalizePhone(value)).to.deep.equal(expected)
      })

      it('should sperate the first 4 digits when 4 < length < 7', () => {
        value = '01234'
        expected = '0123 4'
        expect(normalizePhone(value)).to.deep.equal(expected)

        value = '012345'
        expected = '0123 45'
        expect(normalizePhone(value)).to.deep.equal(expected)
      })

      it('should add second space when length = 7', () => {
        value = '0123456'
        expected = '0123 456 '
        expect(normalizePhone(value)).to.deep.equal(expected)
      })
    })

    it('should handle 10 digits phone number', () => {
      value = '0123456789'
      expected = '0123 456 789'
      expect(normalizePhone(value, value)).to.deep.equal(expected)
    })

    it('should handle 11 digits phone number', () => {
      value = '01234567890'
      expected = '0 1234 567 890'
      expect(normalizePhone(value, value)).to.deep.equal(expected)
    })

  })
})

import { isValidDate, isValidSSN } from '../../../../_health-care/_js/utils/validations.js';

describe('Validations unit tests', () => {
  describe('isValidSSN', () => {
    it('accepts ssns of the right one including "invalid" test ones', () => {
      expect(isValidSSN('111-22-1234')).to.be.true;

      // SSNs have certain invalid versions. These are useful for tests so not
      // the validation should return TRUE for them.
      //
      // For information on invalid values see:
      //   https://secure.ssa.gov/poms.nsf/lnx/0110201035
      expect(isValidSSN('000-22-1234')).to.be.true;
      expect(isValidSSN('666-22-1234')).to.be.true;
      expect(isValidSSN('900-22-1234')).to.be.true;
      expect(isValidSSN('111-00-1234')).to.be.true;
      expect(isValidSSN('111-22-0000')).to.be.true;
    });

    it('rejects invalid ssn format', () => {
      // Disallow empty.
      expect(isValidSSN('')).to.be.false;

      // Invalid characters.
      expect(isValidSSN('111-22-1%34')).to.be.false;
      expect(isValidSSN('111-22-1A34')).to.be.false;
      expect(isValidSSN('hi mom')).to.be.false;

      // No leading or trailing spaces.
      expect(isValidSSN('111-22-1A34 ')).to.be.false;
      expect(isValidSSN(' 111-22-1234')).to.be.false;

      // Dashes are required.
      expect(isValidSSN('111221234')).to.be.false;

      // Too few numbers is invalid.
      expect(isValidSSN('111-22-123')).to.be.false;
    });
  });

  describe('isValidDate', () => {
    it('validate february separately cause its a special snowflake', () => {
      // 28 should work always.
      expect(isValidDate(28, 2, 2015)).to.be.true;

      // 2015 is not a leap year.
      expect(isValidDate(29, 2, 2015)).to.be.false;

      // 2016 is a leap year.
      expect(isValidDate(29, 2, 2016)).to.be.true;

      // 30 is always bad.
      expect(isValidDate(30, 2, 2016)).to.be.false;

      // 1 is always fine.
      expect(isValidDate(1, 2, 2016)).to.be.true;

      // 0 is always bad.
      expect(isValidDate(0, 2, 2016)).to.be.false;
    });
  });
});
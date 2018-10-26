const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var res = isRealString(99);

    expect(res).toBe(false);
  });
  it('should reject string wwith only spaces', () => {
    var res = isRealString('  ');

    expect(res).toBe(false);
  });
  it('should allow string with non-spaces characters', () => {
    var res = isRealString(' mohamed ');

    expect(res).toBe(true);
  });
});

describe('non-empty-placeholder', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('non-empty-placeholder');
  let checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true if a placeholder is present', function () {
    let params = checkSetup('<input id="target" placeholder="woohoo" />');

    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if a placeholder is not present', function () {
    let params = checkSetup('<input id="target" />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'noAttr');
  });

  it('should return false if a placeholder is present, but empty', function () {
    let params = checkSetup('<input id="target" placeholder=" " />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });

  it('should collapse whitespace', function () {
    let params = checkSetup(
      '<input id="target" placeholder=" \t \n \r \t  \t\r\n " />'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });
});

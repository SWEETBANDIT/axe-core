describe('unique-frame-title', function () {
  'use strict';

  let checkContext = axe.testUtils.MockCheckContext();
  let queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    checkContext.reset();
  });

  it('should log title to data and return true', function () {
    let vNode = queryFixture('<iframe id="target" title="bananas"></iframe>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('unique-frame-title')
        .call(checkContext, null, {}, vNode)
    );
    assert.equal(checkContext._data, 'bananas');
  });

  it('should convert text to lower case', function () {
    let vNode = queryFixture(
      '<iframe id="target" title="\t  app\t \n \rle  "></iframe>'
    );
    axe.testUtils
      .getCheckEvaluate('unique-frame-title')
      .call(checkContext, null, {}, vNode);
    assert.equal(checkContext._data, 'app le');
  });

  it('should take out space differences', function () {
    let vNode = queryFixture('<iframe id="target" title="APPLE"></iframe>');
    axe.testUtils
      .getCheckEvaluate('unique-frame-title')
      .call(checkContext, null, {}, vNode);
    assert.equal(checkContext._data, 'apple');
  });
});

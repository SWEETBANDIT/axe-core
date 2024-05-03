describe('header-present', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let checkContext = axe.testUtils.MockCheckContext();
  let shadowCheckSetup = axe.testUtils.shadowCheckSetup;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should return true if h1-h6 is found', function () {
    let params = checkSetup('<h1 id="target">Hi</h1>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('header-present')
        .apply(checkContext, params)
    );

    params = checkSetup('<h2 id="target">Hi</h2>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('header-present')
        .apply(checkContext, params)
    );

    params = checkSetup('<h3 id="target">Hi</h3>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('header-present')
        .apply(checkContext, params)
    );

    params = checkSetup('<h4 id="target">Hi</h4>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('header-present')
        .apply(checkContext, params)
    );

    params = checkSetup('<h5 id="target">Hi</h5>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('header-present')
        .apply(checkContext, params)
    );

    params = checkSetup('<h6 id="target">Hi</h6>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('header-present')
        .apply(checkContext, params)
    );
  });

  it('should return true if role=heading is found', function () {
    let params = checkSetup('<div role="heading" id="target">Hi</div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('header-present')
        .apply(checkContext, params)
    );
  });

  it('should otherwise return false', function () {
    let params = checkSetup('<p id="target">Some stuff and stuff</p>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('header-present')
        .apply(checkContext, params)
    );
  });

  it('should return false if heading has a different role', function () {
    let params = checkSetup(
      '<h1 role="none" id="target">Some stuff and stuff</h1>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('header-present')
        .apply(checkContext, params)
    );
  });

  (shadowSupported ? it : xit)(
    'should return true if heading is in shadow dom',
    function () {
      let params = shadowCheckSetup('<div id="target"><div>', '<h1></h1>');
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('header-present')
          .apply(checkContext, params)
      );
    }
  );
});

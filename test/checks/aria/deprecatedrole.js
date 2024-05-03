describe('deprecatedrole', function () {
  'use strict';

  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('deprecatedrole');
  afterEach(function () {
    checkContext.reset();
    axe.reset();
  });

  it('returns true if applied to a deprecated role', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          melon: {
            type: 'widget',
            deprecated: true
          }
        }
      }
    });
    let params = checkSetup('<div id="target" role="melon">Contents</div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'melon');
  });

  it('returns true if applied to a deprecated DPUB role', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          'doc-fizzbuzz': {
            type: 'widget',
            deprecated: true
          }
        }
      }
    });
    let params = checkSetup(
      '<div id="target" role="doc-fizzbuzz">Contents</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'doc-fizzbuzz');
  });

  it('returns false if applied to a non-deprecated role', function () {
    let params;

    params = checkSetup('<div id="target" role="button">Contents</div>');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);

    params = checkSetup('<button id="target">Contents</button>');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('returns false if applied to an invalid role', function () {
    let params = checkSetup('<input id="target" role="foo">');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  describe('with fallback roles', function () {
    it('returns true if the deprecated role is the first valid role', function () {
      axe.configure({
        standards: {
          ariaRoles: {
            melon: {
              type: 'widget',
              deprecated: true
            }
          }
        }
      });
      let params = checkSetup(
        '<div id="target" role="foo widget melon button">Contents</div>'
      );
      assert.isTrue(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, 'melon');
    });

    it('returns false if the deprecated role is not the first valid role', function () {
      axe.configure({
        standards: {
          ariaRoles: {
            melon: {
              type: 'widget',
              deprecated: true
            }
          }
        }
      });
      let params = checkSetup(
        '<div id="target" role="button melon widget">Contents</div>'
      );
      assert.isFalse(checkEvaluate.apply(checkContext, params));
      assert.isNull(checkContext._data);
    });
  });
});

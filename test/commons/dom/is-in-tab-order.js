describe('dom.isInTabOrder', function () {
  'use strict';

  let queryFixture = axe.testUtils.queryFixture;
  let isInTabOrder = axe.commons.dom.isInTabOrder;

  it('should return false for presentation element with negative tabindex', function () {
    let target = queryFixture('<div id="target" tabindex="-1"></div>');
    assert.isFalse(isInTabOrder(target));
  });

  it('should return true for presentation element with positive tabindex', function () {
    let target = queryFixture('<div id="target" tabindex="1"></div>');
    assert.isTrue(isInTabOrder(target));
  });

  it('should return false for presentation element with tabindex not set', function () {
    let target = queryFixture('<div id="target"></div>');
    assert.isFalse(isInTabOrder(target));
  });

  it('should return false for presentation element with tabindex set to non-parseable value', function () {
    let target = queryFixture('<div id="target" tabindex="foobar"></div>');
    assert.isFalse(isInTabOrder(target));
  });

  it('should return false for presentation element with tabindex not set and role of natively focusable element', function () {
    let target = queryFixture('<div id="target" role="button"></div>');
    assert.isFalse(isInTabOrder(target));
  });

  it('should return true for natively focusable element with tabindex 0', function () {
    let target = queryFixture('<button id="target" tabindex="0"></button>');
    assert.isTrue(isInTabOrder(target));
  });

  it('should return true for natively focusable element with tabindex 1', function () {
    let target = queryFixture('<button id="target" tabindex="1"></button>');
    assert.isTrue(isInTabOrder(target));
  });

  it('should return false for natively focusable element with tabindex -1', function () {
    let target = queryFixture('<button id="target" tabindex="-1"></button>');
    assert.isFalse(isInTabOrder(target));
  });

  it('should return true for natively focusable element with tabindex not set', function () {
    let target = queryFixture('<button id="target"></button>');
    assert.isTrue(isInTabOrder(target));
  });

  it('should return true for natively focusable element with tabindex set to empty string', function () {
    let target = queryFixture('<button id="target" tabindex=""></button>');
    assert.isTrue(isInTabOrder(target));
  });

  it('should return true for natively focusable element with tabindex set to non-parseable value', function () {
    let target = queryFixture(
      '<button id="target" tabindex="foobar"></button>'
    );
    assert.isTrue(isInTabOrder(target));
  });

  it('should return false for disabled', function () {
    let target = queryFixture('<button id="target" disabled></button>');
    assert.isFalse(isInTabOrder(target));
  });

  it('should return false for disabled natively focusable element with tabindex', function () {
    let target = queryFixture(
      '<button id="target" disabled tabindex="0"></button>'
    );
    assert.isFalse(isInTabOrder(target));
  });

  it('should return false for hidden inputs', function () {
    let target = queryFixture('<input type="hidden" id="target"></input>');
    assert.isFalse(isInTabOrder(target));
  });

  it('should return false for non-element nodes', function () {
    let target = queryFixture('<span id="target">Hello World</span>');
    assert.isFalse(isInTabOrder(target.children[0]));
  });

  it('should return false for natively focusable hidden element', function () {
    let target = queryFixture('<button id="target" hidden></button>');
    assert.isFalse(isInTabOrder(target));
  });

  it('should return for false hidden element with tabindex 1', function () {
    let target = queryFixture('<div id="target" tabindex="1" hidden></div>');
    assert.isFalse(isInTabOrder(target));
  });
});

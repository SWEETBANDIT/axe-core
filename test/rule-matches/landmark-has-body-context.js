describe('landmark-has-body-context', function () {
  'use strict';
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let rule;
  let shadowSupport = axe.testUtils.shadowSupport.v1;

  beforeEach(function () {
    rule = axe.utils.getRule('landmark-banner-is-top-level');
  });

  it('returns true for elements with a role', function () {
    fixtureSetup('<main><footer role="contentinfo"></footer></main>');

    let vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true for elements not contained in a landmark', function () {
    fixtureSetup('<div><footer role="contentinfo"></footer></div>');

    let vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns false for elements contained in a landmark', function () {
    fixtureSetup('<main><footer></footer></main>');

    let vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  (shadowSupport ? it : xit)(
    'returns false for elements contained in a landmark in a shadow DOM tree',
    function () {
      // Safari has a bug in 12.0 that throws an error when calling
      // attachShadow on <main>
      // @see https://bugs.webkit.org/show_bug.cgi?id=197726
      let article = document.createElement('article');
      let shadow = article.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<footer></footer>';

      fixtureSetup(article);
      let vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
      assert.isFalse(rule.matches(vNode.actualNode, vNode));
    }
  );
});

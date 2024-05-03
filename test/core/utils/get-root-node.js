function makeShadowTreeGRN(node) {
  'use strict';
  let root = node.attachShadow({ mode: 'open' });
  let div = document.createElement('div');
  div.className = 'parent';
  root.appendChild(div);
}

describe('axe.utils.getRootNode', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupported = axe.testUtils.shadowSupport.v1;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return the document when the node is just a normal node', function () {
    fixture.innerHTML = '<div id="target"></div>';
    let node = document.getElementById('target');
    assert.isTrue(axe.utils.getRootNode(node) === document);
  });
  it('should return the document when the node is disconnected', function () {
    let node = document.createElement('div');
    assert.isTrue(axe.utils.getRootNode(node) === document);
  });
  (shadowSupported ? it : xit)(
    'should return the shadow root when it is inside the shadow DOM',
    function () {
      let shadEl;
      // shadow DOM v1 - note: v0 is compatible with this code, so no need
      // to specifically test this
      fixture.innerHTML = '<div></div>';
      makeShadowTreeGRN(fixture.firstChild);
      shadEl = fixture.firstChild.shadowRoot.querySelector('div');
      assert.isTrue(axe.utils.getRootNode(shadEl) !== document);
      assert.isTrue(
        axe.utils.getRootNode(shadEl) === fixture.firstChild.shadowRoot
      );
    }
  );
});

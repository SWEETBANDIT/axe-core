describe('role-img-alt virtual-rule', function () {
  it('should pass for aria-label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'img',
        'aria-label': 'foobar'
      }
    });

    let results = axe.runVirtualRule('role-img-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'img',
        'aria-labelledby': 'foobar'
      }
    });

    let results = axe.runVirtualRule('role-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'img',
        title: 'foobar'
      }
    });

    // children are required since titleText comes after subtree text
    // in accessible name calculation
    node.children = [];

    let results = axe.runVirtualRule('role-img-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label contains only whitespace', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'img',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('role-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'img',
        'aria-label': ''
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('role-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'img',
        title: ''
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('role-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});

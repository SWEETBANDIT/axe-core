describe('landmark-is-unique-after', function () {
  'use strict';

  let checkContext = axe.testUtils.MockCheckContext();
  function createResult(result, data) {
    return {
      result: result,
      data: data
    };
  }

  function createResultWithSameRelatedNodes(result, data) {
    return Object.assign(createResult(result, data), {
      relatedNodes: [createResult(result, data)]
    });
  }

  function createResultWithProvidedRelatedNodes(result, data, relatedNodes) {
    return Object.assign(createResult(result, data), {
      relatedNodes: relatedNodes
    });
  }

  afterEach(function () {
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should update duplicate landmarks with failed result', function () {
    let result = checks['landmark-is-unique'].after([
      createResultWithSameRelatedNodes(true, {
        role: 'some role',
        accessibleText: 'some accessibleText'
      }),
      createResultWithSameRelatedNodes(true, {
        role: 'some role',
        accessibleText: 'some accessibleText'
      }),
      createResultWithSameRelatedNodes(true, {
        role: 'different role',
        accessibleText: 'some accessibleText'
      }),
      createResultWithSameRelatedNodes(true, {
        role: 'some role',
        accessibleText: 'different accessibleText'
      })
    ]);

    let expectedResult = [
      createResultWithProvidedRelatedNodes(
        false,
        {
          role: 'some role',
          accessibleText: 'some accessibleText'
        },
        [
          createResult(true, {
            role: 'some role',
            accessibleText: 'some accessibleText'
          })
        ]
      ),
      createResultWithProvidedRelatedNodes(
        true,
        {
          role: 'different role',
          accessibleText: 'some accessibleText'
        },
        []
      ),
      createResultWithProvidedRelatedNodes(
        true,
        {
          role: 'some role',
          accessibleText: 'different accessibleText'
        },
        []
      )
    ];
    assert.deepEqual(result, expectedResult);
  });
});

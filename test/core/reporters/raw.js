describe('reporters - raw', function () {
  'use strict';

  let fixture = document.getElementById('fixture');

  function createDqElement() {
    let node = document.createElement('div');
    fixture.appendChild(node);
    return new axe.utils.DqElement(node);
  }

  let runResults;

  beforeEach(function () {
    runResults = [
      {
        id: 'gimmeLabel',
        helpUrl: 'things',
        description: 'something nifty',
        tags: ['tag1'],
        result: 'passed',
        violations: [],
        passes: [
          {
            result: 'passed',
            any: [
              {
                result: true,
                data: 'minkey',
                relatedNodes: []
              }
            ],
            all: [],
            none: [],
            node: createDqElement()
          }
        ]
      },
      {
        id: 'idkStuff',
        description: 'something more nifty',
        pageLevel: true,
        result: 'failed',
        impact: 'cats',
        tags: ['tag2'],
        passes: [],
        violations: [
          {
            result: 'failed',
            all: [
              {
                result: false,
                data: 'pillock',
                impact: 'cats',
                relatedNodes: []
              }
            ],
            any: [],
            none: [],
            node: createDqElement(),
            impact: 'cats'
          }
        ]
      },
      {
        id: 'bypass',
        description: 'something even more nifty',
        tags: ['tag3'],
        impact: 'monkeys',
        result: 'failed',
        passes: [],
        violations: [
          {
            result: 'failed',
            impact: 'monkeys',
            none: [
              {
                data: 'foon',
                impact: 'monkeys',
                result: true,
                relatedNodes: []
              }
            ],
            any: [],
            all: [],
            node: createDqElement()
          }
        ]
      },
      {
        id: 'blinky',
        description: 'something awesome',
        tags: ['tag4'],
        violations: [],
        result: 'passed',
        passes: [
          {
            result: 'passed',
            any: [],
            all: [],
            none: [
              {
                data: 'clueso',
                result: true,
                relatedNodes: []
              }
            ],
            node: createDqElement()
          }
        ]
      }
    ];

    axe.testUtils.fixtureSetup();

    axe._load({});
    axe._cache.set('selectorData', {});
  });

  afterEach(function () {
    fixture.innerHTML = '';
    sinon.restore();
  });

  it('should serialize DqElements', function (done) {
    axe.getReporter('rawEnv')(runResults, {}, function (results) {
      for (let i = 0; i < results.length; i++) {
        let result = results[i];
        for (let j = 0; j < result.passes.length; j++) {
          let p = result.passes[j];
          assert.notInstanceOf(p.node, axe.utils.DqElement);
        }
      }
      done();
    });
  });

  it('does not throw on serialized nodes', function (done) {
    let rawReporter = axe.getReporter('rawEnv');
    rawReporter(runResults, {}, function (serializedResults) {
      assert.doesNotThrow(function () {
        rawReporter(serializedResults, {}, function () {
          done();
        });
      });
    });
  });

  it('uses nodeSerializer', done => {
    let rawReporter = axe.getReporter('raw');
    let spy = sinon.spy(axe.utils.nodeSerializer, 'mapRawNodeResults');
    rawReporter(
      runResults,
      {},
      function () {
        assert.isTrue(spy.called);
        done();
      },
      done
    );
  });
});

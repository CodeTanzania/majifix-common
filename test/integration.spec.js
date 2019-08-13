import { ObjectId } from '@lykmapipo/mongoose-common';
import {
  expect,
  clear,
  create,
  createTestModel,
} from '@lykmapipo/mongoose-test-helpers';
import {
  // utilities
  checkDependenciesFor,
} from '../src';

describe('integration', () => {
  before(done => clear(done));

  const Guardian = createTestModel({}, { modelName: 'Guardian' });
  const Child = createTestModel(
    {
      father: { type: ObjectId, ref: Guardian.modelName },
    },
    { modelName: 'Child' }
  );

  const father = Guardian.fake();
  const child = Child.fake();
  child.father = father;

  before(done => create(father, child, done));

  it('should check dependency for parent without options', done => {
    checkDependenciesFor(father, {}, error => {
      expect(error).to.not.exist;
      done(error);
    });
  });

  it('should check for self dependencies', done => {
    const options = { path: 'father', dependencies: [Guardian.modelName] };
    checkDependenciesFor(father, options, error => {
      expect(error).to.not.exist;
      done(error);
    });
  });

  it('should check for child dependencies', done => {
    const options = { path: 'father', dependencies: [Child.modelName] };
    checkDependenciesFor(father, options, error => {
      expect(error).to.exist;
      expect(error.message).to.contain('Fail to Delete');
      done();
    });
  });

  after(done => clear(done));
});

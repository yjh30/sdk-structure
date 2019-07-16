// eslint-disable-next-line import/no-unresolved
import moduleB from 'packages/module-b';

export default () => {
  console.log('module-a');
  moduleB();
};

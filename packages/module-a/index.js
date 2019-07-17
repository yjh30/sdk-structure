// eslint-disable-next-line import/no-unresolved
import moduleB from 'module-b-11';

export default () => {
  console.log('module-a');
  moduleB();
};

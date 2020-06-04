import * as _ from 'lodash';

const debounce = (onPressFunction = () => {}, debounceTime = 300) => _.debounce(onPressFunction, debounceTime, {
  leading: true,
  trailing: false,
});

export default debounce;

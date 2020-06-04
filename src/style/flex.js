import { StyleSheet } from 'react-native';

const flex = (direction = 'row', justifyContent = 'center', alignItems = 'center', alignContent = 'center') => StyleSheet.create({
  custom: {
    flex: 1,
    flexDirection: direction,
    justifyContent,
    alignItems,
    alignContent,
  },
});

export default flex;

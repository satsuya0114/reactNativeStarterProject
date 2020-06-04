import { StyleSheet } from 'react-native';

const commonStyle = StyleSheet.create({
  centerRowContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerColumnContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 15,
  },
  columnContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainContainer: { // use in outer view : SafeAreaView
    flex: 1,
  },
  scrollContentCenter: { // use in ScrollView "contentContainerStyle" for justifyContent center
    flexGrow: 1,
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default commonStyle;

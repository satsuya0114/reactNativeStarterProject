import { StyleSheet } from 'react-native';

const modalStyle = StyleSheet.create({
  default: { // set inside the modal View
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  fullScreenModalStyle: {
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
    // set flex 1 inside the modal View
    alignItems: undefined,
    justifyContent: undefined,
  },
});

export default modalStyle;

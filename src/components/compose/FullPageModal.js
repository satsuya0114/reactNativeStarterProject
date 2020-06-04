import React from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'native-base';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { modalStyle } from '~style/';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  closeField: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    paddingRight: 10,
  },
});

const FullPageModal = (props) => {
  const { visible, pressClose, children } = props;
  return (
    <Modal
      isVisible={visible}
      style={modalStyle.fullScreenModalStyle}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.closeField}>
          <TouchableOpacity onPress={pressClose}>
            <Icon name="close" type="EvilIcons" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        {children}
      </SafeAreaView>
    </Modal>
  );
};

FullPageModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  pressClose: PropTypes.func.isRequired,
};

FullPageModal.defaultProps = {
};

export default FullPageModal;

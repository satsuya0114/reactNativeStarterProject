import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from 'react-native-elements';
import styled from 'styled-components/native';
import { FullPagePicker } from '~atoms/';
import { useUserStore } from '~store/userStore';

const options = [
  { label: '繁體中文', value: 'zh-Hant' },
  { label: '简体中文', value: 'zh-Hans' },
  { label: 'English', value: 'en' },
  { label: '日本語', value: 'ja-JP', disabled: true },
];

const DetailText = styled.Text`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 5px;
`;

const RowView = styled.View`
  flex-direction: row;
`;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  closeField: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    paddingRight: 10,
  },
  header: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  pageTitle: {
    fontSize: 32,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  buttonText: {
    color: '#0097C3',
  },
  itemField: {
    paddingBottom: 10,
  },
});

const GlobalSettingModal = () => {
  const navigation = useNavigation();
  const { selectPcb, serverUrl, authData, workstationIp } = useUserStore();
  const [language, setLanguage] = useState({
    label: '',
    value: '',
  });
  const pressPcb = () => {
    navigation.navigate('Pcb', { screen: 'SelectPcb' });
  };
  const pressAuthEdit = () => {
    navigation.navigate('AuthSetting');
  };
  return (
    <Container>
      <Content>
        <View style={styles.closeField}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" type="EvilIcons" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Global Setting</Text>
        </View>
        <View>
          <Card
            title="Device Info"
          >
            <FullPagePicker
              title="Language"
              topTitle="Select Language"
              value={language}
              onChange={item => setLanguage(item)}
              options={options}
            />
            <RowView>
              <DetailText>Selected PCB:</DetailText>
              <TouchableOpacity onPress={pressPcb}>
                <DetailText style={styles.buttonText}>{selectPcb || 'None'}</DetailText>
              </TouchableOpacity>
            </RowView>
            {/* <RowView style={{ paddingTop: 10 }}>
              <DetailText>Operator user:</DetailText>
              <DetailText>none</DetailText>
            </RowView> */}
          </Card>
          <Card
            title="Server Info"
          >
            <RowView style={styles.itemField}>
              <DetailText>Plant:</DetailText>
              <DetailText>WYTN</DetailText>
            </RowView>
            <RowView style={styles.itemField}>
              <DetailText>Server url:</DetailText>
              <DetailText>{serverUrl}</DetailText>
            </RowView>
            <RowView style={styles.itemField}>
              <DetailText>Workstation IP:</DetailText>
              <DetailText>{workstationIp}</DetailText>
            </RowView>
            <RowView style={styles.itemField}>
              <DetailText>Auth user:</DetailText>
              <DetailText>{authData.username}</DetailText>
            </RowView>
            <RowView style={{ justifyContent: 'center' }}>
              <Button
                onPress={pressAuthEdit}
                title="Edit"
                type="outline"
                containerStyle={{ width: '80%' }}
                buttonStyle={{ borderColor: '#0097C3' }}
                titleStyle={styles.buttonText}
              />
            </RowView>
          </Card>
        </View>
      </Content>
    </Container>
  );
};

GlobalSettingModal.propTypes = {
};

GlobalSettingModal.defaultProps = {
};

export default GlobalSettingModal;

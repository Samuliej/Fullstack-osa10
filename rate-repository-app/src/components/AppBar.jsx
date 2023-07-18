import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,

    paddingBottom: 16,
    paddingLeft: 16
  }
});

const AppBarTab = (props) => {
  return (
    <Pressable
      onPress={props.onPress}>
    <Text fontSize='subheading' color='appBar'>{props.text}</Text>
  </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text='Repositories' onPress={() => Alert.alert('You pressed the repositories tab')} />
    </View>
  );
};

export default AppBar;
import { View, Text, StyleSheet } from 'react-native';

const ErrorBanner = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});

export default ErrorBanner;
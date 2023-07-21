import Text from "../Text";
import { Pressable } from "react-native";
import theme from "../../theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerItem: theme.containerItem
});

const AppBarTab = (props) => {
  return (
    <Pressable
      style={styles.containerItem}
      onPress={props.onPress}>
    <Text fontSize='subheading' color='appBar'>{props.text}</Text>
  </Pressable>
  );
};

export default AppBarTab;
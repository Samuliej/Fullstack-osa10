import Text from "../Text";
import { Pressable, StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  containerItem: theme.containerItem
});

const AppBarTab = (props) => {
  return (
    <Pressable
      onPress={props.onPress}>
      <Text style={styles.containerItem} fontSize='subheading' color='appBar'>{props.text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
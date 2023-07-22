import theme from "../../../theme";
import { parseDate } from "../../../utils/helperFunctions";
import { StyleSheet, View } from "react-native";
import Text from "../../Text";

const styles = StyleSheet.create({
  flexContainer: {
    ...theme.flexContainer,
    backgroundColor: theme.colors.repositoryBackground,
    flexDirection: 'row', // To align items in a row
    alignItems: 'center', // To vertically center items
  },
  ratingContainer: {
    borderColor: theme.platformStyle.color,
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60
  },
  ratingText: {
    color: theme.platformStyle.color,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12, // Add left padding to indent the info elements
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  createdAt: {
    color: 'gray',
  },
  text: {
    marginTop: 4,
  },
});

const ReviewItem = ({ review }) => {
  const { createdAt, rating, text, user } = review.node;
  return (
    <View style={styles.flexContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.createdAt}>{parseDate(createdAt)}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
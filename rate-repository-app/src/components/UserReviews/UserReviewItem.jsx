import theme from "../../theme";
import { parseDate } from "../../utils/helperFunctions";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../Text";
import { useNavigate } from "react-router";
import ErrorBanner from "../ErrorBanner";
import useDeleteReview from "../../hooks/useDeleteReview";
import { Alert } from "react-native";

const styles = StyleSheet.create({
  flexContainer: {
    ...theme.flexContainer,
    paddingTop: 10,
    paddingLeft: 7,
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
    marginBottom: 10
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
  viewButton: {
    ...theme.button,
    minWidth: 170
  },
  deleteButton: {
    ...theme.button,
    backgroundColor: '#EA3C53',
    minWidth: 170
  },
  buttonText: theme.buttonText,
  buttonContainer: {
    backgroundColor: theme.colors.repositoryBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 10
  },
});

const showAlert = () => {
  return new Promise((resolve) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          onPress: () => resolve(false),
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: () => resolve(true),
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => resolve(false),
      },
    );
  });
};

const UserReviewItem = ({ review }) => {
  const navigate = useNavigate();
  const parts = review.node.id.split('.');
  const repositoryId = parts.slice(1).join('.');
  const reviewId = review.node.id;
  const { deleteReview, error } = useDeleteReview();

  const handleViewRepository = () => {
    navigate(`/${repositoryId}`);
  };

  const handleRemoveReview = async () => {
    const shouldDelete = await showAlert();
    if (shouldDelete) {
      await deleteReview(reviewId);
    }
  };

  const { createdAt, rating, text, repository } = review.node;
  return (
    <View>
      {error && <ErrorBanner message={error.message} /> }
      <View style={styles.flexContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>{repository.fullName}</Text>
          <Text style={styles.createdAt}>{parseDate(createdAt)}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: 'white', ...styles.buttonContainer }}>
        <Pressable
          style={styles.viewButton}
          onPress={handleViewRepository}
        >
          <Text testID='button1' style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={handleRemoveReview}
        >
          <Text testID='button2' style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserReviewItem;
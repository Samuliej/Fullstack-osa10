
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { View, StyleSheet } from "react-native";
import UserReviewList from "./UserReviewList";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.appBackground,
  }
});

const UserReviews = () => {
  const data = useGetCurrentUser(true);
  const user = data && data.user;

  return (
    <View style={styles.container}>
    <View>
      {user ? <UserReviewList user={user} /> : null}
    </View>
  </View>
  );
};

export default UserReviews;
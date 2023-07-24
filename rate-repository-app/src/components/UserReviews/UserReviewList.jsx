import ReviewItem from "../RepositoryList/SingleRepositoryView/ReviewItem";
import { View, FlatList, StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  separator: theme.separator,
});

const renderItem = ({ item }) => {
  return (
   <ReviewItem key={item.node.id} review={item} />
  );
 };

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviewList = ({ user }) => {
  const reviews = user.reviews.edges;

  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={({ node }) => node.id}
      />
    </View>
  );
};

export default UserReviewList;
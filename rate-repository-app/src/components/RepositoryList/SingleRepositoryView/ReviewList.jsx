import ReviewItem from "./ReviewItem";
import { View, FlatList, StyleSheet } from "react-native";
import RepositoryItem from "../RepositoryItem";
import theme from "../../../theme";

const styles = StyleSheet.create({
  separator: theme.separator,
});

const renderItem = ({ item }) => {
  return (
   <ReviewItem key={item.node.id} review={item} />
  );
 };

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({ repository, onEndReach }) => {
  const reviews = repository.reviews.edges;
  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={({ node }) => node.id}
        ListHeaderComponent={<View style={{ marginBottom: 10 }}><RepositoryItem item={repository} /></View>}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ReviewList;
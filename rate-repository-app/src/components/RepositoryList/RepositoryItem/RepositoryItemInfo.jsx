import { View } from 'react-native';
import Text from '../../Text';
import { formatNumber } from '../../../utils/helperFunctions';

const RepositoryItemInfo = (props) => {
  const { styles } = props;

  return (
    <View style={styles.infoContainer}>
    <View style={styles.infoItem}>
      <Text testID='stargazersCount' style={styles.infoNumber}>{formatNumber(props.stargazersCount)}</Text>
      <Text color='textSecondary'>Stars</Text>
    </View>
    <View style={styles.infoItem}>
      <Text testID='forksCount' style={styles.infoNumber}>{formatNumber(props.forksCount)}</Text>
      <Text color='textSecondary'>Forks</Text>
    </View>
    <View style={styles.infoItem}>
      <Text testID='reviewCount' style={styles.infoNumber}>{formatNumber(props.reviewCount)}</Text>
      <Text color='textSecondary'>Reviews</Text>
    </View>
    <View style={styles.infoItem}>
      <Text testID='ratingAverage' style={styles.infoNumber}>{props.ratingAverage}</Text>
      <Text color='textSecondary'>Rating</Text>
    </View>
  </View>
  );
};

export default RepositoryItemInfo;
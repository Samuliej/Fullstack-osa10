import { View, Image, StyleSheet } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  flexContainer: theme.flexContainer,
  headerContainer: theme.headerContainer,
  logo: theme.logo,
  fullName: theme.fullName,
  language: theme.language,
  infoContainer: theme.infoContainer,
  infoItem: theme.infoItem,
  infoNumber: theme.infoNumber,
  descriptionText: theme.descriptionText
});

// Helper function to format the numbers to the desired format
const formatNumber = (number) => {
  if (number >= 1000) {
    const formatted = (number / 1000).toFixed(1);
    return `${formatted}k`;
  }
  return number.toString();
};

// Helper function to format the text to multiple lines
const splitText = (text, maxLength) => {
  if (text.length > maxLength) {
    // ensure that the text is not split in the middle of a word
    const lastSpaceIndex = text.lastIndexOf(' ', maxLength);

    if (lastSpaceIndex !== -1) {
      const firstHalf = text.slice(0, lastSpaceIndex);
      const secondHalf = text.slice(lastSpaceIndex + 1);
      return `${firstHalf}\n${secondHalf}`;
    }
  }
  return text;
};

const RepositoryItemImageTitleDescription = (props) => {
  const { styles } = props;

  return (
    <View style={styles.headerContainer}>
    <Image
      style={styles.logo}
      source={{
        uri: props.ownerAvatarUrl,
      }}
    />
    <View>
      <Text style={styles.fullName}>{props.fullName}</Text>
      <Text color='textSecondary'>{props.description}</Text>
      <Text style={styles.language} color='textSecondary'>{props.language}</Text>
    </View>
  </View>
  );
};

const RepositoryItemInfo = (props) => {
  const { styles } = props;

  return (
    <View style={styles.infoContainer}>
    <View style={styles.infoItem}>
      <Text style={styles.infoNumber}>{formatNumber(props.stargazersCount)}</Text>
      <Text color='textSecondary'>Stars</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.infoNumber}>{formatNumber(props.forksCount)}</Text>
      <Text color='textSecondary'>Forks</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.infoNumber}>{formatNumber(props.reviewCount)}</Text>
      <Text color='textSecondary'>Reviews</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.infoNumber}>{props.ratingAverage}</Text>
      <Text color='textSecondary'>Rating</Text>
    </View>
  </View>
  );
};


const RepositoryItem = (props) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl
  } = props.item;

  const splitDescription = splitText(description, 40);

  return (
    <View style={styles.flexContainer}>
      <RepositoryItemImageTitleDescription
        styles={styles}
        ownerAvatarUrl={ownerAvatarUrl}
        fullName={fullName}
        description={splitDescription}
        language={language}
      />
      <RepositoryItemInfo
        styles={styles}
        stargazersCount={stargazersCount}
        forksCount={forksCount}
        reviewCount={reviewCount}
        ratingAverage={ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;

import { View, StyleSheet, Pressable } from 'react-native';
import Text from '../../Text';
import theme from '../../../theme';
import { splitText } from '../../../utils/helperFunctions';
import * as Linking from 'expo-linking';
import RepositoryItemInfo from './RepositoryItemInfo';
import RepositoryItemImageTitleDescription from './RepositoryItemImageTitleDescription';

const styles = StyleSheet.create({
  flexContainer: {
    ...theme.flexContainer,
    backgroundColor: theme.colors.repositoryBackground
  },
  headerContainer: theme.headerContainer,
  logo: theme.logo,
  fullName: theme.fullName,
  language: theme.language,
  infoContainer: theme.infoContainer,
  infoItem: theme.infoItem,
  infoNumber: theme.infoNumber,
  descriptionText: theme.descriptionText,
  button: {
    ...theme.button,
    margin: 20
  },
  buttonText: theme.buttonText,
});

const RepositoryItem = (props) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    url
  } = props.item;

  const splitDescription = splitText(description, 45);

  return (
    <View testID='repositoryItem' style={styles.flexContainer}>
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
      {url && (
        <Pressable
          style={styles.button}
          onPress={() => {
            if (Linking.canOpenURL)
              Linking.openURL(url);
          }}
        >
            <Text style={theme.buttonText}>Open in github</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;

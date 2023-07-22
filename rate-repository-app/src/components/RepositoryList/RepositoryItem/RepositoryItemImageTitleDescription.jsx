import { View, Image } from "react-native";
import Text from "../../Text";

const RepositoryItemImageTitleDescription = (props) => {
  const { styles } = props;

  return (
    <View testID='imageTitleDescription' style={styles.headerContainer}>
      <Image
        testID='image'
        style={styles.logo}
        source={{
          uri: props.ownerAvatarUrl,
        }}
      />
      <View>
        <Text testID='fullName' style={styles.fullName}>{props.fullName}</Text>
        <Text testID='description'>{props.description}</Text>
        <Text testID='language' style={styles.language} color='textSecondary'>{props.language}</Text>
      </View>
  </View>
  );
};

export default RepositoryItemImageTitleDescription;
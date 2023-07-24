import { Platform } from "react-native";
import Constants from 'expo-constants';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#363640',
    appBar: 'white',
    appBackground: '#DCDCDC',
    repositoryBackground: 'white'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  errorText: {
    marginTop: 3,
    color: "red"
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#363640',
    paddingBottom: 16,
    paddingLeft: 16,
    flexDirection: 'row'
  },
  containerItem: {
    alignItems: 'center',
    paddingHorizontal: 15,
    padding: 10
  },
  flexContainer: {
    flexDirection: 'column',
    paddingBottom: 10
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5
  },
  fullName: {
    fontWeight: 'bold',
    marginTop: 15
  },
  language: {
    marginTop: 5,
    alignSelf: 'flex-start',
    borderRadius: 5,
    backgroundColor: 'dodgerblue',
    paddingVertical: 2,
    paddingHorizontal: 6,
    color: 'white'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  infoItem: {
    alignItems: 'center',
  },
  infoNumber: {
    fontWeight: 'bold'
  },
  descriptionText: {
    flexShrink: 1
  },
  separator: {
    height: 10,
    backgroundColor: '#DCDCDC'
  },
  button: {
    backgroundColor: '#318CE7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  platformStyle: {
    color: Platform.select({
      android: 'green',
      ios: '#318CE7',
      default: '#318CE7'
    })
  }
};

export default theme;
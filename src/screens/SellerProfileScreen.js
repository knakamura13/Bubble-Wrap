import React, { 
  Component 
} from 'react';
import { 
  PRIMARY_COLOR 
} from '../constants/style';
import {
  ActivityIndicator,
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import {
  Cell,
  Section,
  TableView,
} from 'react-native-tableview-simple';

export default class App extends Component<{}> {

  static navigationOptions = ({ navigation }) => ({
    title: 'Seller Profile',
    tabBarLabel: 'Seller Profile',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.headerView}>
          <Image 
            source={require("../../assets/profile1.jpg")}
            style={styles.profileImg}
            resizeMode="cover"
          />

          <Text style={styles.userNameLbl}>Kyle Nakamura</Text>
          <Text style={styles.userUniversityLbl}>Azusa Pacific University</Text>
        </View>

        <ScrollView contentContainerStyle={styles.tableViewScroll}>
          <View style={styles.scrollSection}>
            <Text style={styles.scrollSectionLbl}>Kyle's trustworthiness rating: 4.8/5</Text>
            <ScrollView 
              style={styles.horizontalScrollView} 
              automaticallyAdjustInsets={true}
              horizontal={true}
              pagingEnabled={true}
              scrollEnabled={true}
              decelerationRate={0.5}
              scrollEventThrottle={16}
            >
              <View style={styles.reviewCell}>
                <Image 
                  source={require("../../assets/icon-profile.png")}
                  style={styles.reviewerImg}
                  resizeMode="cover"
                />
                <Text style={styles.h1Lbl}>Robert</Text>
                <Text style={styles.h1Lbl}>4/5</Text>
                <Text style={styles.reviewerTxt}>"Item was exactly as described!"</Text>
              </View>
              <View style={styles.reviewCell}>
                <Image 
                  source={require("../../assets/icon-profile.png")}
                  style={styles.reviewerImg}
                  resizeMode="cover"
                />
                <Text style={styles.h1Lbl}>Trevor</Text>
                <Text style={styles.h1Lbl}>5/5</Text>
                <Text style={styles.reviewerTxt}>"Thanks for selling me your car!"</Text>
              </View>
              <View style={styles.reviewCell}>
                <Image 
                  source={require("../../assets/icon-profile.png")}
                  style={styles.reviewerImg}
                  resizeMode="cover"
                />
                <Text style={styles.h1Lbl}>Andrew</Text>
                <Text style={styles.h1Lbl}>3/5</Text>
                <Text style={styles.reviewerTxt}>"Kyle was very nice and reasonable."</Text>
              </View>
              <View style={styles.reviewCell}>
                <Image 
                  source={require("../../assets/icon-profile.png")}
                  style={styles.reviewerImg}
                  resizeMode="cover"
                />
                <Text style={styles.h1Lbl}>Joshua</Text>
                <Text style={styles.h1Lbl}>5/5</Text>
                <Text style={styles.reviewerTxt}>"Went out of his way to be helpful."</Text>
              </View>
            </ScrollView>
          </View>

        <View style={styles.scrollSection}>
          <Text style={styles.scrollSectionLbl}>Kyle's Items for Sale</Text>
          <ScrollView 
              style={styles.horizontalScrollView} 
              automaticallyAdjustInsets={true}
              horizontal={true}
              pagingEnabled={true}
              scrollEnabled={true}
              decelerationRate={0.5}
              scrollEventThrottle={16}
            >
              <View style={styles.reviewCell}>
                <Image 
                  source={require("../../assets/logo.png")}
                  style={styles.reviewerImg}
                  resizeMode="cover"
                />
                <Text style={styles.h1Lbl}>Item Name | $25</Text>
              </View>
              <View style={styles.reviewCell}>
                <Image 
                  source={require("../../assets/logo.png")}
                  style={styles.reviewerImg}
                  resizeMode="cover"
                />
                <Text style={styles.h1Lbl}>Item Name | $7</Text>
              </View>
              <View style={styles.reviewCell}>
                <Image 
                  source={require("../../assets/logo.png")}
                  style={styles.reviewerImg}
                  resizeMode="cover"
                />
                <Text style={styles.h1Lbl}>Item Name | $40</Text>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
};

let profileImgWidth = 100;
let reviewerImgWidth = 60;

const styles = StyleSheet.create({
  root: { 
    backgroundColor: "#EFEFF4", 
    flex: 1 
  },

  /* Universal Styles */
    h1Lbl: {
      fontWeight: 'bold',
      color: '#000',
    },
  /* End Universal Styles */

  /* Header Section */
    headerView: {
      backgroundColor: '#37474F',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },

    profileImg: {
      width: profileImgWidth,
      height: profileImgWidth,
      borderRadius: profileImgWidth / 2,
    },

    userNameLbl: {
      color: '#fff',
      marginTop: 12,
      fontWeight: 'bold',
    },

    userUniversityLbl: {
      color: '#fff',
      marginTop: 0,
      fontStyle: 'italic',
    },
  /* End Header Section */

  /* Main Content */
    tableViewScroll: {
      backgroundColor: '#EFEFF4',
      paddingBottom: 20,
    },

    scrollSection: {
      height: 220,
      marginTop: 20,
      paddingTop: 15,
      backgroundColor: '#fff',
    },

    scrollSectionLbl: {
      fontWeight: 'bold',
      paddingLeft: 15,
    },

    reviewCell: {
      height: 150,
      width: 180,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
      margin: 15,
      padding: 20,
    },

    reviewerImg: {
      width: reviewerImgWidth,
      height: reviewerImgWidth,
      borderRadius: reviewerImgWidth / 2,
      marginBottom: 5,
    },

    reviewerTxt: {
      marginTop: 5,
      textAlign: 'center',
      fontStyle: 'italic',
    }
  /* End Main Content*/
});
import React, { 
  Component 
} from 'react';
import { PRIMARY_COLOR } from '../constants/style';
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
  ListView
} from 'react-native-tableview-simple';
import { connect } from 'react-redux';
import { fetchItems } from '../actions/user_items_actions';

class ProfileScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'My Profile',
    tabBarLabel: 'Profile',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  componentWillMount() {
  }

  async componentDidMount() {
    this.props.fetchItems();
    /* Two lines below are for the incomplete ListView for the items */
    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // this.dataSource = ds.cloneWithRows(this.props.items);
  }

  renderItems() {
    const { items } = this.props;
    return items.map(({ key, name, price }) => (
      <View style={styles.reviewCell} key={key}>
        <Image 
          source={require("../../assets/logo.png")}
          style={styles.reviewerImg}
          resizeMode="cover"
        />
        <Text style={styles.h1Lbl}>{`${name} | $${price}`}</Text>
      </View>
    ));
  }

  /* Two INCOMPLETE function below render the items in a ListView */
  // renderItems() {
  //   return (
  //     <ListView
  //       //horizontal={true}
  //       style={{ flex: 1 }}
  //       dataSource={this.dataSource}
  //       renderRow={this.renderRow(this.props.items)}
  //     />
  //   );
  // }
  // renderRow(item) {
  //   const { key, name, price } = item;
  //   return (
  //     <View style={styles.reviewCell} key={key}>
  //       <Image 
  //         source={require("../../assets/logo.png")}
  //         style={styles.reviewerImg}
  //         resizeMode="cover"
  //       />
  //       <Text style={styles.h1Lbl}>{`${name} | $${price}`}</Text>
  //     </View>
  //   );
  // }

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
          <View style={styles.reviewsView}>
            <Text style={styles.h1Lbl}>Your trustworthiness rating: 4.8/5</Text>
            <ScrollView 
              style={styles.reviewsScroll} 
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

          <View style={styles.reviewsView}>
            <Text style={styles.h1Lbl}>Items you are selling</Text>
            <ScrollView 
              style={styles.horizontalScrollView} 
              automaticallyAdjustInsets={true}
              horizontal={true}
              pagingEnabled={true}
              scrollEnabled={true}
              decelerationRate={0.5}
              scrollEventThrottle={16}
            >
              {this.renderItems()}
            </ScrollView>
          </View>

          <TableView>
            <Section header="CONTACT INFORMATION" footer="">
              <Cell
                cellStyle="Basic"
                title="Update your profile picture"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Add a phone number"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Add an email address"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Add a payment method"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
              <Cell
                cellStyle="Basic"
                title="Connect your Facebook account"
                accessory="DisclosureIndicator"
                onPress={() => console.log('Heyho!')}
              />
            </Section>
          </TableView>
        </ScrollView>
      </View>
    );
  }
}

const profileImgWidth = 100;
const reviewerImgWidth = 60;

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

  tableViewScroll: {
    backgroundColor: '#EFEFF4',
    paddingBottom: 20,
  },

  reviewsView: {
    height: 220,
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
  },

  reviewsScroll: {

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

});

const mapStateToProps = (state) => {
  const { items } = state.userItems;
  return { items };
};

export default connect(mapStateToProps, { fetchItems })(ProfileScreen);

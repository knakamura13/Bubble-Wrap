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
import firebase from 'firebase';
import { fetchItems, loadItem } from '../actions/user_items_actions';
import { fetchUser, fetchUserReviews, findUserName, loadSeller } from '../actions/user_profile_actions';
import { fetchUsers } from '../actions/users_actions';

class ProfileScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'My Profile',
    tabBarLabel: 'Profile',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  async componentDidMount() {
    this.props.fetchItems();
    this.props.fetchUser();
    this.props.fetchUserReviews();
    this.props.fetchUsers();
  }

  loadUsername() {
    const { name } = this.props;
    return (
      <Text style={styles.userNameLbl}>{name}</Text>
    );
  }

  loadReviews() {
    const { reviews } = this.props;
    let sellerName = '';
    return reviews.map(({ key, comment, rating, userId }) => (
      <TouchableOpacity
        onPress={() => {
          this.props.loadSeller(userId);
          this.props.navigation.navigate('seller'); 
        }}
        key={key}
      >
        <View style={styles.reviewCell} >
          <Image
            source={{url: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/12669716_1237006402982393_3217046914981297038_n.jpg?_nc_cat=0&oh=b05a93c391dc723f390016b5eef6122b&oe=5B65D228'}}
            style={styles.reviewerImg}
            resizeMode="cover"
          />
          <Text style={styles.h1Lbl}>{`${sellerName}`}</Text>
          <Text style={styles.h1Lbl}>{`${rating}/5`}</Text>
          <Text style={styles.h1Lbl}>{`${comment}`}</Text>
        </View>
      </TouchableOpacity>
    ));
  }



  renderItems() {
    const { items } = this.props;
    return items.map((item) => (
      <TouchableOpacity
        key={item.key}
        onPress={() => { 
          this.props.loadItem(item);
          this.props.navigation.navigate('editItem'); 
        }}
      >
        <View style={styles.reviewCell}>
          <Image
            source={{ uri: item.images[0].url }}
            style={styles.reviewerImg}
            resizeMode="cover"
          />
          <Text style={styles.h1Lbl}>{`${item.name} | $${item.price}`}</Text>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    const { navigate } = this.props.navigation;
    const { name, overallRating, profileURL, bubbleCommunity, numTransactions, email } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              try {
                firebase.auth().signOut();
              } catch(e) {
                alert("Error signing out");
              }
            }}
            style = {styles.signOutBtn}
          >
            <Text style={{color: "black", fontWeight: "bold"}}>Sign out</Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log(this.props.profileURL)}}
          >
            <Image
              source={{ uri: profileURL }}
              style={styles.profileImg}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {this.loadUsername()}
          <Text style={styles.userUniversityLbl}>Your bubble: {bubbleCommunity}</Text>
          <Text style={styles.userUniversityLbl}>{email}</Text>
        </View>
        
        <ScrollView contentContainerStyle={styles.tableViewScroll}>
          <View style={styles.reviewsView}>
            <Text style={styles.h1Lbl}>Your trustworthiness rating: {overallRating}/5</Text>
            <ScrollView
              style={styles.reviewsScroll}
              automaticallyAdjustInsets={true}
              horizontal={true}
              pagingEnabled={true}
              scrollEnabled={true}
              decelerationRate={0.5}
              scrollEventThrottle={16}
            >
            {this.loadReviews()}
              
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

  h1Lbl: {
    fontWeight: 'bold',
    color: '#000',
  },

  /* Header Section */
  headerView: {
    backgroundColor: '#37474F',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signOutBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    height: 40,
    padding: 8,
    backgroundColor: "#fefefe",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImg: {
    width: profileImgWidth,
    height: profileImgWidth,
    borderRadius: profileImgWidth / 2,
  },

  editProfile: {
    position: 'absolute',
    top:12,
    right:12,
    height:25,
    width: 25,
    zIndex: 2
  },

  icon:{
    height: '100%',
    width: '100%'
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
  const { name, overallRating, 
    bubbleCommunity, numTransactions, profileURL, email } = state.user;
  const { reviews } = state.user;
  const { username } = state.user;
  const { users } = state.users;
  return { 
    items, 
    name,
    overallRating,
    bubbleCommunity,
    numTransactions,
    profileURL,
    reviews,
    username,
    email,
    users,
   };
};

export default connect(mapStateToProps, { fetchItems, loadItem, fetchUser, fetchUserReviews, findUserName, fetchUsers, loadSeller })(ProfileScreen);

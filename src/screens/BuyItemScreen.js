import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";

class BuyItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Buy Item',
    tabBarLabel: 'Buy',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center'
    }
  });

  renderImgThumbnails = () => {
    return this.props.item.images.slice(1).map(({ url, index }) => (
      <View style={styles.thumbnailView} key={index}>
        {!!url &&
          <Image
            style={styles.thumbnailImage}
            source={{ uri: url }}
          />}
      </View>
    ));
  };

  render() {
    const { name, description, price, images } = this.props.item;
    return (
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.mainImg}
            source={{ uri: images[0].url }}
            resizeMode="cover"
          />

          <Text style={styles.priceTxt}>${price}</Text>

          <View style={styles.thumbnailContainer}>
            {this.renderImgThumbnails()}
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.itemTitleTxt}>{name}</Text>
          <Text style={styles.descriptionTxt}>{description}</Text>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnOpacity}
            onPress={() => { console.log("Button pressed") }}
          >
            <Text style={styles.btnText}>
              Make an offer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },

  imageContainer: {
    flex: 1,
    width: window.width,
    height: window.width,
    height: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mainImg: {
    marginTop: 0,
    width: "100%",
    height: "100%",
  },
  priceTxt: {
    fontWeight: 'bold',
    fontSize: 50,
    backgroundColor: "#00000030",
    padding: 15,
    paddingLeft: 50,
    width: "66%",
    textAlign: "left",
    color: "#fff",
    position: "absolute",
    top: 30,
    left: 0,
  },

  thumbnailContainer: {
    maxHeight: 80,
    width: window.width,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 20,
  },
  thumbnailView: {
    width: 80,
    height: 80,
    // padding: 20,
    backgroundColor: "#FFFFFF30", // 30% oppacity
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  thumbnailImage: {
    width: 76,
    height: 76,
    borderRadius: 5
  },

  textContainer: {
    padding: 15,
    backgroundColor: "#fff",
    height: 150,
  },
  itemTitleTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
  },
  descriptionTxt: {
    paddingTop: 10,
    paddingBottom: 5,
  },

  btnContainer: {
    width: window.width,
    height: 70,
  },
  btnOpacity: {
    backgroundColor: "#33a3f3",
    width: "100%",
    height: "100%",
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  }
});

const mapStateToProps = (state) => {
  const { item } = state.buyItems;
  return { item };
};

export default connect(mapStateToProps)(BuyItemScreen);

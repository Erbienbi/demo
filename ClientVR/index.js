import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  localStorage,
  VrButton,
  Environment,
  Image,
  asset
} from 'react-360';
import { assertType } from 'graphql';
// import axios from 'axios'


const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 2
})

const Location = NativeModules.Location.href.split('?')[1].split('&&')
const BuildingId = Number(Location[0].split('=')[1])
const RoomId = Number(Location[1].split('=')[1])
// const Token = Location[2].split('=')[1]

export default class ClientVR extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: false,
      price: 1700000,
      facilities: [],
      gender: '',
      isLoading: true,
      img: 'https://video.360cities.net/digitalstudio/01622412_Liberty2018-1024x512.jpg',
      rooms: ['https://i0.wp.com/hitsbanget.com/wp-content/uploads/2018/12/facebook-360images_header3-724x380.jpg?fit=724%2C380&ssl=1&resize=1280%2C720',
              'https://www.arch2o.com/wp-content/uploads/2016/06/Arch2O-360-Photos01.jpg'],
      currentRoom: 'https://www.arch2o.com/wp-content/uploads/2016/06/Arch2O-360-Photos01.jpg',
      currentImage: 'https://www.arch2o.com/wp-content/uploads/2016/06/Arch2O-360-Photos01.jpg',
      current: 0,
      start: 0,
      listsRoom: false,
      roomsDetails: []
    }
  }

  fetchData = async () => {
    let server = 'http://localhost:3000'
    try {
      const options = {
        method: 'get'
      }
      let data = await fetch(`${server}/room/${RoomId}`, options)
      let allData = await fetch(`${server}/building/${BuildingId}`, options)

      const room = JSON.parse(data._bodyInit)
      const building = JSON.parse(allData._bodyInit)

      let keys = Object.keys(room);
      let filtered = keys.filter(key => room[key] === true)

      this.setState({ facilities: filtered })
      this.setState({ price: room.price })
      this.setState({ image: room.image })
      this.setState({ gender: room.gender })

      this.setState({ image: room.image })
      this.setState({ roomsDetails: building.Rooms })
      console.log(this.state)
    } catch (err) {
      console.log(err.message, 'error')
    }
  }

  _incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  hideDetails = () => {
    this.setState({ title: !this.state.title })
  }

  next = () => {
    this.setState({ current: this.state.current === this.state.rooms.length - 1 ? 0 : this.state.current + 1 })
    this.setState({ currentImage: this.state.rooms[this.state.current] })
  }

  back = () => {
    this.setState({ current: this.state.current === 0 ? this.state.rooms.length - 1 : this.state.current - 1 })
    this.setState({ currentImage: this.state.rooms[this.state.current] })
  }

  componentDidMount() {
    this.fetchData()
    this.setState({ isLoading: false })
    Environment.setBackgroundImage(
      { uri: `https://cors-anywhere.herokuapp.com/${this.state.img}` }
    )
  }

  changeBG = (obj) => {
    let keys = Object.keys(obj);
    let filtered = keys.filter(key => obj[key] === true)
    console.log('ini', filtered)
    this.setState({ facilities: filtered })
    this.setState({ price: obj.price })
    this.setState({ image: obj.image })
    this.setState({ gender: obj.gender })
    console.log(this.state)
    Environment.setBackgroundImage({ uri: `https://cors-anywhere.herokuapp.com/${obj.image}` })
  }

  showOtherRooms = () => {
    this.setState({ listsRoom: !this.state.listsRoom })
  }

  render() {
    return (
      <View>
        {this.state.isLoading && <View style={styles.panel}>
          <View style={styles.greetingBox}>
            <Text style={styles.greeting}>
              please wait, we are preparing your room for you
           </Text>
          </View>
        </View>}
        {!this.state.isLoading && <View>
          <VrButton
            style={styles.button}
            onClick={this.hideDetails}>
            <Text>
              Details
            </Text>
          </VrButton>
          {this.state.title &&
            <View style={styles.greetingBox}>
              <Text style={styles.details}>{`facilities: \n-` + this.state.facilities.join('\n -')}</Text>
              <Text style={styles.details}>Price: {formatter.format(this.state.price)}</Text>
              <Text style={styles.details}>Suitable for {this.state.gender}</Text>
              <Text style={styles.details}>{this.state.address}</Text>
            </View>}
          <VrButton
            style={styles.book}
            onClick={this.showOtherRooms}>
            <Text>
              Show Other Rooms
            </Text>
          </VrButton>
          {this.state.listsRoom &&
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <VrButton
                style={styles.arrow}
                onClick={this.back}>
                <Image source={asset('back.png')} style={{ width: 50, height: 50 }} />
              </VrButton>
              <VrButton onClick={() => this.changeBG(this.state.roomsDetails[this.state.current])}>
                <Image source={{ uri: `https://cors-anywhere.herokuapp.com/${this.state.currentImage}` }} style={{ width: 200, height: 100 }} />
              </VrButton>
              <VrButton
                style={styles.arrow}
                onClick={this.next}>
                <Image source={asset('next.png')} style={{ width: 50, height: 50 }} />
              </VrButton>
            </View>}
        </View>
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel1: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  panel2: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  button: {
    padding: 20,
    backgroundColor: 'gray',
    borderRadius: 5,
    borderColor: 'white',
  },
  book: {
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 5,
    borderColor: 'white',
  },
  arrow: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  details: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    fontSize: 30,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  hidden: {
    fontSize: 0
  }
});

AppRegistry.registerComponent('ClientVR', () => ClientVR);

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  localStorage,
  VrButton,
  Environment
} from 'react-360';

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 2
})

// const Location = NativeModules.Location.href.split('?')[1].split('&&')
// const BuildingId = Number(Location[0].split('=')[1])
// const RoomId = Number(Location[1].split('=')[1])
// const Token = Location[2].split('=')[1]

export default class ClientVR extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: false,
      price: 1700000,
      address: 'jl.wadidawcikidingding',
      facilities: ['ac', 'bathroom'],
      isLoading: true,
      img: false
    }
  }

  fetchData = async () => {
    console.log(456)
    let server = ''
    try {
      const options = {
        method: 'get',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        }
      }
      let data = await fetch(`${server}/${BuildingId}/${RoomId}`, options)
      let keys = Object.keys(data);
      let filtered = keys.filter(key => data[key])

      this.setState({ facilities: filtered })
      this.setState({ price: data.price })
      this.setState({ image: data.image })

    } catch (error) {
      console.log(error, 'error')
    }
  }

  _incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  hide = () => {
    this.setState({ title: !this.state.title })
  }

  back() {
    console.log('close')
  }

  componentDidMount() {
    // this.fetchData()
    this.setState({ isLoading: false })
    Environment.setBackgroundImage(
      { uri: `https://cors-anywhere.herokuapp.com/${this.state.img || 'https://video.360cities.net/digitalstudio/01622412_Liberty2018-1024x512.jpg'}` }
    )
    console.log('successfully feching data from server')
  }

  bookRoom() {
    // console.log(localStorage)
    if (localStorage.getItem('token')) {
      console.log('sukses booking')
    } else {
      console.log('masuk')
      // window.open('http://localhost:3001')
      console.log('ihiw')
    }
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
            onClick={this.hide}>
            <Text>
              Details
            </Text>
          </VrButton>
          {this.state.title &&
            <View style={styles.greetingBox}>
              <Text style={styles.details}>{`facilities: \n-` + this.state.facilities.join('\n -')}</Text>
              <Text style={styles.details}>Price: {formatter.format(this.state.price)}</Text>
              <Text style={styles.details}>{this.state.address}</Text>
            </View>
          }
          <VrButton
            style={styles.book}
            onClick={this.bookRoom}>
            <Text>
              Book Now!
    </Text>
          </VrButton>
          <VrButton
            style={styles.book, { backgroundColor: 'red' }}
            onClick={this.back}>
            <Text>
              close
    </Text>
          </VrButton>
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

// const App = StackNavigator({
//   Home: {screen:reactVR,
//          path: 'room/:id'},
// });

AppRegistry.registerComponent('ClientVR', () => ClientVR);
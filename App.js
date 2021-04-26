import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client'

const socket = io('https://1bfb5f4e01c6.ngrok.io');

export default function App() {
  const [time, setTime] = useState("no data");

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`connection establised: ID[${socket.id}]`);
    });

    socket.on('test', (data) => {
      setTime(data);
    });

    socket.on('disconnect', () => {
      console.log(`connection terminated`);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{time}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30
  }
});

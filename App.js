import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://e14070b8ff37.ngrok.io');

export default function App() {
  const [data, setData] = useState({ todaysCollection: 'no data' });

  useEffect(() => {
    const requestData = async () => {
      console.log('making a request to backend');
      const { data } = await axios({
        method: 'get',
        url: 'http://134.209.153.159:9000/api/user/collectionAndDue',
        headers: {
          'auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjAzNTQxNzk0YzZjMTMzNTU4NGUwZmRjIn0sImlhdCI6MTYxOTQ2MDU0OH0.nyTQnf1F0k2LBRhF_XoMJU7yXKuOrSQ7AZi6YQs-iGk',
        },
      });

      setData(data);
    };

    socket.on('connect', () => {
      console.log(`connection establised: ID[${socket.id}]`);
    });

    socket.on('reset-collection', (msg) => {
      console.log(msg);
      requestData();
    });

    socket.on('disconnect', () => {
      console.log(`connection terminated`);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.todaysCollection.toString()}</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});

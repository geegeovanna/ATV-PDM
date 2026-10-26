import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
 
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
 
export default function App() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 
  const apiPost = async () => {
    try {
      setLoading(true);
      setError(null);
 
      const response = await axios.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
     
      setPost(response.data);
    } catch (erro: any) {
      setError('Ocorreu um erro ao buscar os dados da publicação.');
      console.error(erro);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    apiPost();
  }, []);
 
  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fdf0d5" />
          <Text style={styles.loadingText}>Carregando dados da publicação...</Text>
        </View>
      )}
 
      {error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
 
      {!loading && !error && post && (
        <View style={styles.card}>
          <Text style={styles.label}>Título:</Text>
          <Text style={styles.titulo}>{post.title}</Text>
 
          <View style={styles.divider} />
 
          <Text style={styles.label}>Conteúdo:</Text>
          <Text style={styles.body}>{post.body}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f1d1b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fdf0d5',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffe6a7',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6f1d1b',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#432818',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: '#6f1d1b',
    marginVertical: 12,
  },
  body: {
    fontSize: 15,
    color: '#432818',
    lineHeight: 22,
  },
});
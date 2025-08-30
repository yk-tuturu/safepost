import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import ThemedText from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/template/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText>This screen does not exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText>Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

import { Redirect } from 'expo-router';

export default function TabsIndex() {
  return <Redirect href="/home" />; // ✅ Redirect to the first tab
}
// // /app/(tabs)/job-details.js
// import React from "react";
// import { View, Text, ScrollView, Button, Linking, StyleSheet } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";

// export default function JobDetails() {
//   const router = useRouter();
//   const params = useLocalSearchParams(); // receives data sent via router.push()
//   const job = JSON.parse(params.job);    // convert string back to object

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{job.title}</Text>
//       <Text style={styles.company}>{job.company_name}</Text>

//       {/* Removing HTML tags from job.description */}
//       <Text style={styles.desc}>{job.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>

//       <Button title="Apply Now" onPress={() => Linking.openURL(job.url)} />
//       <Button title="Go Back" onPress={() => router.back()} color="gray" />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 22, fontWeight: "bold" },
//   company: { color: "gray", marginVertical: 5 },
//   desc: { marginVertical: 15, lineHeight: 20 },
// });

import React from "react";
import { View, Text, StyleSheet, ScrollView, Button, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function JobDetailsScreen() {
  const { job } = useLocalSearchParams();
  const router = useRouter();

  // Parse job object passed from FlatList
  const jobData = job ? JSON.parse(job as string) : null;

  if (!jobData) {
    return (
      <View style={styles.center}>
        <Text>No job data found.</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{jobData.title}</Text>
      <Text style={styles.company}>{jobData.company_name}</Text>
      <Text style={styles.description}>{jobData.description}</Text>

      <Button title="Apply Now" onPress={() => Linking.openURL(jobData.url)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  company: { fontSize: 18, color: "gray", marginBottom: 10 },
  description: { fontSize: 16, lineHeight: 22, marginBottom: 20 },
});

// import axios from "axios";
// import { useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Linking,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   useWindowDimensions,
//   View
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context"; // ✅ for dynamic bottom padding

// type Job = {
//   id: number;
//   title: string;
//   company_name: string;
//   description: string;
//   url: string;
// };

// export default function JobDetails() {
//   const { id } = useLocalSearchParams<{ id?: string }>();
//   const [job, setJob] = useState<Job | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { width } = useWindowDimensions();
//   const insets = useSafeAreaInsets(); // ✅ detects safe areas (notch + bottom navigation bar)

//   useEffect(() => {
//     if (id) fetchJobDetails();
//   }, [id]);

//   const fetchJobDetails = async () => {
//     try {
//       const response = await axios.get("https://remotive.com/api/remote-jobs");
//       const selectedJob = response.data.jobs.find(
//         (job: Job) => job.id.toString() === id
//       );
//       setJob(selectedJob || null);
//     } catch (error) {
//       console.error("Error fetching job details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApply = () => {
//     if (job?.url) Linking.openURL(job.url);
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
//   }

//   if (!job) {
//     return (
//       <View style={styles.centered}>
//         <Text style={{ fontSize: 18 }}>❌ Job not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingHorizontal: width < 380 ? 15 : 20,
//           paddingBottom: insets.bottom + 100, // ⬅️ increased bottom padding for safe space
//           flexGrow: 1,
//         }}
//       >
//         <Text
//           style={[
//             styles.title,
//             { fontSize: width < 380 ? 20 : 24, marginTop: 10 },
//           ]}
//         >
//           {job.title}
//         </Text>

//         <Text
//           style={[
//             styles.company,
//             { fontSize: width < 380 ? 14 : 16, marginBottom: 20 },
//           ]}
//         >
//           {job.company_name}
//         </Text>

//         <Text style={styles.sectionTitle}>Description:</Text>

//         <Text style={styles.description}>
//           {job.description.replace(/<\/?[^>]+(>|$)/g, "")}
//         </Text>

//         {/* ✅ Apply button stays correctly after all content */}
//         <View style={[styles.bottomButtonContainer, { marginBottom: insets.bottom + 20 }]}>
//           <Pressable style={styles.applyButton} onPress={handleApply}>
//             <Text style={styles.applyText}>🚀 Apply Now</Text>
//           </Pressable>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontWeight: "bold",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   company: {
//     color: "gray",
//     textAlign: "center",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 6,
//   },
//   description: {
//   paddingVertical:20,
//   margin:10,
//   borderWidth: 10,
//   fontSize: 15,
//   lineHeight: 22,
//   color: "#333",
//   textAlign: "justify",
//   },

//   bottomButtonContainer: {
//     marginTop: 30,
//     alignItems: "center",
//   },
//   applyButton: {
//     width: "100%",
//     backgroundColor: "#007bff",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   applyText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Job = {
  id: number;
  title: string;
  company_name: string;
  description: string;
  url: string;
};

export default function JobDetails() {
  const { job } = useLocalSearchParams<{ job?: string }>();
  const [jobData, setJobData] = useState<Job | null>(null);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (job) {
      try {
        // handle both encoded and plain JSON
        const parsed = JSON.parse(decodeURIComponent(job as string));
        setJobData(parsed);
      } catch (error) {
        console.log("Error parsing job data:", error);
      }
    }
  }, [job]);


  const handleApply = () => {
    if (jobData?.url) Linking.openURL(jobData.url);
  };

  if (!jobData) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 18 }}>❌ Job not found.</Text>
      </View>
    );
  }

  // ✅ Convert content to renderable sections for FlatList
  const data = [
    { key: "title", content: jobData.title },
    { key: "company", content: jobData.company_name },
    { key: "descTitle", content: "Description:" },
    {
      key: "description",
      content: jobData.description.replace(/<\/?[^>]+(>|$)/g, ""),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: width < 380 ? 15 : 20,
          paddingBottom: insets.bottom + 80,
        }}
        renderItem={({ item }) => {
          if (item.key === "title") {
            return (
              <Text
                style={[
                  styles.title,
                  { fontSize: width < 380 ? 20 : 24, marginTop: 10 },
                ]}
              >
                {item.content}
              </Text>
            );
          } else if (item.key === "company") {
            return (
              <Text
                style={[
                  styles.company,
                  { fontSize: width < 380 ? 14 : 16, marginBottom: 20 },
                ]}
              >
                {item.content}
              </Text>
            );
          } else if (item.key === "descTitle") {
            return <Text style={styles.sectionTitle}>{item.content}</Text>;
          } else if (item.key === "description") {
            return <Text style={styles.description}>{item.content}</Text>;
          }
          return null;
        }}
        ListFooterComponent={
          <View
            style={[
              styles.bottomButtonContainer,
              { marginBottom: insets.bottom + 10 },
            ]}
          >
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>🚀 Apply Now</Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  company: {
    color: "gray",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    textAlign: "justify",
  },
  bottomButtonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  applyButton: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

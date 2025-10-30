import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// ✅ Define the Job type
type Job = {
  id: number;
  title: string;
  company_name: string;
  description: string;
  url: string;
};

export default function HomeScreen() {
  const [jobs, setJobs] = useState<Job[]>([]); // ✅ tell TS that jobs is an array of Job
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://remotive.com/api/remote-jobs");
      setJobs(response.data.jobs.slice(0, 20));
    } catch (error) {
      console.log("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>💼 Remote Jobs</Text>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()} // ✅ works now
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/job-details",
                params: { job: JSON.stringify(item) },
              })

            }
          >
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.company}>{item.company_name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: {
    fontSize: width < 380 ? 14 : 16,
    fontWeight: "bold",
  },
  company: {
    color: "gray",
    marginTop: 4,
    fontSize: width < 380 ? 12 : 14,
  },
});



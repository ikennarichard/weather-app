export const formatTime = (timestamp: string) => {
  const date = new Date(timestamp.replace(" ", "T")); // Ensure valid format
  return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
  });
}

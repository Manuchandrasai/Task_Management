// Generate a unique ID for tasks
export const generateId = () => Date.now();

// Format date to a readable format
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

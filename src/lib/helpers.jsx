// ============================== Helpers ==============================

// =================== Utility functions ===================
// Utility function to capitalize a string
export const capitalize = (str) => {
  if (typeof str !== 'string' || !str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

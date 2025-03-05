import { StyleSheet } from 'react-native';

// Create theme-aware styles - takes the current theme as input
export const createThemedStyles = (theme, isDarkMode) => ({
  // General containers
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollViewContent: {
    backgroundColor: theme.background,
  },
  section: {
    backgroundColor: theme.card,
    margin: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: isDarkMode ? '#000' : '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.text,
  },
  
  // Headers
  header: {
    backgroundColor: theme.primary,
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  // Common text
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  text: {
    color: theme.text,
  },
  secondaryText: {
    color: theme.textSecondary,
  },
  
  // Cards
  card: {
    backgroundColor: theme.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: isDarkMode ? '#000' : '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // Form elements
  input: {
    backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 5,
    padding: 10,
    color: theme.text,
  },
  inputLabel: {
    fontSize: 14,
    color: theme.text,
    marginBottom: 5,
  },
  
  // Buttons
  button: {
    backgroundColor: theme.primary,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: isDarkMode ? '#fff' : theme.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Lists
  listItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: theme.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  listItemText: {
    color: theme.text,
  },
  separator: {
    height: 1,
    backgroundColor: theme.border,
  },
  
  // Tabs
  tabBar: {
    backgroundColor: theme.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  tabItem: {
    paddingVertical: 10,
  },
  tabText: {
    color: theme.textSecondary,
  },
  activeTabText: {
    color: theme.primary,
    fontWeight: 'bold',
  },
  
  // Empty states
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
  },
  
  // Stats
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
  },
});

export default createThemedStyles;
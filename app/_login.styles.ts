import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  keyboardView: {
    flex: 1,
  },
  blueBackground: {
    backgroundColor: '#2563EB',
    height: '50%',
    width: '100%',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#E0E7FF',
    fontSize: 14,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 60,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  mainErrorText: {
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    height: 48,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    height: '100%',
    fontSize: 14,
  },
  eyeIcon: {
    padding: 10,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  paddedContainer: {
    flex: 1,
    padding: SIZES.lg,
    backgroundColor: COLORS.background,
  },

  heading1: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  heading2: {
    fontSize: SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  heading3: {
    fontSize: SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  bodyText: {
    fontSize: SIZES.md,
    color: COLORS.text,
    lineHeight: 24,
  },
  captionText: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  errorText: {
    fontSize: SIZES.sm,
    color: COLORS.error,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SIZES.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: SIZES.md,
  },
  smallCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SIZES.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  marginTopSm: { marginTop: SIZES.sm },
  marginTopMd: { marginTop: SIZES.md },
  marginTopLg: { marginTop: SIZES.lg },
  marginBottomSm: { marginBottom: SIZES.sm },
  marginBottomMd: { marginBottom: SIZES.md },
  marginBottomLg: { marginBottom: SIZES.lg },
  paddingHorizontalMd: { paddingHorizontal: SIZES.md },
  paddingHorizontalLg: { paddingHorizontal: SIZES.lg },
  paddingVerticalMd: { paddingVertical: SIZES.md },
  paddingVerticalLg: { paddingVertical: SIZES.lg },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lightShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  borderTop: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.md,
  },
});

export default globalStyles;
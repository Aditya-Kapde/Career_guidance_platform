import { StyleSheet, Font } from '@react-pdf/renderer';

// Register standard fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf', fontWeight: 700 }
  ]
});

export const theme = {
  colors: {
    primary: '#4f46e5', // indigo-600
    primaryLight: '#e0e7ff', // indigo-100
    secondary: '#10b981', // emerald-500
    accent: '#f59e0b', // amber-500
    text: '#111827', // gray-900
    textMuted: '#6b7280', // gray-500
    bg: '#f9fafb', // gray-50
    border: '#e5e7eb', // gray-200
    white: '#ffffff',
  }
};

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    backgroundColor: theme.colors.bg,
    color: theme.colors.text,
  },
  section: {
    backgroundColor: theme.colors.white,
    padding: 24,
    borderRadius: 8,
    border: `1pt solid ${theme.colors.border}`,
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 20,
    color: theme.colors.primary,
    borderBottom: `2pt solid ${theme.colors.primaryLight}`,
    paddingBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 12,
    color: theme.colors.text,
  },
  title: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: theme.colors.primary,
    marginBottom: 8,
    marginTop: 12,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.6,
    color: theme.colors.text,
    marginBottom: 8,
  },
  mutedText: {
    fontSize: 10,
    color: theme.colors.textMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  col: {
    flex: 1,
  },
  badge: {
    padding: '4pt 8pt',
    borderRadius: 4,
    backgroundColor: theme.colors.primaryLight,
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: 600,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: theme.colors.textMuted,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `1pt solid ${theme.colors.border}`,
    paddingTop: 10,
  },
  // Cover page specific
  coverTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: theme.colors.primary,
    marginTop: 100,
    marginBottom: 10,
  },
  coverSubtitle: {
    fontSize: 18,
    color: theme.colors.textMuted,
    marginBottom: 60,
  },
  // Analytics specific
  barContainer: {
    height: 12,
    backgroundColor: theme.colors.bg,
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
  },
  barFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
  },
  list: {
    marginLeft: 12,
  },
  listItem: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 6,
  },
  // Table styles
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderTop: `1pt solid ${theme.colors.border}`,
    borderLeft: `1pt solid ${theme.colors.border}`,
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: theme.colors.bg,
    fontWeight: 700,
  },
  tableCell: {
    borderRight: `1pt solid ${theme.colors.border}`,
    borderBottom: `1pt solid ${theme.colors.border}`,
    padding: 8,
    flex: 1,
    fontSize: 9,
    justifyContent: 'center',
  },
  tableCellHeader: {
    borderRight: `1pt solid ${theme.colors.border}`,
    borderBottom: `1pt solid ${theme.colors.border}`,
    padding: 8,
    flex: 1,
    fontSize: 9,
    fontWeight: 700,
    color: theme.colors.primary,
  },
  // Highlight box
  highlightBox: {
    backgroundColor: theme.colors.primaryLight,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderLeft: `4pt solid ${theme.colors.primary}`,
  }
});

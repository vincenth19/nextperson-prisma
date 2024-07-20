'use client'
import { Box, Container, Typography, Link, CssBaseline } from '@mui/material';

const StickyFooter = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: '1rem',
            backgroundColor: (theme) =>
              theme.palette.grey[900]
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h6" component="div">
              About
            </Typography>
            <Typography variant="body2">
              This page is a demonstrator People app that uses{' '}
              <Link href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                Next JS 14
              </Link>
              ,{' '}
              <Link href="https://mui.com/" target="_blank" rel="noopener noreferrer">
                MUI 5 framework
              </Link>
              ,{' '}
              <Link href="https://www.prisma.io/" target="_blank" rel="noopener noreferrer">
                Prisma ORM
              </Link>
              , and{' '}
              <Link href="https://aws.amazon.com/rds/aurora/" target="_blank" rel="noopener noreferrer">
                AWS Aurora
              </Link>
              , hosted under{' '}
              <Link href="https://aws.amazon.com/amplify/" target="_blank" rel="noopener noreferrer">
                AWS Amplify
              </Link>
              .
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4, color: '#ffffff' }}>
              &copy; {new Date().getFullYear()}{' '}
              <Link href="https://github.com/gocallum?tab=repositories" target="_blank" rel="noopener noreferrer">
                Callum Bir
              </Link>
            </Typography>

          </Container>
        </Box>
      </Box>
    </>
  );
};

export default StickyFooter;

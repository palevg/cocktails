import { Box, Typography } from '@mui/material';

export default function NotFound({ infoText }) {
  return <Box sx={{ bgcolor: 'background.default', width: '100%', textAlign: 'center' }}>
    <Typography
      variant="h2"
      sx={{
        fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '22px', sm: '32px', md: '48px' },
        lineHeight: { xs: '42px', md: '72px' }, maxWidth: { xs: '100%', sm: '360px', md: '520px' },
        color: 'text.primary', margin: '80px auto'
      }}
    >{infoText}</Typography>
    <Box
      component="img"
      sx={{ width: { xs: '100%', sm: 345 } }}
      src="./cocktail-.png"
      alt="Not found"
    />
  </Box>
}
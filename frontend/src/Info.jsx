import React from 'react';
import { Box, Typography, Paper, Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import cryptoImage from './images/Image.png';

// Styled components for elegant typography
const InfoTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  background: 'linear-gradient(45deg, #FFFFFF 30%, #CCCCCC 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)',
  letterSpacing: '0.5px',
}));

const InfoSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '60vmin',
  maxHeight: '600px',
  overflow: 'auto',
  background: 'linear-gradient(145deg, #111 0%, #0a0a0a 100%)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 0 0 1px #333, 0 0 20px rgba(255, 255, 255, 0.2)',
  border: '1px solid #222',
  color: theme.palette.text.primary,
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#444',
    borderRadius: '4px',
  }
}));

const HighlightText = styled('span')({
  color: '#fff',
  fontWeight: 500,
  textShadow: '0 0 5px rgba(255,255,255,0.3)',
});

const ImageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  '& img': {
    maxWidth: '100%',
    maxHeight: '150px',
    borderRadius: theme.spacing(1),
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    border: '1px solid #333',
  }
}));

function Info() {
  return (
    <Box sx={{ 
      width: '85vmin', 
      maxWidth: '700px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '100%' 
    }}>
      <InfoSection>
        <InfoTitle variant="h4">
          Crypto Price App
        </InfoTitle>
        
        <Divider sx={{ 
          my: 1, 
          bgcolor: 'rgba(255,255,255,0.7)',
          width: '30px',
          borderWidth: 1.5
        }}/>
        
        <Typography variant="body2" sx={{ mb: 1.5, lineHeight: 1.6, color: '#AAAAAA', fontSize: '0.85rem' }}>
          The <HighlightText>Crypto Price App</HighlightText> provides real-time cryptocurrency price data powered by 
          Chainlink Data Feeds. This decentralized oracle network ensures price information is accurate and reliable.
        </Typography>
        
        <ImageContainer>
          <img 
            src={cryptoImage} 
            alt="Crypto Price Interface" 
            loading="lazy"
          />
        </ImageContainer>
        
        <Typography variant="h6" sx={{ mb: 1, color: '#FFFFFF', fontWeight: 600, fontSize: '1rem' }}>
          Key Features
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 0.5, lineHeight: 1.5, color: '#AAAAAA', fontSize: '0.85rem' }}>
          • <HighlightText>Real-time Data:</HighlightText> Get the latest cryptocurrency prices from blockchain oracles
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5, lineHeight: 1.5, color: '#AAAAAA', fontSize: '0.85rem' }}>
          • <HighlightText>Multiple Pairs:</HighlightText> Support for BTC/USD, ETH/USD, LINK/USD, and more
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5, lineHeight: 1.5, color: '#AAAAAA', fontSize: '0.85rem' }}>
          • <HighlightText>Blockchain Verified:</HighlightText> All price data sourced from the Chainlink network
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.5, color: '#AAAAAA', fontSize: '0.85rem' }}>
          • <HighlightText>Simple Interface:</HighlightText> Elegant, user-friendly design for easy navigation
        </Typography>
        
        <Divider sx={{ my: 1, bgcolor: 'rgba(255,255,255,0.1)' }}/>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
          <Typography variant="caption" sx={{ color: '#777777', opacity: 0.6, fontSize: '0.75rem' }}>
            Powered by Chainlink Data Feeds
          </Typography>
        </Box>
      </InfoSection>
    </Box>
  );
}

export default Info;

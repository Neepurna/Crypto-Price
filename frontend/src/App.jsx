import React, { useState } from 'react';
import { ethers } from 'ethers';
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Button, 
  Alert, 
  CircularProgress, 
  Divider,
  Radio,
  FormControlLabel
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import './App.css';
import Info from './Info'; // Import the Info component

function App() {
  const [storedPrice, setStoredPrice] = useState('');
  const [item, setItem] = useState({ pairs: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { pairs } = item;

  const contractAddress = '0xC5c207D3A91BE55BAAD2301C9210f63b7e4e6AAe';
  
  const availablePairs = ["LINK/USD", "BTC/ETH", "ETH/USD","BTC/USD"];
  
  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "pair",
          "type": "string"
        }
      ],
      "name": "getChainlinkDataFeedLatestAnswer",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  const getPair = async () => {
    if (!pairs) {
      setError("Please select a conversion pair");
      return;
    }
    
    setLoading(true);
    setError('');
    setStoredPrice('');
    
    try {
      const contractPrice = await contract.getChainlinkDataFeedLatestAnswer(pairs);
      if (pairs === 'BTC/ETH') {
        setStoredPrice(parseInt(contractPrice) / 10 ** 18);
      } else {
        setStoredPrice('$' + parseInt(contractPrice) / 10 ** 8);
      }
    } catch (err) {
      console.error("Error fetching price:", err);
      if (err.reason) {
        setError(err.reason);
      } else {
        setError("Failed to fetch price data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setStoredPrice('');
    setError('');
    setItem((prevState) => ({
      ...prevState,
      pairs: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPair();
  };

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FFFFFF', // White as primary color
      },
      secondary: {
        main: '#CCCCCC', // Light gray as secondary
      },
      background: {
        paper: '#121212', // Dark background for cards
        default: '#000000', // Black default background
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#AAAAAA',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body2: {
        fontSize: '0.85rem',
      },
      caption: {
        fontSize: '0.75rem',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: '0.5rem 1rem',
            backgroundColor: '#1A1A1A', // Dark gray header
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '0.75rem',
            '&:last-child': {
              paddingBottom: '0.75rem',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container 
        maxWidth="100%" 
        disableGutters 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #111 0%, #000 100%)',
        }}
      >
        {/* Two-column layout with Grid */}
        <Grid container spacing={3} sx={{ mx: 2, alignItems: 'center', justifyContent: 'center' }}>
          {/* Info component on the left */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Info />
          </Grid>
          
          {/* Tablet on the right */}
          <Grid item xs={12} md={7} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box 
              className="tablet-frame"
              sx={{
                width: '85vmin',
                height: '60vmin',
                maxWidth: '700px',
                maxHeight: '600px',
                borderRadius: '18px',
                backgroundColor: '#000000',
                padding: '8px',
                position: 'relative',
                boxShadow: '0 0 0 8px #333, 0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 40px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box 
                className="tablet-notch" 
                sx={{ 
                  height: '8px', 
                  position: 'relative', 
                  textAlign: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#444',
                    borderRadius: '50%',
                    top: '1px',
                    left: 'calc(50% - 3px)',
                  }
                }}
              />
              
              <Box
                className="tablet-display"
                sx={{
                  flex: 1,
                  backgroundColor: 'background.default',
                  borderRadius: '10px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* ...existing tablet content... */}
                <Box sx={{ textAlign: 'center', mb: 0.5 }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      color: 'primary.main', 
                      textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)',
                      mb: 0.5
                    }}
                  >
                    Crypto Price
                  </Typography>
                  <Divider 
                    sx={{ 
                      width: '30px', 
                      margin: '0 auto', 
                      borderColor: 'rgba(255,255,255,0.7)',
                      borderWidth: 1.5
                    }} 
                  />
                </Box>
                
                <Grid container spacing={1} sx={{ flex: 1, mt: 0.5 }}>
                  <Grid item xs={5}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        background: 'linear-gradient(145deg, #111 0%, #0a0a0a 100%)',
                        border: '1px solid #222'
                      }}
                    >
                      <CardHeader 
                        title={<Typography variant="h5">Select Pair</Typography>} 
                        sx={{ 
                          py: 0.75,
                          borderBottom: '1px solid #333'
                        }}
                      />
                      <CardContent 
                        sx={{ 
                          height: 'calc(100% - 40px)', 
                          display: 'flex', 
                          flexDirection: 'column',
                          p: 1
                        }}
                      >
                        <Box sx={{ 
                          overflow: 'auto', 
                          flex: 1,
                          '&::-webkit-scrollbar': {
                            width: '4px',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#444',
                            borderRadius: '4px',
                          }
                        }}>
                          {availablePairs.map(pair => (
                            <Box 
                              key={pair} 
                              onClick={() => {
                                setItem((prevState) => ({
                                  ...prevState,
                                  pairs: pair,
                                }));
                                setStoredPrice('');
                                setError('');
                              }}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: pairs === pair ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                borderRadius: 1,
                                mb: 0.5,
                                p: 0.75,
                                cursor: 'pointer',
                                border: pairs === pair ? '1px solid #555' : '1px solid #222',
                                '&:hover': {
                                  backgroundColor: pairs === pair ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                                  boxShadow: pairs === pair ? '0 0 8px rgba(255,255,255,0.1)' : 'none'
                                }
                              }}
                            >
                              <Radio 
                                checked={pairs === pair}
                                size="small"
                                sx={{ 
                                  p: 0.25, 
                                  mr: 0.5,
                                  color: '#666',
                                  '&.Mui-checked': {
                                    color: '#fff',
                                  }
                                }}
                              />
                              <Typography variant="body2">{pair}</Typography>
                            </Box>
                          ))}
                        </Box>
                        
                        {error && (
                          <Alert 
                            severity="error" 
                            sx={{ 
                              py: 0, 
                              px: 1, 
                              mb: 1, 
                              fontSize: '0.75rem',
                              alignItems: 'center',
                              minHeight: '32px',
                              backgroundColor: 'rgba(40, 40, 40, 0.8)',
                              color: '#fff',
                              border: '1px solid #555'
                            }}
                          >
                            {error}
                          </Alert>
                        )}
                        
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={getPair}
                          disabled={loading || !pairs}
                          size="small"
                          sx={{ 
                            mt: 2, // Use a specific margin instead of 'auto'
                            position: 'relative',
                            top: '-40px', // Move up by 40px from its natural position
                            fontSize: '0.8rem',
                            borderColor: '#555',
                            color: '#fff',
                            '&:hover': {
                              borderColor: '#fff',
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              boxShadow: '0 0 10px rgba(255,255,255,0.2)'
                            },
                            '&.Mui-disabled': {
                              color: '#555',
                              borderColor: '#333'
                            }
                          }}
                        >
                          {loading ? (
                            <>
                              <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                              Loading...
                            </>
                          ) : 'Get Rate'}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={7}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        background: 'linear-gradient(145deg, #111 0%, #0a0a0a 100%)',
                        border: '1px solid #222'
                      }}
                    >
                      <CardHeader 
                        title={<Typography variant="h5">Conversion Result</Typography>} 
                        sx={{ 
                          py: 0.75,
                          borderBottom: '1px solid #333'
                        }}
                      />
                      <CardContent 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 'calc(100% - 40px)'
                        }}
                      >
                        {loading ? (
                          <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress 
                              size={30} 
                              sx={{ 
                                color: '#fff',
                                opacity: 0.7
                              }} 
                            />
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              Fetching latest rate...
                            </Typography>
                          </Box>
                        ) : storedPrice ? (
                          <Box sx={{ textAlign: 'center', width: '100%' }}>
                            <Typography variant="body2" color="text.secondary">
                              {pairs}
                            </Typography>
                            <Typography variant="h3" sx={{ fontSize: '1.5rem', my: 1, color: '#777' }}>
                              ➡
                            </Typography>
                            <Typography 
                              variant="h2" 
                              sx={{ 
                                fontSize: '1.75rem', 
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.4)'
                              }}
                              className="glow-text-white"
                            >
                              {storedPrice}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                              Updated {new Date().toLocaleTimeString()}
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ textAlign: 'center', color: '#666' }}>
                            <CurrencyExchangeIcon sx={{ fontSize: '2rem', opacity: 0.5, mb: 1 }} />
                            <Typography variant="body2">
                              Select a pair and click<br />"Get Rate"
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Box sx={{ textAlign: 'center', mt: 0.75 }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ opacity: 0.6 }}
                  >
                    Powered by Chainlink Data Feeds
                  </Typography>
                </Box>
              </Box>
              
              <Box 
                className="tablet-home-button" 
                sx={{ 
                  position: 'absolute',
                  bottom: '3px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '20px',
                  border: '1px solid #444',
                  borderRadius: '50%',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;

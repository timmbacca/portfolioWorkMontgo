import React, { useState, useRef, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, TextField, Button, IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import { sendMessage } from '../api/chatApi';


interface Message {
  text: string;
  sender: 'user' | 'bot';
}


const WidgetContainer = styled('div')({
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 1100, 
});

const ToggleButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: 60,
  height: 60,
  boxShadow: theme.shadows[4],
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ChatWindow = styled(Paper)(({ theme }) => ({
  width: 350,
  height: 500,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[8],
  overflow: 'hidden',
  border: `2px solid ${theme.palette.divider}`,
  animation: 'slide-in 0.3s ease-out',
  '@keyframes slide-in': {
    'from': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    'to': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

const MessageBubble = styled(Paper)<{ sender: 'user' | 'bot' }>(({ theme, sender }) => ({
  padding: theme.spacing(1, 1.5),
  borderRadius: '20px',
  maxWidth: '80%',
  wordWrap: 'break-word',
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  backgroundColor: sender === 'user' ? theme.palette.primary.main : theme.palette.background.paper,
  color: sender === 'user' ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderBottomRightRadius: sender === 'user' ? '4px' : '20px',
  borderBottomLeftRadius: sender === 'user' ? '20px' : '4px',
}));

const InputArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const ChatWidget: React.FC = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm a Gemini-powered assistant. What do you want to know about Tim?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => {
    if (isOpen) {
      setMessages([
        { text: "Hello! I'm a Gemini-powered assistant. How can I help you today?", sender: 'bot' }
      ]);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const botResponse = await sendMessage(inputValue);
      const botMessage: Message = { text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      const errorMessage: Message = { text: "Sorry, I'm having trouble connecting to the AI. Please try again later.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <WidgetContainer>
      {isOpen && (
        <ChatWindow elevation={3}>
          <ChatHeader>
            <Typography variant="h6" component="h2" sx={{ fontFamily: 'BlenderProBook, Arial, sans-serif' }}>
              Ask about Tim
            </Typography>
            <IconButton onClick={toggleChat} size="small">
              <CloseIcon sx={{ color: theme.palette.primary.contrastText }} />
            </IconButton>
          </ChatHeader>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <MessageBubble key={index} sender={msg.sender} elevation={1}>
                {msg.text}
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          <InputArea>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  fontFamily: 'BlenderProBook, Arial, sans-serif',
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              sx={{ ml: 1, borderRadius: '20px', fontFamily: 'BlenderProBook, Arial, sans-serif' }}
            >
              Send
            </Button>
          </InputArea>
        </ChatWindow>
      )}
      {!isOpen && (
        <ToggleButton onClick={toggleChat}>
          <ChatIcon />
        </ToggleButton>
      )}
    </WidgetContainer>
  );
};

export default ChatWidget;
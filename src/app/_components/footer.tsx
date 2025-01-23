const Footer = () => {
    const paragraph = {
      color: '#2093D6',
      fontSize: '1rem',
      textAlign: 'center',
      background: '#F5F3F3',
      padding: '0.2rem',
    };
    
    return (
      <footer style={{ margin: '0', padding: '0.5rem', backgroundColor: '#f5f3f3' }}>
        <p style={paragraph}>&copy; 2025 Group 16. All rights reserved.</p>
        <p style={paragraph}>Our mission: To support and connect volunteers worldwide.</p>
      </footer>
    );
  };
  
  export default Footer;
  
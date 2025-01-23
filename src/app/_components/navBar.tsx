"use client";

const Navbar = () => {
  const linkStyle ={textDecoration: "none", color: "black", fontSize: "1rem"};
  const hoverStyle = {color: "#2093D6"};
  return (
    <nav style={{ display: "flex", justifyContent: "end", gap: "8grem", padding: "1.5rem", background: "#F5F3F3" }}>
      <a href="/home" style={linkStyle}
        onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
        onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}>
      Home
      </a>
      <a href="/contact" style={linkStyle}
        onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
        onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}>
      About Us
      </a>
      <a href="/about" style={linkStyle}
        onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
        onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}>
      Contact Us
      </a>
    </nav>
  );
};

export default Navbar;



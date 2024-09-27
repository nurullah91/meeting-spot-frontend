import { useState, useEffect } from "react";
import { Button } from "antd";
import { motion } from "framer-motion";
import { primaryButton } from "../../config/themeConfig";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            zIndex: 1000,
          }}
        >
          <Button
            type="primary"
            shape="circle"
            size="large"
            title="Scroll to top"
            onClick={scrollToTop}
            style={primaryButton}
          >
            ↑
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default ScrollToTop;

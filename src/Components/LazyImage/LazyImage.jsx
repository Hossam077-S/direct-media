import React, { useEffect, useRef, useState } from "react";

const LazyImage = ({ src, alt, className }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    let observer = new IntersectionObserver(callback);
    const currentRef = ref.current; // Create a variable to hold ref.current

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(currentRef); // Use the variable here
        }
      });
    }

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return inView ? (
    <img ref={ref} src={src} alt={alt} className={className} />
  ) : (
    <img
      ref={ref}
      alt={alt}
      style={{
        backgroundColor: "#f0f0f0",
      }}
      className={className}
    />
  );
};

export default LazyImage;

import React, { useEffect, useState } from 'react';

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Wrapper Component for Client-Side Rendering
// Any Component Wrapped in this will be rendered client-side only (skips server side rendering default option)
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function ClientOnly({ children, ...delegated }) {
    const [hasMounted, setHasMounted] = React.useState(false);
    React.useEffect(() => {
      setHasMounted(true);
    }, []);
    if (!hasMounted) {
      return null;
    }
    return (
      <div {...delegated}>
        {children}
      </div>
    );
  }

export default ClientOnly;
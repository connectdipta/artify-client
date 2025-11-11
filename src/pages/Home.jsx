import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import HeroSlider from "../components/HeroSlider";
import FeaturedArtworks from "../components/FeaturedArtworks";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate initial loading (e.g. hero images prefetch)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-10">
      <HeroSlider />
      <FeaturedArtworks />
    </div>
  );
}

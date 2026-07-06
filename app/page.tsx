"use client";

import Navigation from "./components/Navigation";
import JoinUs from "./components/JoinUs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-stretch p-8">
      <Navigation />
      <section className="h-200"></section>
      <JoinUs />
      <Footer />
    </main>
  );
}

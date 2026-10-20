import './globals.css';

export const metadata = {
  title: "Pip's Nursery — Baby's First Portfolio",
  description: "Official Track 1 portfolio for Pip the Skull Baby, Junior Dream Engineer at Midnight Nursery.",
};

// code!
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-pink-300 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
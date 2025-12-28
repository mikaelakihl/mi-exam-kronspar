import './index.css';

const Header = () => {
  return (
    <header className="bg-primary h-[20%]">
      {/* Desktop menu */}
      <div className="flex gap-2">
        <button className="bg-accent text-p-white">Registrera</button>
        <button className="bg-accent text-p-white">Logga in</button>
      </div>

      <h1>Kronspar</h1>
    </header>
  );
};

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <h2>Welcome to Kronspar</h2>
      </main>
      <footer className="bg-primary h-[20%]">
        <p>Copyright 2025 Kronspar</p>
      </footer>
    </div>
  );
};

export default App;

import { Outlet } from "react-router";
import { Header } from "../components/Header";

export const Layout = () => {
    return (
        <div className="flex flex-col lg:h-screen lg:overflow-hidden">
            <Header />
            <main className="flex-1 bg-gradient lg:px-30 overflow-hidden flex-col flex">
                <Outlet />
            </main>
            <footer className="bg-secondary/60 text-primary p-4 text-center">
                <p>Copyright 2026 Kronspar</p>
            </footer>
        </div>
    );
};
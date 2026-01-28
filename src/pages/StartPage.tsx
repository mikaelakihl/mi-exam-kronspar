
import { CommentSection } from "../components/CommentSection";
import { Hero } from "../components/Hero";


export const StartPage = () => {
    return (
        <section className="flex flex-col gap-4">
            <Hero />

            <CommentSection />
        </section>
    );
};
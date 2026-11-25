import { content, type Locale } from "@/content";
import { ContentProvider } from "@/content/context";
import { About } from "./about";
import { CommandMenu } from "./command-menu";
import { Contact } from "./contact";
import { Experience } from "./experience";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { Navbar } from "./navbar";
import { Projects } from "./projects";
import { ScrollProgress } from "./scroll-progress";
import { Skills } from "./skills";
import { SmoothScroll } from "./smooth-scroll";
import { Systems } from "./systems";
import { Writing } from "./writing";

export function HomePage({ locale }: { locale: Locale }) {
  const c = content[locale];
  return (
    <ContentProvider locale={locale}>
      <SmoothScroll>
        <a
          href="#about"
          className="sr-only z-[100] rounded-full bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:top-4 focus:start-4"
        >
          {c.ui.skip}
        </a>
        <ScrollProgress />
        <Navbar />
        <CommandMenu />
        <main>
          <Hero />
          <About />
          <Experience />
          <Systems />
          <Projects />
          <Writing />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </ContentProvider>
  );
}

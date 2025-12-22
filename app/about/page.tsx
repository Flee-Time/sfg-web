import Timeline from "@/components/Timeline";

/*eslint-disable */
export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto p-4 md:p-8 font-sans">
      <div className="space-y-12">
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
            // whoami
          </h2>
          <div className="space-y-4 text-foreground leading-relaxed">
            <p className="text-lg font-medium">
              Hi, I’m Koray. I’ve been messing with microcontrollers since I was
              eleven.
            </p>
            <p className="text-muted">
              I've pivoted to a lot of other things since then; Industrial
              Automation, Linux, and software dev. But at the core, I still just
              love messing with stuff.
            </p>
            <p className="text-muted">
              I made it official eventually: graduated top of my class in
              Computer Programming at <b>Bursa Uludağ University</b>, did some
              time in corporate dev at <b>Bosch</b>, and built autonomous
              underwater vehicles for <b>TEKNOFEST</b>. Now I'm diving into
              Management Information Systems.
            </p>
          </div>
        </section>

        <section>
          <Timeline />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border-subtle p-6 rounded-lg bg-surface flex flex-col justify-between">
            <div>
              <h3 className="text-blue-500 font-mono text-sm mb-4 uppercase tracking-wider">
                Daily Driver
              </h3>
              <ul className="space-y-3 text-sm font-mono">
                <li className="flex justify-between border-b border-border-subtle/50 pb-1">
                  <span className="text-muted">OS:</span>
                  <span className="text-foreground">
                    Linux (Arch + KDE Plasma)
                  </span>
                </li>
                <li className="flex justify-between border-b border-border-subtle/50 pb-1">
                  <span className="text-muted">Editor:</span>
                  <span className="text-foreground">VS Code</span>
                </li>
                <li className="flex justify-between border-b border-border-subtle/50 pb-1">
                  <span className="text-muted">Shell:</span>
                  <span className="text-foreground">zsh + omz</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="text-muted">Hardware:</span>
                  <span className="text-foreground">Zephyrus G15 (2022)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-border-subtle p-6 rounded-lg bg-surface">
            <h3 className="text-blue-500 font-mono text-sm mb-4 uppercase tracking-wider">
              Toolbox
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "C / C++",
                "C#",
                "Python",
                "React",
                "SQL",
                "Linux",
                "Docker",
                "Solidworks",
                "Git",
              ].map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] border border-border-subtle px-2 py-0.5 rounded text-muted bg-background"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
            // Disclaimer
          </h2>
          <p className="text-foreground italic">
            "Documenting the projects i do, successful or not."
          </p>
          <p className="mt-4 text-muted text-sm leading-relaxed">
            These are personal notes, not tutorials. The code/configs here might
            not be the most optimized (sorry elitists), but it gets the job
            done.
            <br />
            <br />I document my projects as they happen, so things might be
            outdated. Also, many of the stuff I do is semi to pure jank.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t border-border-subtle pt-8">
          <div className="flex gap-6 font-mono text-sm">
            <a
              href="https://github.com/Flee-Time"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span className="text-muted">|</span>
            <a
              href="mailto:koraybilir@sfg.quest"
              className="text-muted hover:text-foreground transition-colors"
            >
              Email
            </a>
            <span className="text-muted">|</span>
            <a
              href="https://matrix.to/#/@fleetime:matrix.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              Matrix
            </a>
            <span className="text-muted">|</span>
            <a
              href="https://www.linkedin.com/in/fleetimee/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
/*eslint-enable */

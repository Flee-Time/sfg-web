"use client";

import { useState } from "react";

const timelineData = [
  {
    year: "Oct 2024 - Present",
    title: "Management Information Systems",
    place: "Anadolu University",
    description:
      "Bachelor's Degree. Rounding out technical skills with formal data infrastructure and business context.",
    type: "education",
  },
  {
    year: "Oct 2023 - Jun 2024",
    title: "Software Developer (Intern)",
    place: "Bosch Türkiye",
    description:
      "Developed internal tools and automated manufacturing workflows. Experience with corporate dev cycles and low-code integration.",
    type: "work",
  },
  {
    year: "Aug 2022 - Jul 2024",
    title: "Computer Programming",
    place: "Bursa Uludağ University",
    description:
      "Associate's Degree (Valedictorian). Validated core programming concepts while independently studying low-level systems and C++ in parallel.",
    type: "education",
  },
  {
    year: "2022",
    title: "Team Lead - Underwater Systems",
    place: "TEKNOFEST",
    description:
      "Ported ArduSub firmware to ESP32 to run on custom hardware. Designed the system architecture and handled full hardware/software integration.",
    type: "project",
  },
  {
    year: "2018 - 2022",
    title: "Industrial Automation Tech",
    place: "High School",
    description:
      "Specialized in PLC programming, pneumatics, and circuit design basics.",
    type: "education",
  },
  {
    year: "2016",
    title: "Personal License",
    place: "Unity",
    description:
      "Activated my Unity license. Started with UnityScript (JS) until they deprecated it. Forced to migrate to C# to keep my projects alive.",
    type: "origin",
  },
  {
    year: "2015",
    title: "Starly Client",
    place: "Minecraft 1.8.8",
    description:
      "Released my own hacked client. Reverse-engineered the game's obfuscated Java bytecode because why not. Hosted on Weebly, after all these years.",
    type: "origin",
  },
  {
    year: "2014",
    title: "The Catalyst",
    place: "Arduino",
    description: "Got my first Arduino Uno. Where it all began.",
    type: "origin",
  },
  {
    year: "2013",
    title: "The English Language",
    place: "YouTube",
    description:
      "Learned English from watching Let's Players. Didn't understand a single word at first, but kept watching until I did.",
    type: "origin",
  },
  {
    year: "Feb 2003",
    title: "Born",
    place: "Türkiye",
    description: "Hello world.",
    type: "origin",
  },
];
/*eslint-disable */ 
export default function Timeline() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border-subtle rounded-lg bg-surface overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-background/50 transition-colors"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-blue-500 font-bold">
          // View Career Timeline
        </span>
        <span className={`text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ↓
        </span>
      </button>

      <div
        className={`
          grid transition-[grid-template-rows] duration-500 ease-in-out
          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-2">
            <div className="relative border-l border-border-subtle ml-3 space-y-12 my-4">
              {timelineData.map((item, index) => (
                <div key={index} className="relative pl-8 group">
                  
                  <div 
                    className={`
                      absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full border border-surface ring-4 ring-surface
                      ${item.type === 'education' ? 'bg-blue-500' : ''}
                      ${item.type === 'work' ? 'bg-green-500' : ''}
                      ${item.type === 'project' ? 'bg-orange-500' : ''}
                      ${item.type === 'certificate' ? 'bg-purple-500' : ''}
                      ${item.type === 'origin' ? 'bg-foreground' : ''} /* Changed to foreground (black/white) */
                    `} 
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="font-mono text-xs text-muted shrink-0 w-36 mb-1 sm:mb-0">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="text-foreground font-bold text-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                        @{item.place}
                      </p>
                      <p className="text-sm text-muted leading-relaxed max-w-prose">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-6 pb-2">
              <button 
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-mono text-muted hover:text-foreground transition-colors"
              >
                  [ close timeline ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*eslint-enable */
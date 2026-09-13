/** @format */

import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/Rekapin2.png"
          title="Rekapin"
          description="AI-powered financial management platform designed to help MSMEs manage their financial records and business insights."
          link="https://capstone-project-rekapin.vercel.app/"
        />
        <ProjectCard
          src="/LearningBuddy.png"
          title="Learning Buddy"
          description="AI-powered learning companion designed to make online learning more personal, interactive, and motivating."
          link="https://github.com/AliAvvvv/Projek-Capstone-Learning-Buddy"
        />
        <ProjectCard
          src="/Unpam.png"
          title="Information Portal"
          description="A university information portal designed to provide academic and campus information in a structured and accessible interface."
          link="https://github.com/rffadhil/Tugas-Sub-Web-Unpam"
        />
      </div>
    </div>
  );
};

export default Projects;

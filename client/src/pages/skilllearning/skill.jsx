import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaAngular, FaCloud, FaJava, FaJs, FaNodeJs, FaPython, FaReacteurope, FaShieldAlt, FaVuejs } from "react-icons/fa";
import { TbBrandDjango } from "react-icons/tb";
import { SiAdobexd, SiCplusplus, SiCsharp, SiCypress, SiDart, SiEthereum, SiExpress, SiFigma, SiInvision, SiSelenium, SiSketch, SiSpringboot, SiTensorflow, SiTypescript } from "react-icons/si";


const skills = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React.js", link: "https://react.dev/", icon: <FaReacteurope /> },
      { name: "Vue.js", link: "https://vuejs.org/", icon:<FaVuejs /> },
      { name: "Angular", link: "https://angular.io/", icon: <FaAngular />},
      { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: <FaJs /> },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", link: "https://nodejs.org/", icon: <FaNodeJs /> },
      { name: "Django", link: "https://www.djangoproject.com/", icon: <TbBrandDjango /> },
      { name: "Spring Boot", link: "https://spring.io/projects/spring-boot", icon:<SiSpringboot /> },
      { name: "Express.js", link: "https://expressjs.com/", icon: <SiExpress /> },
    ],
  },
  {
    category: "Software Testing",
    skills: [
      { name: "Selenium", link: "https://www.selenium.dev/", icon: <SiSelenium /> },
      { name: "Cypress", link: "https://www.cypress.io/", icon: <SiCypress /> },
      { name: "JUnit", link: "https://junit.org/", icon: <FaJava  /> },
      { name: "TestNG", link: "https://testng.org/doc/", icon: <FaJava  /> },
    ],
  },
  {
    category: "Trending IT Skills",
    skills: [
      { name: "AI & Machine Learning", link: "https://www.tensorflow.org/", icon: <SiTensorflow /> },
      { name: "Blockchain", link: "https://ethereum.org/", icon: <SiEthereum /> },
      { name: "Cybersecurity", link: "https://www.coursera.org/browse/computer-science/cybersecurity", icon: <FaShieldAlt /> },
      { name: "Cloud Computing", link: "https://aws.amazon.com/what-is-cloud-computing/", icon: <FaCloud /> },
    ],
  },
  {
    category: "UI/UX Design",
    skills: [
      { name: "Figma", link: "https://www.figma.com/", icon: <SiFigma /> },
      { name: "Adobe XD", link: "https://www.adobe.com/products/xd.html", icon: <SiAdobexd /> },
      { name: "Sketch", link: "https://www.sketch.com/", icon: <SiSketch /> },
      { name: "InVision", link: "https://www.invisionapp.com/", icon: <SiInvision /> },
    ],
  },
  {
    category: "Programming Languages",
    skills: [
      { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: <FaJs /> },
      { name: "Python", link: "https://www.python.org/", icon: <FaPython /> },
      { name: "Java", link: "https://www.oracle.com/java/", icon: <FaJava /> },
      { name: "C#", link: "https://learn.microsoft.com/en-us/dotnet/csharp/", icon: <SiCsharp /> },
      { name: "Dart", link: "https://dart.dev/", icon: <SiDart /> },
      { name: "C", link: "https://en.wikipedia.org/wiki/C_(programming_language)", icon: <SiCplusplus /> },
      { name: "C++", link: "https://isocpp.org/", icon: <SiCplusplus /> },
      { name: "TypeScript", link: "https://www.typescriptlang.org/", icon: <SiTypescript /> },
    ],
  },
];

const SkillLearningPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Skill Learning Dashboard</h1>
      <input
        type="text"
        placeholder="Search skills..."
        className="w-full p-3 border rounded-lg mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((category, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-2xl shadow-lg transition">
            <h2 className="text-lg font-semibold text-center mb-4">{category.category}</h2>
            <div className="grid gap-3">
              {category.skills
                .filter((skill) => skill.name.toLowerCase().includes(search))
                .map((skill, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-2 bg-yellow-200 text-black px-4 py-2 rounded-md w-full hover:bg-blue-600 transition text-size-2xl"
                    onClick={() => window.open(skill.link, "_blank")}
                  >
                    {skill.icon} {skill.name}
                  </button>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillLearningPage;
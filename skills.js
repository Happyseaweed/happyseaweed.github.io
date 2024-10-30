const languageSkillsData = [
  { name: "C++", image: "./images/cpp_logo.png", title: "C++" },
  { name: "Java", image: "./images/java_logo.png", title: "Java" },
  { name: "Python", image: "./images/python_logo.png", title: "Python" },
  { name: "Typescript", image: "./images/ts_logo.png", title: "Typescript" },
  { name: "Javascript", image: "./images/js_logo.png", title: "Javascript" },
];

const librarySkillsData = [
  { name: "React", image: "./images/react_logo.png", title: "React" },
  { name: "NodeJS", image: "./images/node_logo.png", title: "NodeJS" },
  { name: "Three JS", image: "./images/threejs_logo.png", title: "ThreeJS" },
  { name: "OpenCV", image: "./images/opencv_logo.png", title: "OpenCV" },
  {
    name: "Media Pipe",
    image: "./images/mediapipe_logo.png",
    title: "Media Pipe"
  },
  { name: "Django", image: "./images/django_logo.png", title: "Django" },
  {
    name: "Springboot",
    image: "./images/springboot_logo.png",
    title: "Spring Boot"
  },
];

const otherSkillsData = [
  { name: "Git", image: "./images/git_logo.png", title: "Git" },
  { name: "Docker", image: "./images/docker_logo.png", title: "Docker" },
  { name: "Kubernetes", image: "./images/kub_logo.png", title: "Kubernetes" },
  { name: "AWS", image: "./images/aws_logo.png", title: "AWS" },
  {
    name: "Microsoft Azure",
    image: "./images/azure_logo.png",
    title: "MS Azure"
  },
  { name: "Figma", image: "./images/figma_logo.png", title: "Figma" },
  { name: "Blender", image: "./images/blender_logo.png", title: "Blender" },
];

document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".collapsible-header");
  const collapsible = document.querySelectorAll(".collapsible-header-container");

  console.log(collapsible);

  headers.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.parentElement.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  function populateSkills(containerId, skillsData) {
    const container = document.getElementById(containerId);

    skillsData.forEach(skill => {
        const skillSquare = document.createElement("div");
        skillSquare.className = "skill-square";

        const skillImage = document.createElement("img");
        skillImage.src = skill.image;
        skillImage.alt = skill.title;
        skillImage.className = "skill-image";

        const skillTitle = document.createElement("div");
        skillTitle.className = "skill-title";
        skillTitle.textContent = skill.title;

        skillSquare.appendChild(skillImage);
        skillSquare.appendChild(skillTitle);
        container.appendChild(skillSquare);
    });
  }

  populateSkills("languageSkillsContainer", languageSkillsData);
  populateSkills("librarySkillsContainer", librarySkillsData);
  populateSkills("otherSkillsContainer", otherSkillsData);

});

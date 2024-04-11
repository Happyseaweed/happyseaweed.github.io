const skillsData = [
  { name: "C++", image: "./images/cpp_logo.png", title: "C++" },
  { name: "Java", image: "./images/java_logo.png", title: "Java" },
  { name: "Python", image: "./images/python_logo.png", title: "Python" },
  { name: "Typescript", image: "./images/ts_logo.png", title: "Typescript" },
  { name: "Javascript", image: "./images/js_logo.png", title: "Javascript" },
  { name: "React", image: "./images/react_logo.png", title: "React" },
  { name: "Three JS", image: "./images/threejs_logo.png", title: "Three JS" },
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
  { name: "Git", image: "./images/git_logo.png", title: "Git" },
  { name: "Blender", image: "./images/blender_logo.png", title: "Blender" },
  {
    name: "Microsoft Azure",
    image: "./images/azure_logo.png",
    title: "Microsoft Azure"
  },
  { name: "Docker", image: "./images/docker_logo.png", title: "Docker" },
  { name: "Figma", image: "./images/figma_logo.png", title: "Figma" }
];

document.addEventListener("DOMContentLoaded", function () {
  const skillsContainer = document.getElementById("skillsContainer");

  skillsData.forEach((skill) => {
    const skillHtml = `
        <div class="skill-card">
          <img loading="lazy" src="${skill.image}" title="${skill.title}" alt="${skill.name}"/>
          <div class="skill-name">${skill.name}</div>
        </div>
      `;
    skillsContainer.innerHTML += skillHtml;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".collapsible-header");

  headers.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
});

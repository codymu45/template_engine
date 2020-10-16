const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {

  // 0 --> ? 
  //  var output = [1,2,3,4,5].map() Multi Paradigm Programming Language (OO vs Functional) 

  const html = [];

  html.push(employees.filter(employee => employee.getRole() === "Manager")
    .map(manager => writeManager(manager)).join("\n")
  );
  html.push(employees.filter(employee => employee.getRole() === "Engineer")
    .map(engineer => writeEngineer(engineer)).join("\n")
  );
  html.push(employees.filter(employee => employee.getRole() === "Intern")
    .map(intern => writeIntern(intern)).join("\n")
  );

  return writeMain(html.join("\n").trim());

};

const writeManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = writeInput(template, "name", manager.getName());
  template = writeInput(template, "role", manager.getRole());
  template = writeInput(template, "email", manager.getEmail());
  template = writeInput(template, "id", manager.getId());
  template = writeInput(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const writeEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = writeInput(template, "name", engineer.getName());
  template = writeInput(template, "role", engineer.getRole());
  template = writeInput(template, "email", engineer.getEmail());
  template = writeInput(template, "id", engineer.getId());
  template = writeInput(template, "github", engineer.getGithub());
  return template;
};

const writeIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = writeInput(template, "name", intern.getName());
  template = writeInput(template, "role", intern.getRole());
  template = writeInput(template, "email", intern.getEmail());
  template = writeInput(template, "id", intern.getId());
  template = writeInput(template, "school", intern.getSchool());
  return template;
};

const writeMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return writeInput(template, "team", html);
};

const writeInput = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
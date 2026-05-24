import { db } from "../tools/db.js";
import { createUser } from "../models/user.js";

await createUser({
  username: "admin",
  password: "admin123",
  role: "admin"
});

db.exec(`
  INSERT INTO staff (id, name, title, email, bio) VALUES
  (1, 'Dr Sarah Mitchell', 'Programme Leader', 'sarah.mitchell@example.ac.uk', 'Specialises in software engineering, web development and student employability.'),
  (2, 'Dr James Carter', 'Module Leader', 'james.carter@example.ac.uk', 'Teaches programming, databases and full-stack development.'),
  (3, 'Dr Priya Shah', 'Module Leader', 'priya.shah@example.ac.uk', 'Focuses on cyber security, secure systems and digital forensics.'),
  (4, 'Dr Emily Brown', 'Module Leader', 'emily.brown@example.ac.uk', 'Researches artificial intelligence, data science and machine learning.'),
  (5, 'Dr Michael Green', 'Programme Leader', 'michael.green@example.ac.uk', 'Leads postgraduate computing programmes and industry projects.');

  INSERT INTO programmes (id, title, level, description, published, programmeLeaderId) VALUES
  (1, 'BSc Computer Science', 'Undergraduate', 'A broad computing degree covering programming, databases, web development, software engineering and final year project work.', 1, 1),
  (2, 'BSc Cyber Security', 'Undergraduate', 'A specialist programme focused on secure systems, ethical hacking, digital forensics and network protection.', 1, 3),
  (3, 'BSc Software Engineering', 'Undergraduate', 'A practical course focused on designing, building, testing and maintaining reliable software systems.', 1, 1),
  (4, 'MSc Data Science', 'Postgraduate', 'A postgraduate programme covering data analysis, machine learning, visualisation and applied data-driven problem solving.', 1, 5),
  (5, 'MSc Artificial Intelligence', 'Postgraduate', 'A specialist postgraduate programme exploring machine learning, intelligent systems and responsible AI development.', 0, 5);

  INSERT INTO modules (id, title, description, moduleLeaderId) VALUES
  (1, 'Programming Fundamentals', 'Introduces core programming concepts, problem solving and software development practice.', 2),
  (2, 'Web Development', 'Covers HTML, CSS, JavaScript, accessibility and client-server interaction.', 2),
  (3, 'Database Systems', 'Explores relational databases, SQL, data modelling and data integrity.', 2),
  (4, 'Advanced Web Development', 'Develops server-side routing, MVC structure, validation, security and authentication.', 2),
  (5, 'Network Security', 'Introduces network threats, vulnerabilities and defensive security techniques.', 3),
  (6, 'Digital Forensics', 'Covers evidence collection, forensic analysis and cyber incident investigation.', 3),
  (7, 'Software Architecture', 'Focuses on maintainable system design, software patterns and architectural trade-offs.', 1),
  (8, 'Machine Learning', 'Introduces supervised and unsupervised learning methods for intelligent applications.', 4),
  (9, 'Data Visualisation', 'Explores techniques for communicating data clearly through visual design.', 4),
  (10, 'Final Year Project', 'A major independent project where students design, build, test and evaluate a computing artefact.', 1);

  INSERT INTO programme_modules (programmeId, moduleId, year) VALUES
  (1, 1, 1),
  (1, 2, 1),
  (1, 3, 2),
  (1, 4, 2),
  (1, 10, 3),

  (2, 1, 1),
  (2, 2, 1),
  (2, 5, 2),
  (2, 6, 2),
  (2, 10, 3),

  (3, 1, 1),
  (3, 2, 1),
  (3, 7, 2),
  (3, 4, 2),
  (3, 10, 3),

  (4, 8, 1),
  (4, 9, 1),
  (4, 3, 1),

  (5, 8, 1),
  (5, 4, 1),
  (5, 9, 1);

  INSERT INTO interests (programmeId, studentName, studentEmail) VALUES
  (1, 'Alex Taylor', 'alex.taylor@example.com'),
  (2, 'Jordan Smith', 'jordan.smith@example.com'),
  (4, 'Casey Morgan', 'casey.morgan@example.com');
`);

console.log("Database seeded successfully.");
console.log("Admin login: username = admin, password = admin123");
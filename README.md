Task Management Application Overview This application is a Task Management System built with React and Firebase, where users can create, update, view, and manage tasks in different categories. The app is designed to help users organize their tasks, set due dates, upload files, and sort tasks based on different criteria. It also includes a user authentication system to handle login/logout.

Features User Authentication:

Users can log in using their credentials. Firebase Authentication is used for secure user sign-in/sign-out. Task Management:

Users can view and manage tasks categorized into: All, Important, Completed, Due, and Incomplete. Tasks have properties like title, description, due date, file attachment, and category. File Upload:

Users can upload files associated with tasks, which are stored in Firebase Storage. Task Sorting:

Tasks can be sorted by title in ascending or descending order. Batch Task Deletion:

Multiple tasks can be selected and deleted at once. Tech Stack Frontend:

React (with hooks) Tailwind CSS for styling Firebase for backend services (Firestore for database, Firebase Storage for file uploads, Firebase Authentication for user management) Backend:

Firebase Firestore (Database) Firebase Storage (for file handling) Components TaskList:

The main page displaying all tasks. Allows users to select a category, search tasks, sort tasks, and edit/delete tasks. Fetches task data from Firestore and displays tasks based on the selected category. Modifies task details, uploads files, and saves changes back to Firestore. Sidebar:

A sidebar to navigate between task categories such as All Tasks, Important Tasks, Completed Tasks, etc. Allows the user to filter tasks based on selected categories. TaskCard:

Represents each task in the task list. Displays task title, description, due date, and file attachment (if any). Allows users to click on a task to open a modal to edit the task details. Login:

A login form for users to authenticate using their email and password. Redirects the user to the Task Management page upon successful login. How to Run Locally Clone the repository:

bash Copy git clone cd Install dependencies:

bash Copy npm install Set up Firebase:

Create a Firebase project and enable Firestore and Firebase Storage. Update the firebaseConfig in firebaseConfig/firebase.js with your Firebase credentials. Run the application:

bash Copy npm run dev Visit http://localhost:3000 to view the app.

Firebase Setup You'll need to create a Firebase project and configure Firestore, Firebase Authentication, and Firebase Storage. Ensure that Firestore rules and Firebase Storage rules allow read and write operations based on user authentication.
Deployment Link-Task Management Application Overview This application is a Task Management System built with React and Firebase, where users can create, update, view, and manage tasks in different categories. The app is designed to help users organize their tasks, set due dates, upload files, and sort tasks based on different criteria. It also includes a user authentication system to handle login/logout.

Features User Authentication:

Users can log in using their credentials. Firebase Authentication is used for secure user sign-in/sign-out. Task Management:

Users can view and manage tasks categorized into: All, Important, Completed, Due, and Incomplete. Tasks have properties like title, description, due date, file attachment, and category. File Upload:

Users can upload files associated with tasks, which are stored in Firebase Storage. Task Sorting:

Tasks can be sorted by title in ascending or descending order. Batch Task Deletion:

Multiple tasks can be selected and deleted at once. Tech Stack Frontend:

React (with hooks) Tailwind CSS for styling Firebase for backend services (Firestore for database, Firebase Storage for file uploads, Firebase Authentication for user management) Backend:

Firebase Firestore (Database) Firebase Storage (for file handling) Components TaskList:

The main page displaying all tasks. Allows users to select a category, search tasks, sort tasks, and edit/delete tasks. Fetches task data from Firestore and displays tasks based on the selected category. Modifies task details, uploads files, and saves changes back to Firestore. Sidebar:

A sidebar to navigate between task categories such as All Tasks, Important Tasks, Completed Tasks, etc. Allows the user to filter tasks based on selected categories. TaskCard:

Represents each task in the task list. Displays task title, description, due date, and file attachment (if any). Allows users to click on a task to open a modal to edit the task details. Login:

A login form for users to authenticate using their email and password. Redirects the user to the Task Management page upon successful login. How to Run Locally Clone the repository:

bash Copy git clone cd Install dependencies:

bash Copy npm install Set up Firebase:

Create a Firebase project and enable Firestore and Firebase Storage. Update the firebaseConfig in firebaseConfig/firebase.js with your Firebase credentials. Run the application:

bash Copy npm run dev Visit http://localhost:3000 to view the app.

Firebase Setup You'll need to create a Firebase project and configure Firestore, Firebase Authentication, and Firebase Storage. Ensure that Firestore rules and Firebase Storage rules allow read and write operations based on user authentication.
Deployment Link- https://gentle-chimera-bbffcb.netlify.app/



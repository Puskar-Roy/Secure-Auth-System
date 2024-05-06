<a name="readme-top"></a>

<br />
<div align="center">
  
 
<a href="https://github.com/Puskar-Roy/Attendance-System---Backend">
    <img src="./apps/web/public/authlogo.jpg" alt="Logo" width="150" height="120">
  </a>
  
<h3 align="center">AuthHub - An Advance Auth System 📝</h3>
  <p align="center">
    <br />
    <a href="https://github.com/Puskar-Roy/Secure-Auth-System"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://myauthhub.vercel.app">Go Live</a>
    ·
    <a href="https://github.com/Puskar-Roy/Secure-Auth-System/issues">Report Bug</a>
    ·
    <a href="https://github.com/Puskar-Roy/Secure-Auth-System/issues">Request Feature</a>
  </p>
</div>

##### Note: _Please be aware that our API is currently deployed in the free tier. This means that your free instance will spin down due to inactivity, potentially causing delays of 50 seconds or more in request handling._

![bingoctfgogreenlandingpage](./docs/assets/Screenshot%202024-05-06%20133903.png)

## Directory Structure 🌟

_Just a quick note to let you know that this is a **Monorepo**, built with the Monorepo framework **Turborepo**. This means that it contains multiple packages or projects in a single repository, making it easier to manage and share code across different parts of the application._

```bash
Secure-Auth-System/
  ├── turbo.json #Turborepo config
  ├── pnpm-workspace.yaml (if using pnpm)  #
  ├── README.md  # Project overview
  ├── apps/  #Main Apps
  │   ├── web/  # Next Js Frontend
  │   │   ├── public/  # Public assets
  │   │   └── src/  # Source code
  │   │
  │   └── server/  # Node JsBackend
  │       # ... (similar structure For An API)
  └── packages/
  │   ├── ui(shared-components)/
  │   │   ├── src/
  │   │   └── package.json
  │   └── config/  # Example utility package
  │       ├── src/
  │       └── package.json
  └── (Optional directories)
      ├── docs/  # Project documentation
  └── .gitignore  # Version control exclusions
```

## All Features 🌟

### 1. Role base Authentication (JWT, session-based)

#### Login Page

- Users can log in to their accounts using their credentials and OTP.

![attendance](./docs/assets/Screenshot%202024-05-06%20121439.png)

![attendance](./docs/assets/Screenshot%202024-05-06%20125211.png)

![attendance](./docs/assets/Screenshot%202024-05-06%20124833.png)

#### Register Page

- New users can create an account and verify his email to access the application.

![attendance](./docs//assets/Screenshot%202024-05-06%20121510.png)

![attendance](./docs//assets/Screenshot%202024-05-06%20125318.png)

### 2. Users Page

- Users can see all online users, see current device, manage all of his account and also signout from any device

![attendance](./docs//assets/Screenshot%202024-05-06%20124856.png)

- Users can view their Auth records.

![attendance](./docs//assets/Screenshot%202024-05-06%20124928.png)

- When a user is already logged in on one device, if someone logs in to another device using the same account credentials, we will send an email notification.

![attendance](./docs//assets/Screenshot%202024-05-06%20125247.png)

Note - _**When User Login or Logout UI will update autometic with the help of web sockets**_

### 3. Admin Panel

- Admins can view All User Details

![attendance](./docs/assets/Screenshot%202024-05-06%20132822.png)

- Admins can view and manage all users device and auth history

![attendance](./docs//assets/Screenshot%202024-05-06%20133106.png)

## Getting Started 🚀

### Prerequisites

Before you begin contributing to this project, make sure you have the following set up:

- [Node.js](https://nodejs.org/): A JavaScript runtime.
- [npm](https://www.npmjs.com/): The Node.js package manager.

### Run This ⌨️

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Puskar-Roy/Secure-Auth-System
   ```
2. **Install Dependencies:**
   ```bash
    npm install
   ```
3. **Add Environment Variables:**
   ```bash
   cd apps/web touch .env
   cd apps/server touch .env
   ```
4. **Add the necessary configuration:**

   ```bash
   #In apps/web Directory
   NEXT_PUBLIC_BACKENDURL=http://localhost:5050


   #In apps/server Directory
   PORT=5050
   DEV_MODE=DEV   #DEV or PROD
   FRONTENDURL=http://localhost:3000
   BACKENDURL=http://localhost:5050
   JWT_SECRET=<yourjwtsecret>
   JWT_COOKIE_EXPIRES_IN=3d
   EMAIL=<yourgmail>  #For Nodemailer
   PASSWORD=<yourpassword>  #For Nodemailer
   MONGOURI=<yourmongouri>
   ```

5. **Run This Project:**

   ```bash
   npm run dev
   ```

   <p align="right">(<a href="#readme-top">back to top</a>)</p>

### Run This Using Docker 🐟

_Please note that the currently API can only be run using Docker. Make sure you have Docker installed_

1. **Move Into API Directory**
   ```bash
   cd apps/server
   ```
2. **Build the Docker Image:**
   ```bash
    docker build -t server .
   ```
3. **Run the Docker Image:**

   ```bash
    docker run -e add-environmental-variables -p 5050:5050 server
   ```

    <p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section highlights the key frameworks and libraries that form the foundation of your project. Below are some notable examples:

- **[![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://www.typescriptlang.org/):** A superset of JavaScript that adds static types.
- **[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript):** The programming language of
- **[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/):** The database for modern applications.
- **[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/):** Cloud platform for serverless deployment and hosting.
- **[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/):** Pluggable linting utility for identifying and fixing code issues.
- **[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)](https://prettier.io/):** Opinionated code formatter to ensure consistent code styling the web.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing 🌟

### Making Contributions

We welcome and appreciate contributions from the community ❤️! Here's how you can contribute:

- **Open Issues:** Check for open issues or create a new one to start discussions.
- **Fork the Repository:** Fork the project to your own GitHub account.
- **Create Pull Request:** Make changes in your fork and submit a pull request.

### Welcome Contributors!

🚀 Thank you for considering contributing to this project! Your involvement makes this template even better. Feel free to explore the code, share your ideas, and make improvements ✌️.

🌟 Don't hesitate to reach out if you have any questions or need assistance. Together, let's make this project amazing!🟩

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Puskar Roy🖋️

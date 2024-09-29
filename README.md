# Learning Management System Angular Project

Here is a sample `README.md` file you can use for your Angular Learning Management System project:

```markdown
# Learning Management System

This is a Learning Management System (LMS) project built using Angular. The project includes role-based authentication and authorization, using a local JSON server to store and manage the data.

## Features

- User and Admin role-based authorization
- Authentication using local JSON server
- CRUD operations for managing learning content
- Responsive UI built with Angular

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v20.17.x or later)
- [Angular CLI](https://angular.io/cli) (v14.x or later)
- [JSON Server](https://www.npmjs.com/package/json-server) for mock backend data

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Set Up JSON Server

You'll need to install JSON Server to run the mock backend using the `db.json` file.

```bash
npm install -g json-server
```

### 4. Start JSON Server

Run the JSON server with the provided `db.json` file.

```bash
json-server --watch db.json
```

This will start the JSON server on `http://localhost:3000`, which the Angular app will interact with.

### 5. Start Angular Development Server

Now, start the Angular development server:

```bash
ng serve
```

Navigate to `http://localhost:4200` to view the application.

## Deployment on GitHub Pages

You can deploy the Angular app to GitHub Pages using the following steps.

### 1. Install Angular CLI GitHub Pages

First, install the Angular CLI GitHub Pages package globally:

```bash
npm install -g angular-cli-ghpages
```

### 2. Build the Application

Build your Angular application in production mode with the correct base href for GitHub Pages.

```bash
ng build --configuration production --base-href "https://<your-username>.github.io/<repo-name>/"
```

### 3. Deploy to GitHub Pages

Deploy the application using the `angular-cli-ghpages` command:

```bash
ngh
```

If the command above doesn't work, use the following command specifying the folder name:

```bash
ngh --dir dist/<your-app-name>
```

### 4. Verify Deployment

Visit `https://<your-username>.github.io/<repo-name>/` to verify your application is live.

## Troubleshooting

- If the build or deployment doesn't work, ensure that your GitHub repository settings allow GitHub Pages deployment from the `gh-pages` branch.
- Ensure that your base-href in the build command matches your GitHub repository name.

## Conclusion

This is a simple angular based project with mock db json server , made by Siddhant Thorat .
Deployed link : https://siddhantthorat.github.io/LearningManagementSystemAngularProject/login 
note : install json.server and run db.json then only you can run the deployed project
```

Make sure to replace the placeholders like `<your-username>`, `<repo-name>`, and `<your-app-name>` with your actual details.

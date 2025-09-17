# DevLink

## Setup and install instructions

- **Clone the project**

```
git clone git@github.com:Luka2Lkay/DevLink.git
cd DevLink
```

### Backend

1. **Navigate to the Backend directory**

`cd backend`

2. **Install Dependecies**

`npm install`

3. **Create a .env file**

```
CONNECTION_STRING=<YOUR_MONGODB_CONNECTION_STRING>
GITHUB_TOKEN=<YOUR_GITHUB_TOKEN>
JWT_SECRET_KEY=<YOUR_SECRET_KEY>
```

4. **Run the project**

`npm run dev`

### Frontend

1. **Navigate to the Frontend directory**

`cd frontend`

2. **Install dependencies**

`npm install`

3. **Run the project**

`npm run dev`

## Link to live deployments

_COMMING SOON!_

## Database configuration

1. Open your browser and enter the address to log in/ sign up: **https://account.mongodb.com/account/login**
2. Create a new project
3. Fill the **Name Your Projec** field and click next.
4. Click the **Create Project** button and you'll be redirected to the **Overview** page.
5. Click the **Create** button to create a cluster.
6. Choose the free plan, rename the cluster, and click the **Create Deployment** button.
7. Click the **Create Database User** button.
8. Click the **Choose a connection method** button.
9. Select **Drivers**
10. Run **npm install mongodb** in the terminal
11. Copy the coonectionn string and paste it in the **.env** file

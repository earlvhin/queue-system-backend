# Queue System Backend

### Pre-requisites
1. NodeJS version 12 and NPM
2. MariaDB or MySQL

### Setup
1. Install Necessary Tools for Development

```
sudo npm install -g nodemon n
```

2. Navigate to repo's directory and install packages

```
npm install
```

3. Run in Development Mode

```
npm run dev
```

4. Server should listen in port 5000. To check if API is working, visit:

```
http://localhost:5000/api/ping
```

### IMPORTANT: Database Setup
1. Open .env file and replace the following environment variables

```
DB_NAME=DB_NAME_HERE
DB_USERNAME=DB_USERNAME_HERE
DB_PASSWORD=DB_PASSWORD_HERE
```

2. **src/misc** folder includes a database file that you can use to test.
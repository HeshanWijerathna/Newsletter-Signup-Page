# 📌 Node.js Project

This is a Node.js application that integrates with the Mailchimp API to handle user signups. Follow the instructions below to set up and run the project on your local machine.

## 🚀 Getting Started

### 1️⃣ Clone the Repository
Open a terminal and run:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install Dependencies
Since `node_modules/` is not included in the repository, install the required packages:
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
1. Create a `.env` file in the project root.
2. Add the following variables and replace with your own values:
   ```env
   MAILCHIMP_API_KEY=your-api-key-here
   MAILCHIMP_SERVER_PREFIX=your-server-prefix-here
   MAILCHIMP_LIST_ID=your-list-id-here
   MAILCHIMP_ANY_STRING=any-string-here
   PORT=3000
   ```
3. **Do not share your `.env` file publicly!**

### 4️⃣ Start the Server
Run the project using:
```bash
npm start
```
or
```bash
nodemon server.js  # If nodemon is installed
```

### 5️⃣ Open in Browser
Go to:
```
http://localhost:3000
```

## 🔧 Troubleshooting
- If you get an error like `Error: Cannot find module 'express'`, make sure you installed dependencies using `npm install`.
- If `.env` variables are not loading, restart the server.
- For debugging, check logs in the terminal or run:
  ```bash
  npm run dev
  ```

---
### 🎯 You're all set! Enjoy coding! 🚀


# Title: CodeSummarizer Group 29

# Introduction:
The CodeSummarizer is a dynamic tool designed to enhance understanding and clarity of programming code across various languages. This project aims to provide human-readable summaries of code snippets, helping users get a better understanding of their uploaded code. With the capability to adapt and refine its summarizer techniques based on user feedback, this tool improves its effectivness over time and generates insightful statistical reports on user interactions and preferences. 

# Installation Instructions: 
# 1. install node.js:
Begin by installing Node.js if it is not already installed on your system. You can downloaded it from nodejs.org

# 2. Install Dependencies:
Navigate to the 'frontend' directory in your terminal or command prompt and run the following command to tinstall the necessary dependencies

npm install

repeat the process for the 'backend' directory

npm install

# 4. Start the backend server:
ensure that the backend server is running before you start the frontend.
In the backend directory, run
node server.js

# 5. Start the Frontend Application
Once the backend server is up and running, navigate to the 'frontend' directory and start the frontend application

npm start


# Configuration: 
# frontend
create a '.env' file in the root of your 'frontend' directory this file should include the variables that frontend uses to properly authenticate users. Variables included: 

REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID

# backend
set up supabase in line 12 of the server.js file. 
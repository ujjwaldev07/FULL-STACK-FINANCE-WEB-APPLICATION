💰 Finance Manager (Full Stack Web App):
A modern full-stack finance tracking application that helps users manage income, expenses, and financial insights in one place.
Built using React, Node.js, Express, and MongoDB, this app provides a clean UI with powerful tracking and analytics features.

🚀 Features:

🔐 Authentication:
Secure user login & signup system
Password hashing for security
JWT-based authentication
Protected routes

📊 Dashboard Overview:
View Total Balance
Track Total Income
Track Total Expenses
Real-time financial summary

📈 Analytics:
Monthly income vs expense (Bar Chart)
Income vs expense distribution (Donut Chart)
Visual insights into spending behavior

➕ Transaction Management:
Add Income / Expense
Select category
Add notes
Date-based tracking

📂 Categories:
Bills
Food
Entertainment
Healthcare
Travel

🔍 Filtering System:
Filter by category
Filter by date range
Easy financial analysis

📜 Transaction History:
Structured table view
Includes:
Date
Type
Category
Amount
Notes
Pagination support

🕘 Recent Transactions:
Quick view of latest activities

🎨 UI/UX:
Modern dark theme 🌙
Clean and minimal design
Responsive layout
Smooth user experience

🛠️ Tech Stack
Frontend:
React.js
HTML5
CSS3
JavaScript (ES6+)

Backend:
Node.js
Express.js

Database:
MongoDB (Mongoose)

⚙️ Installation & Setup:
1️⃣ Clone the repository
git clone https://github.com/ujjwaldev07/FULL-STACK-FINANCE-WEB-APPLICATION.git

2️⃣ Setup Backend:
cd backend
npm install
npm run dev

3️⃣ Setup Frontend:
cd frontend
npm install
npm run dev

☁️ Deploy on Render:
This repo is configured for easy Render deployment with `render.yaml`.

1) Push the latest code to GitHub.
2) In Render, choose **New +** → **Blueprint**.
3) Select this repository.
4) Render will create:
   - `finance-backend` (Node web service, rootDir: `backend`)
   - `finance-frontend` (Static site, rootDir: `frontend`)
5) In Render dashboard, set secure backend env vars:
   - `MONGO_URI`
   - `JWT_SECRET`
6) Update frontend env var `VITE_API_URL` to your real backend URL:
   - `https://<your-backend-service>.onrender.com/api`

🔗 API Endpoints:
 Method	          Endpoint	               Description
1) POST	      /api/auth/register	         Register user
2) POST	      /api/auth/login	             Login user
3) GET	      /api/transactions	           Get all transactions
4) POST	      /api/transactions	           Add transaction
5) DELETE	    /api/transactions/:id	       Delete transaction

📌 Future Improvements:
Export data (CSV / PDF)
Budget planning system
Recurring transactions
Notifications & reminders
Mobile app version 📱

🧠 Learning Highlights:
Full-stack architecture
REST API design
Authentication (JWT)
CRUD operations
Data visualization
State management in React

🤝 Contributing:
Contributions are welcome!
Fork the repo and submit a pull request.

📄 License:
This project is licensed under the MIT License.

👨‍💻 Author:
Ujjwal Singh

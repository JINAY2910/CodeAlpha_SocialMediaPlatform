# AlphaSphere 🌌

AlphaSphere is a premium, feature-rich MERN-stack social media platform engineered for visual excellence, high-end interactivity, and seamless connectivity. Featuring gorgeous frosted glassmorphism aesthetics, fluid transitions, and a customized navigation layout, it provides a state-of-the-art social browsing experience.

---

## ✨ Features

- 💎 **Premium Glassmorphic UI**: Fully overhauled authentication (Login/Register) screens wrapped in frosted glass containers with soft glowing teal-cyan borders, ambient space-indigo gradient backgrounds, and an ultra-thin customized scrollbar.
- 🔒 **Locked Viewport Navigation**: Configured browser-level window scroll lock on login pages to preserve a static, premium ambient background with dedicated internal card scrolling.
- 📝 **Flexible Post Composition**: 
  - **Images**: Dedicated upload option that strictly accepts only `.jpg`, `.jpeg`, and `.png` image formats.
  - **Attachments**: Generic upload option that supports generic files (videos, documents, PDFs, zip archives, etc.).
- 🎬 **Dynamic Feed Player & Downloader**: Natively plays uploaded videos within a stylized custom HTML5 video player and displays generic files as downloadable attachment cards.
- 🔗 **Interactive Social Sidebar**: Real-time editable Twitter and LinkedIn profiles on the sidebar widget, turning profile inputs into clickable external hyperlinks with modern edit overlays.
- 🌓 **Dynamic Dark/Light Mode**: Toggle smooth aesthetic sweeps across dark-slate space themes and bright clean teal interfaces.
- 🎨 **Unified Custom Branding**: Completely custom cosmic "AS" monogram branding and high-fidelity favicon assets throughout the tab bars, PWAs, and navbar headers.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Redux Toolkit, Material UI (MUI), React Dropzone, Formik, Yup
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Multer, JWT Authentication, Bcrypt
- **State Management**: Redux Toolkit & Redux Persist (local session backup)

---

## 📂 Project Structure

```text
CodeAlpha_SocialMediaPlatform/
├── client/                 # Frontend React Application
│   ├── public/             # Branding icons, manifest, index.html
│   └── src/
│       ├── components/     # Reusable UI widgets & Flex wrappers
│       ├── scenes/         # Page Views (loginPage, homePage, navbar)
│       └── state/          # Redux slices & action creators
├── server/                 # Backend Node.js / Express Server
│   ├── controllers/        # Route logic handlers (auth, users, posts)
│   ├── middleware/         # Security & token verification
│   ├── models/             # Mongoose Schemas (User, Post)
│   └── routes/             # REST API Endpoint specifications
└── README.md               # Main repository documentation
```

---

## 🚀 Installation & Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

---

### 1. Server Configuration

1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Define your environment variables in `.env`:
   ```env
   MONGO_URL=your_mongodb_connection_uri
   PORT=8000
   JWT_SECRET=your_jwt_secret_token_here
   ```
5. Start the backend server:
   ```bash
   npm run start
   ```
   *The server runs by default on [http://localhost:8000](http://localhost:8000).*

---

### 2. Client Configuration

1. Open a new terminal window and navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run start
   ```
   *The client dev environment launches at [http://localhost:3000](http://localhost:3000).*

---

## 🧑‍💻 Verification & Usage

1. **Authentication Overhaul**: Visit `http://localhost:3000` to view the modern, full-screen glassmorphic auth layouts.
2. **Interactive Socials**: Go to your profile sidebar inside the dashboard, hover over the edit pen next to Twitter/LinkedIn, enter your account links, click check, and click the direct hyperlink to open external social connections.
3. **Selective Uploads**: Toggle **Image** (strict `.jpg/.jpeg/.png` filter) or **Attachment** to publish distinct multimedia posts and watch the dynamic video feed player in action!

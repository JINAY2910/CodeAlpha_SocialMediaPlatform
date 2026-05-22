# AlphaSphere

AlphaSphere is a premium MERN-stack social media platform featuring a gorgeous, responsive glassmorphic interface with seamless dark/light modes. It delivers polished user interaction, including real-time editable social profiles and a versatile post feed supporting both high-definition images and rich media attachments.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Redux Toolkit, Material UI (MUI), React Dropzone
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Multer, JWT

---

## 📂 Folder Structure

```text
CodeAlpha_SocialMediaPlatform/
├── client/                 # Frontend React Application
│   ├── public/             # Branding icons, manifest, index.html
│   └── src/
│       ├── components/     # Reusable UI widgets & Flex wrappers
│       ├── scenes/         # Page Views (login, home, navbar, widgets)
│       └── state/          # Redux slices
└── server/                 # Backend Node.js / Express Server
    ├── controllers/        # Route logic handlers (auth, users, posts)
    ├── models/             # Mongoose Schemas (User, Post)
    └── routes/             # REST API Endpoint specifications
```

---

## 🚀 Setup & Installation

### 1. Server Setup
```bash
cd server
npm install
cp .env.example .env
# Edit server/.env and add your MONGO_URL, PORT, and JWT_SECRET
npm run start
```

### 2. Client Setup
```bash
cd client
npm install
npm run start
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

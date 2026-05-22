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
│   ├── public/             # Unified AS favicons, logo assets, manifest, index.html
│   └── src/
│       ├── components/     # Reusable global layouts & UI wrappers
│       ├── scenes/         # Page Views & layout structures
│       │   ├── loginPage/  # Premium glassmorphic authentication forms
│       │   ├── homePage/   # Main feed dashboard view
│       │   ├── navbar/     # Navigation layout with theme selectors
│       │   └── widgets/    # Social profile, posting, and feed widgets
│       ├── state/          # Redux toolkit store configuration & persist slices
│       └── theme.js        # Premium dark/light mode palette setups
└── server/                 # Backend Node.js / Express API Server
    ├── controllers/        # Logical controllers (auth, users, posts)
    ├── data/               # Seed data configuration for database backup
    ├── middleware/         # Security token verification interceptors
    ├── models/             # Mongoose DB Schemas (User, Post)
    ├── public/assets/      # Local media uploads & picture directories
    └── routes/             # RESTful API Route specifications
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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or check the issues page.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

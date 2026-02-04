# 🚂 Deploy to Railway

Your dashboard is configured for zero-config deployment on Railway.

## Option 1: Using GitHub (Recommended)

1. **Commit and Push** your code to a GitHub repository.
2. Go to **[Railway Dashboard](https://railway.app)**.
3. Click "New Project" -> "Deploy from GitHub repo".
4. Select your repository.
5. Railway will automatically detect the `Dockerfile` and `package.json` and deploy it.

## Option 2: Using Railway CLI

If you have the Railway CLI installed:

1. Login:
   ```bash
   railway login
   ```

2. Initialize and Deploy:
   ```bash
   cd "outputs/dashboard/crop-faq-dashboard"
   railway init
   railway up
   ```

## Configuration Details
- **Build Command**: `npm run build` (handled by Dockerfile)
- **Start Command**: `npm start` (serves the `dist` folder on port 3000)
- **Port**: Railway automatically sets the `$PORT` environment variable, which the app listens to.

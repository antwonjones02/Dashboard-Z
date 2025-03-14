# Deploying Dashboard-Z to Netlify

This guide provides step-by-step instructions for deploying your Dashboard-Z application to Netlify.

## Prerequisites

Before deploying to Netlify, ensure you have:

1. A GitHub account with your Dashboard-Z repository
2. A Netlify account (you can sign up for free at [netlify.com](https://netlify.com))
3. Completed the items in the production checklist (`PRODUCTION_CHECKLIST.md`)

## Deployment Steps

### 1. Prepare Your Repository

Ensure your repository includes the following files:

- `netlify.toml` (already created with optimal settings)
- `.env.local` with production values (but don't commit sensitive values to Git)

### 2. Connect to Netlify

1. Log in to your Netlify account
2. Click "New site from Git"
3. Select GitHub as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select your `Dashboard-Z` repository

### 3. Configure Build Settings

Netlify should automatically detect the build settings from your `netlify.toml` file, but verify the following:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node.js version**: 18 (or your preferred version)

### 4. Configure Environment Variables

1. In the Netlify dashboard, go to **Site settings** > **Environment variables**
2. Add the following environment variables from your `.env.local` file:
   - `NEXT_PUBLIC_APP_URL` (set to your Netlify domain or custom domain)
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_ENABLE_CSV_IMPORT`
   - `NEXT_PUBLIC_ENABLE_DARK_MODE`

### 5. Deploy Your Site

1. Click "Deploy site"
2. Wait for the build and deployment to complete
3. Once deployed, Netlify will provide you with a URL to access your site (e.g., `https://dashboard-z.netlify.app`)

### 6. Set Up a Custom Domain (Optional)

1. In the Netlify dashboard, go to **Site settings** > **Domain management**
2. Click "Add custom domain"
3. Enter your domain name and follow the instructions to configure DNS settings

### 7. Enable HTTPS

Netlify automatically provisions SSL certificates for your site. Ensure HTTPS is enabled:

1. In the Netlify dashboard, go to **Site settings** > **Domain management** > **HTTPS**
2. Ensure "Netlify managed certificate" is selected

## Continuous Deployment

Netlify automatically deploys your site when you push changes to your GitHub repository. To configure deployment settings:

1. Go to **Site settings** > **Build & deploy** > **Continuous deployment**
2. Configure branch deploy settings as needed (e.g., deploy only from `main` branch)

## Troubleshooting

### Build Failures

If your build fails, check the build logs in the Netlify dashboard:

1. Go to **Deploys** and click on the failed deploy
2. Review the build logs for errors
3. Common issues include:
   - Missing dependencies
   - Environment variable issues
   - Build command errors

### Next.js Plugin Issues

If you encounter issues with the Next.js plugin:

1. Ensure you have the `@netlify/plugin-nextjs` plugin configured in your `netlify.toml`
2. Try setting `NETLIFY_NEXT_PLUGIN_SKIP` to `true` in your environment variables

### Performance Optimization

To improve performance:

1. Enable Netlify's asset optimization in **Site settings** > **Build & deploy** > **Post processing**
2. Configure caching headers in your `netlify.toml` file (already done)
3. Use Netlify's Edge Functions for dynamic content

## Monitoring and Maintenance

1. Set up Netlify Analytics to monitor site traffic
2. Configure form handling if your application uses forms
3. Set up Netlify Functions for serverless functionality

## Rollback Deployments

If you need to roll back to a previous version:

1. Go to **Deploys** in the Netlify dashboard
2. Find the deploy you want to roll back to
3. Click the three-dot menu and select "Publish deploy"

## Additional Resources

- [Netlify Docs for Next.js](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) for local testing
- [Netlify Functions](https://docs.netlify.com/functions/overview/) for serverless functionality
- [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/) for edge computing
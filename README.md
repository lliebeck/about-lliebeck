## General

This is my portfolio website. It was built with Next.js and is currently hosted on Vercel. So check it out at https://lliebeck.de

## Getting Started

First, install the needed packages:

```bash
npm i
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact Form

The contact form uses the [resend](https://resend.com/) service to send the emails back to you. So you need your own domain and an account at [resend](https://resend.com/) if you want to use this. Then you will need to change the following env variables.

```bash
EMAIL_FROM=portfolio@your-domain.de
EMAIL_TO=job@your-domain.de
RESEND_API_KEY=your-resend-api-key
```

The EmailTemplate component lets you modify the email that arrives in your inbox.

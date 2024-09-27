<p align="center">
   <img src="https://github.com/dethdkn/pm2-nel/blob/main/public/nel.png?raw=true" alt="PM2-Nel"/>
<h1 align="center">PM2-Nel</h1>
</p>
<p align="center">🎯 PM2 web ui</p>
<p align="center">
   <a href="https://github.com/dethdkn/ldap-passwords/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/dethdkn/ldap-passwords?color=%233da639&logo=open%20source%20initiative" alt="License"/>
  </a>
   <a href="https://gitmoji.dev">
      <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67" alt="Gitmoji"/>
   </a>
   <a href="https://rosa.dev.br">
      <img src="https://img.shields.io/badge/check me!-👻-F28AA9" alt="rosa.dev.br"/>
   </a>
</p>

## 📷 Screenshots

<p align="center">
   <img src="https://github.com/dethdkn/pm2-nel/blob/main/screenshots/Home.jpeg?raw=true" alt="PM2-Nel Home"/>
</p>
<p align="center">
   <img src="https://github.com/dethdkn/pm2-nel/blob/main/screenshots/Applications.jpeg?raw=true" alt="PM2-Nel Applications"/>
</p>
<p align="center">
   <img src="https://github.com/dethdkn/pm2-nel/blob/main/screenshots/Users.jpeg?raw=true" alt="PM2-Nel Users"/>
</p>
<p align="center">
   <img src="https://github.com/dethdkn/pm2-nel/blob/main/screenshots/Logs.jpeg?raw=true" alt="PM2-Nel Logs"/>
</p>

## ✨ Reason

At [CBPF](https://cbpf.br), where I work, we needed a PM2 web UI, but I couldn’t find any good open-source options online. So, I decided to create a simple one myself. As you can probably tell, front-end development isn’t my strongest suit, so if you’re interested, I’d really appreciate a little help! 😊

## 🚀 Setup

The setup process is straightforward. Simply follow the [Nuxt deployment guide](https://nuxt.com/docs/getting-started/deployment) and set up a proxy using Nginx. Here's a concise guide that I personally use:

`git clone git@github.com:dethdkn/pm2-nel.git`\
`cp .env.example .env`\
`nano .env`\
`pnpm i`\
`pnpm build`\
`pm2 start .output/server/index.mjs` Or add it to pm2 `ecosystem.config.js`

Once the setup is complete, you can either use the app on the port you configured in Nuxt or create an Nginx proxy for access.\
Upon the app's first initialization, a default user is created with the username `nel` and the password `@PM2-nel`.

## 📝 License

Copyright © 2024 [Gabriel 'DethDKN' Rosa](https://github.com/dethdkn)\
This project is under [MIT license](https://github.com/dethdkn/pm2-nel/blob/main/LICENSE)
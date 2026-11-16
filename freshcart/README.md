# FreshCart — Python grocery shopping demo

A responsive grocery storefront served by Flask. It includes category filtering, product search, sorting, a working browser-side shopping cart, quantity controls, delivery fee calculation, and a mobile-friendly layout.

> This is a front-end demo: cart contents are held in browser memory and reset on refresh. There is no database, user login, order processing, or payment gateway.

## Run locally

```bash
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open http://localhost:5000.

## Build and run with Docker

```bash
docker build -t freshcart:1.0 .
docker run -d --name freshcart -p 5000:5000 --restart unless-stopped freshcart:1.0
```

Open http://localhost:5000. Check the container with:

```bash
docker ps
docker logs freshcart
curl http://localhost:5000/health
```

Stop/remove:

```bash
docker stop freshcart
docker rm freshcart
```

## Deploy to a cloud VM

1. Install Docker on the VM.
2. Copy this project folder to the VM (or push it to a Git repository and clone it).
3. Run the Docker build and run commands above.
4. Allow inbound TCP port `5000` in the VM firewall/security group, or put Nginx/Caddy in front and expose HTTPS on port `443`.

## Customize

- Edit product details and image URLs in `static/app.js`.
- Update colors, spacing, and responsive styling in `static/style.css`.
- Change the delivery location and storefront text in `templates/index.html`.

Product photos are loaded from Unsplash, and Google Fonts are loaded externally; an internet connection is needed for those assets. Replace them with locally hosted assets for a fully self-contained deployment.

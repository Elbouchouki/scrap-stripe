import { StripeEntityResponse } from "@/types"

export const get_html = (count: number, apps: StripeEntityResponse[]) => {
    const appList = apps
        .map((app) => {
            return `
          <div class="app">
            <h2><a href="${app.website_url}" target="_blank">${app.name}</a></h2>
          </div>
        `;
        })
        .join('');

    return `
      <html>
        <head>
            <meta charset="UTF-8">
            <title>New Stripe Apps Added</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    text-align: center;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    font-size: 18px;
                    color: #666;
                }
                .timestamp {
                    font-size: 14px;
                    color: #888;
                }
                .app {
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>New Stripe Apps have been added to the database</h1>
                <p>(${count} new app(s))</p>
                <p class="timestamp">Stripe Scrapper - ${new Date().toISOString()}</p>
                ${appList}
            </div>
        </body>
    </html>
    `;
};
export const get_html = (count: number) => {
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
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>New stripe apps has been added to the database</h1>
                  <p>(${count} new app(s))</p>
                  <p class="timestamp">Stripe Scrapper - ${new Date().toISOString()}</p>
              </div>
          </body>
      </html>
      `
}
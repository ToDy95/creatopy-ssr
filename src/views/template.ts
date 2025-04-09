export function template(renderedHtml: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Creatopy SSR</title>
      <style>
        body { margin: 0; padding: 0; font-family: sans-serif; }
      </style>
    </head>
    <body>
      <div id="root">${renderedHtml}</div>
    </body>
    </html>
  `;
}

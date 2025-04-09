# Creatopy Challenge Documentation

## Project Overview

This project is a backend-driven web application built with **Node.js**,
**React**, and **TypeScript**. The primary goal is to dynamically fetch JSON
data from a Creatopy endpoint, process it on the backend, and render it into
HTML using **React Server-Side Rendering (SSR)**. The application focuses on
rendering **text**, **image**, and **button** elements while supporting other
element types.

---

## Features Implemented

### 1. React Server-Side Rendering (SSR)

- The application uses React's `renderToString` function to generate HTML
  content on the server.
- The rendered HTML is sent to the client, ensuring that the content is fully
  prepared before being displayed.

### 2. Dynamic JSON Data Fetching

- JSON data is fetched dynamically from the URL:
  `https://creatopy-cdn-b1a8267.s3.amazonaws.com/designs/{hash}/json`.
- The `{hash}` parameter is dynamic, allowing the application to handle multiple
  endpoints.
- Example hash used: `j2308jq`.

### 3. TypeScript Integration

- The project is fully written in **TypeScript**, ensuring type safety and
  better code quality.
- The `JsonDesign.types.ts` file defines the structure of the JSON data,
  ensuring consistent handling of the data throughout the application.

### 4. Accurate Rendering of Text, Images, and Buttons

- The application ensures accurate rendering of:
  - **Text elements**: Rendered as `<div>` elements with proper styling.
  - **Image elements**: Rendered as `<div>` elements with background images and
    optional drop shadows.
  - **Button elements**: Rendered as `<button>` elements with proper styles and
    labels.
- Other element types are supported but rendered as placeholders if not
  explicitly handled.

### 5. Modular Component-Based Architecture

- The rendering logic has been refactored into reusable components:
  - `Container`
  - `SlideLayer`
  - `TextLayer`
  - `ImageLayer`
  - `ButtonLayer`
  - `UnsupportedLayer`

### 6. Node.js Backend

- A custom **Node.js** backend is implemented to:
  - Fetch JSON data from the Creatopy endpoint.
  - Process the data and pass it to the React renderer.
  - Serve the rendered HTML to the client.

### 7. Unit Testing

- Comprehensive unit tests are written using **Jest** and **React Testing
  Library**.
- Tests cover:
  - React components (`Renderer`, `TextLayer`, `ButtonLayer`, etc.).
  - Backend functionality (`server.ts`).
  - Utility functions (`template.ts`).

---

## System Architecture

### 1. Backend

- **Node.js** is used to create an Express server.
- The server fetches JSON data from the Creatopy endpoint and processes it using
  React's SSR capabilities.

### 2. Frontend

- The frontend is a simple HTML page that displays the rendered content.
- The rendering logic is split into modular components for better
  maintainability.

### 3. TypeScript Types

- The `JsonDesign.types.ts` file defines the structure of the JSON data,
  including types for elements like `text`, `image`, `button`, etc.
- Type guards (e.g., `isText`, `isImage`) are used to validate and process
  elements dynamically.

---

## Setup Instructions

### 1. Prerequisites

- **Node.js** (v18 or higher).
- **npm** (v8 or higher).

### 2. Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd creatopy-ssr
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### 3. Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

   The server will be available at `http://localhost:3000`.

2. Fetch and render JSON data:
   - Access the endpoint: `http://localhost:3000/{hash}`.
   - Replace `{hash}` with a valid hash (e.g., `j2308jq`).

### 4. Running Tests

- Run all tests:
  ```bash
  npm test
  ```
- Run tests in watch mode:
  ```bash
  npm run test:watch
  ```

---

## Testing

### Tools Used

- **Jest**: For unit and integration testing.
- **React Testing Library**: For testing React components.
- **Supertest**: For testing the Express server.

### Test Coverage

1. **React Component Tests (`Renderer.test.tsx`)**

   - Verifies that text, image, and button elements are rendered correctly.
   - Ensures unsupported elements display placeholders.

2. **Backend Tests (`server.test.ts`)**

   - Tests the `/hash` endpoint for valid and invalid hashes.
   - Mocks `axios` to simulate API responses.

3. **Utility Tests (`template.test.ts`)**
   - Ensures the `template` function generates valid HTML.

---

## Challenges Faced

### 1. Dynamic JSON Structure

- The JSON data contains a variety of element types, requiring robust type
  guards and validation.
- **Solution**: Used TypeScript's union types and type guards to handle
  different element types dynamically.

### 2. Server-Side Rendering

- Rendering React components on the server required careful handling of props
  and types.
- **Solution**: Used `renderToString` and ensured all props were validated using
  TypeScript.

### 3. Testing

- Mocking `axios` and React components for testing required additional setup.
- **Solution**: Used Jest's mocking capabilities to simulate API responses and
  component behavior.

---

## What Could Be Improved

### 1. Support for More Element Types

- Currently, only text, image, and button elements are fully supported. Other
  types (e.g., videos, shapes) could be implemented with additional logic.

### 2. Styling

- The application uses minimal inline styles. A CSS framework or preprocessor
  could be integrated for better styling.

### 3. Error Handling

- Improved error handling for invalid JSON data or network failures.

### 4. Live Demo

- Deploy the application to a platform like **Vercel** or **Heroku** for a live
  demo.

---

## File Structure

```
jest.config.js
jest.setup.ts
nodemon.json
package.json
ReadMe.md
tsconfig.json
src/
    _components/
        ButtonLayer.tsx
        Container.tsx
        ImageLayer.tsx
        SlideLayer.tsx
        TextLayer.tsx
        UnsupportedLayer.tsx
    components/
        Renderer.test.tsx
        Renderer.tsx
    server/
        server.test.ts
        server.ts
    types/
        JsonDesign.types.ts
    views/
        template.test.tsx
        template.ts
```

---

## Conclusion

This project demonstrates the ability to build a backend-driven web application
using **Node.js**, **React SSR**, and **TypeScript**. It dynamically fetches
JSON data, processes it on the server, and renders it into HTML. The application
is robust, type-safe, and well-tested, meeting the requirements of the Creatopy
Challenge.

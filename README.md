# Verifier Tutorial

This tutorial walks you through setting up a simple React project using TypeScript and Vite. You'll integrate the **TrustVC** library to verify a W3C **Verifiable Credential (VC)** or **OpenAttestation** document. The focus of this tutorial is on **non-transferable credentials**.

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v18.x or higher)
- **npm** (v6.x or higher)

If you don't have them, you can download and install them from [Node.js official website](https://nodejs.org/).

## Setting Up the Project

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TradeTrust/verifier-tutorial.git
   cd verifier-tutorial
   ```
   
2. **Install dependencies:**

   Use npm to install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Run the development server:**

   To start the project locally, run:

   ```bash
   npm run dev
   ```
## Verifying a document

A sample document is available in the demo folder.

To verify the sample document (`amoy.tt`), navigate to the demo folder and open the file:

- **Demo file**: [amoy.tt](/demo/amoy.tt)

You can modify this file or upload your own document to test the verification process.

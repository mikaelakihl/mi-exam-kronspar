# Kronspar Savings Application
This project was developed as my "Final year project"  to provide a seamless savings solution for students preparing for their high school graduation. Built with React and TypeScript, it empowers users to automatically save small amounts over time, ensuring they can afford their graduation hat without financial stress.

The core objective of this application is to automate the savings process for students, allowing them to accumulate funds over a period. It provides a visual dashboard to track progress, manage payment settings, and simulate future savings scenarios to visualize the long-term benefit of consistent saving.

## 📋 Project overview
During the initial development phase, MSW (Mock Service Worker) was used to simulate backend interactions. This allowed for rapid frontend development of the savings logic and user interface before I will integrating with a real backend in the future.

The app serves as a personal finance dashboard for managing graduation savings. It consists of:

- Home Page – Overview of current savings, days remaining, and progress towards the goal.
- Savings Settings – Interfaces to configure savingplan and payment methods.
- Statistics – Visual breakdown of savings over time.
- Time Travel – A simulation tool to fast-forward time and verify app behavior at key milestones.
- Access Control: The application uses Clerk for secure authentication. For demonstration purposes, specific test accounts are used to showcase the functionality.

Users can:

- Monitor Savings: View a progress bar and detailed statistics of accumulated funds.
- Automate Deposits: Configure automatic monthly transfers to reach their goal.
- Compare Suppliers: Browse and compare options for graduation hats.
- Manage Profile: Update personal information and payment details.

## ✨ Features
- Authentication: Integrated with Clerk for secure user sessions.
- Time Travel Simulation: A unique debugging and demonstration tool to simulate the passage of time.
- Data Visualization: Progress bars and statistical cards to motivate saving.
- Data Fetching: Efficient state management using TanStack Query.
- Routing: Modern navigation structure using React Router v7.
- Responsive UI: Mobile-first design built with Tailwind CSS v4.
- Backend Integration: Hybrid approach using MSW for prototyping and API integration.

### 📊 Savings Projection & Time Travel
The application includes a "Time Travel" system for demonstration purposes. This tool allows users to fast-forward time to instantly verify the app's behavior at future milestones (like Graduation Day). This feature is intended solely for showcasing the project's logic and would not be part of the final consumer application. Its hidden in the header. 

### Calculation Logic
The "Savings Projection" is calculated dynamically based on the current date and the user's configured plan. When time travel is activated, the app projects the accumulated value:

- Months Remaining – Calculated from the simulated date to the target date.
- Monthly Contribution – The fixed sum the user has agreed to save.
- Accumulated Total – The current balance plus projected future deposits.
- Formula: Projected Total = Current Balance + (Months Remaining × Monthly Amount)

### Simulation Milestones
The Time Travel feature allows the user to jump between three distinct temporal states:

- 🟢 Current Time: Shows the actual real-time status of the savings account.
- 🟡 Purchase Hat Day: Simulates the date when the payment for the hat is due, verifying sufficient funds.
- 🔴 Graduation Day: Simulates the final date of the savings period, showing the total accumulated sum.

## 🧰 Tech Stack
React 19
TypeScript
Tailwind CSS v4
Vite
TanStack Query
Clerk (Authentication)
React Router v7
React Icons
ESLint & Prettier

## 🚀 Installation

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the App

```bash
npm run dev
```
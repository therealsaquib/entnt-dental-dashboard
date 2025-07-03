# ENTNT Dental Center Dashboard

A modern, responsive dental center dashboard built with React and Tailwind CSS.

## Features

- **Authentication**: Admin and Patient login with role-based access.
- **Dashboard**: KPIs, upcoming appointments, top patients, and revenue stats.
- **Patient Management**: Add, edit, delete, and view patient details.
- **Incident Management**: Manage appointments, treatments, and upload files.
- **Calendar View**: Visualize appointments by date.
- **Patient View**: Patients can view their profile, upcoming appointments, and history.
- **Nearby**: (Planned) See nearby clinics or resources.
- **Responsive UI**: Works on desktop, tablet, and mobile.
- **Reusable Components**: Navbar, Sidebar, Modal, Toast, LoadingSpinner, etc.
- **Local Storage**: All data is stored in the browser for demo purposes.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
cd entnt-dashboard
npm install
# or
yarn install
```

### Running the App

```bash
npm start
# or
yarn start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Default Admin & Patient Credentials

- **Admin**
  - Email: `admin@entnt.in`
  - Password: `admin123`
- **Patient**
  - Email: `john@entnt.in`
  - Password: `patient123`

## Project Structure

```
src/
  components/
    common/         # Reusable UI components (Navbar, Modal, Toast, etc.)
  contexts/         # React Context for authentication
  pages/            # Main pages (Dashboard, Patients, Incidents, etc.)
  utils/            # Local storage utilities
  App.js            # Main app entry
  index.js          # ReactDOM entry
  index.css         # Tailwind and custom styles
```

## Customization

- **Styling**: Uses Tailwind CSS with custom utility classes for a Figma-inspired look.
- **Data**: All data is stored in browser localStorage for demo/testing. No backend required.
- **Icons**: Inline SVGs for all icons (no external icon libraries).

## Deployment

You can deploy this app to Vercel, Netlify, or any static hosting provider.

```bash
npm run build
# or
yarn build
```

## Licens

---

**Made with ❤️ for ENTNT Dental Center**

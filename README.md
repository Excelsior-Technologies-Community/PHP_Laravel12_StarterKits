# PHP_Laravel12_StarterKits

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/PHP-8.2%2B-777BB4?style=for-the-badge&logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Inertia.js-1.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18%20%7C%2020%20LTS-339933?style=for-the-badge&logo=node.js&logoColor=white" />
</p>


## Overview

**Laravel Starter Kitsis a ready-to-use starter setup for building modern web applications using **Laravel 12** with the official **React + Inertia.js** starter kit. It provides authentication, dashboard UI, clean project structure, and multiple layout customization options out of the box.

This starter kit is ideal for:

* Admin panels
* SaaS applications
* Dashboards
* Rapid Laravel 12 project setup

---

## Features Overview

Laravel 12 Starter Kit comes with a rich set of features to help you start quickly and scale easily.

### Core Features

* Laravel 12 framework with modern defaults
* React + Inertia.js frontend setup
* Authentication system (Login, Register, Logout)
* User profile & settings management
* Secure password hashing & validation
* Responsive UI with Tailwind CSS
* Dark / Light mode support
* Ready-to-use dashboard layout

### Developer Experience

* Vite for fast frontend builds
* Hot Module Replacement (HMR)
* Clean and scalable folder structure
* TypeScript support
* Pest testing framework

---

## Folder Structure

Below is the simplified folder structure of the Laravel 12 Starter Kit:

```text
app/
 ├── Http/
 │   ├── Controllers/
 │   ├── Middleware/
 ├── Models/
 ├── Providers/

resources/
 ├── js/
 │   ├── components/      # Reusable UI components
 │   ├── layouts/         # App & Auth layouts
 │   │   ├── app/
 │   │   └── auth/
 │   ├── pages/            # Inertia pages (Dashboard, Auth, etc.)
 │   └── hooks/
 ├── css/

routes/
 ├── web.php
 ├── api.php

database/
 ├── migrations/
 ├── seeders/

public/

```

---

## System Requirements

Before starting, make sure you have the following installed:

* PHP **8.2+** (8.4 recommended)
* Composer (latest version)
* Node.js **18 or 20 (LTS)**
* npm **9+**

---

## Step 1: Install PHP (If Not Installed)

### Windows (PowerShell – Run as Administrator)

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol =
[System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))
```

### Linux / Ubuntu

```bash
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
```

### macOS

```bash
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.4)"
```

After installation, verify PHP:

```bash
php -v
```

---

## Step 2: Install Laravel Installer

If Composer is already installed, run:

```bash
composer global require laravel/installer
```

Verify installation:

```bash
laravel
```

---

## Step 3: Create a New Laravel 12 Application

Run the following command:

```bash
laravel new example-app
```

During installation, select these options:

* **Starter Kit:** React
* **Authentication:** Yes
* **Database:** SQLite (recommended for beginners)
* **Testing Framework:** Pest

Wait until the installation completes.

---

## Step 4: Navigate to Project Directory

```bash
cd example-app
```

---

## Step 5: Install Node Dependencies

```bash
npm install
```

---

## Step 6: Run Database Migrations

```bash
php artisan migrate
```

When prompted, type:

```text
yes
```

---

## Step 7: Start Frontend Development Server

```bash
npm run dev
```

⚠️ Keep this terminal running.

---

## Step 8: Start Laravel Backend Server

Open a new terminal window and run:

```bash
php artisan serve
```

---

## Step 9: Open Application in Browser

Visit:

```
http://127.0.0.1:8000
```

---

## What You Get by Default

After successful installation, the Laravel 12 Starter Kit provides:

* Landing Page

  <img width="1671" height="860" alt="Screenshot 2026-01-05 164055" src="https://github.com/user-attachments/assets/9acb00aa-82e8-420b-b155-1b806586e384" />

* User Registration

  <img width="1170" height="830" alt="Screenshot 2026-01-05 164110" src="https://github.com/user-attachments/assets/acfce45f-004c-4900-bec8-32007b60f4e6" />

* Login / Logout

  <img width="1015" height="743" alt="Screenshot 2026-01-05 164119" src="https://github.com/user-attachments/assets/a0dce889-94bb-4b39-bc68-6257c05da00c" />

* Dashboard

  <img width="1919" height="950" alt="Screenshot 2026-01-05 164358" src="https://github.com/user-attachments/assets/ef1e5753-88cb-4cd0-8ace-a2097d47b682" />

* User Settings

  <img width="1915" height="940" alt="Screenshot 2026-01-05 164438" src="https://github.com/user-attachments/assets/72abcbac-450f-4e0c-b719-cec5698f84e7" />

---


## Common Issues

* PHP not installed or not added to PATH
* Node.js missing
* Running commands outside the project directory
* Closing the `npm run dev` terminal

---

## Customize Laravel Starter Kit

Laravel 12 Starter Kit provides multiple layout variants. You can easily customize the dashboard and authentication pages by changing a single import statement.

---

### 1. Change Dashboard Layout (Sidebar to Header)

By default, the dashboard uses a **left sidebar layout**. If you prefer a **top header menu layout**, update the following file:

**File:**

```
resources/js/layouts/app-layout.tsx
```

**Before (Sidebar Layout):**

```ts
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
```

**After (Header Layout):**

```ts
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
```

After this change, the dashboard will display a **top navigation header instead of a sidebar**.

<img width="1602" height="956" alt="Screenshot 2026-01-05 170332" src="https://github.com/user-attachments/assets/3fb41cfe-a58a-4bdb-8ece-889578aa84d8" />

---

### 2. Change Sidebar Style Variant

You can also change how the sidebar looks (inset vs floating).

**File:**

```
resources/js/components/app-sidebar.tsx
```

**Before (Inset Sidebar):**

```tsx
<Sidebar collapsible="icon" variant="inset">
```

**After (Floating Sidebar):**

```tsx
<Sidebar collapsible="icon" variant="floating">
```

This will give the dashboard a **more modern floating sidebar appearance**.

<img width="1919" height="943" alt="Screenshot 2026-01-05 170656" src="https://github.com/user-attachments/assets/9ba5b51a-120f-4f77-915b-860c4fbb8417" />

---

### 3. Change Authentication Page Design (Register / Login)

Laravel 12 offers multiple built-in authentication layout designs.

**File:**

```
resources/js/layouts/auth-layout.tsx
```

#### Option A: Card Layout

Best for clean and centered authentication pages.

```ts
import AuthLayoutTemplate from '@/layouts/auth/auth-card-layout';
```
<img width="737" height="830" alt="Screenshot 2026-01-05 174810" src="https://github.com/user-attachments/assets/37f51bd3-9fb9-46b0-8aff-f6e16713e109" />


#### Option B: Split Layout

Best for SaaS-style applications with image + form layout.

```ts
import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';
```
<img width="1919" height="948" alt="Screenshot 2026-01-05 171209" src="https://github.com/user-attachments/assets/ca843667-8b1c-4dbe-bcd8-1174d209ee85" />

#### Option C: Simple Layout (Default)

Minimal and lightweight authentication layout.

```ts
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
```
<img width="1015" height="743" alt="Screenshot 2026-01-05 164119" src="https://github.com/user-attachments/assets/3e5923e3-e4da-45e3-96cd-2574aa5f7b9d" />

---

## Notes

* Only **one layout import** should be active at a time.
* After making layout changes, restart the frontend server:

```bash
npm run dev
```

---


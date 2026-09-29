# SecureGate — Login Authentication

**Simple. Secure. Personal.**

## Project Overview

SecureGate is a frontend educational authentication demonstration created for the Oasis Infobyte Web Development & Designing Internship, Level 2 Task 4. It is the fourth and final project in this Level 2 submission. The interface and implementation are independently written with HTML, CSS, and vanilla JavaScript, without templates or authentication services.

## Internship Information

- Organization: Oasis Infobyte
- Track: Web Development & Designing Internship
- Level 2 — Task 4: Login Authentication

## Features

- Registration with full name, username, email, password, and confirmation
- Required-field and email validation, with focus on the first invalid field
- Names of at least 2 characters and usernames of at least 3 characters
- Passwords of at least 8 characters with at least one number
- Case-insensitive duplicate email and username checks
- SHA-256 password hashing through Web Crypto
- Login with one generic invalid-credentials message
- Accessible Show/Hide controls for every password field
- Protected dashboard with account details and member date
- Session persistence on refresh and logout without deleting the account
- Redirects for already authenticated visitors
- Safe rendering of account text, responsive layouts, keyboard focus styles
- Useful errors when account storage is damaged or unavailable

## Technologies Used

HTML5, CSS3, vanilla JavaScript, Web Crypto API, and Web Storage API (`localStorage` and `sessionStorage`). There are no application packages, build steps, frameworks, external fonts, or backend dependencies.

## Project Structure

```text
WebDev-L2-LoginAuthentication/
├── index.html
├── register.html
├── dashboard.html
├── css/
│   └── style.css
├── js/
│   ├── auth.js
│   └── dashboard.js
├── screenshots/
│   └── README.txt
├── README.md
└── .gitignore
```

| File | Purpose |
| --- | --- |
| `index.html` | Login form and links to registration |
| `register.html` | Registration form and success message linking back to sign-in |
| `dashboard.html` | Initially hidden account view, revealed only after session verification |
| `css/style.css` | Shared theme, CSS gate decoration, forms, dashboard, and responsive rules |
| `js/auth.js` | Storage helpers, hashing, validation, registration, login, session helpers, visibility controls, and authenticated redirects |
| `js/dashboard.js` | Session checks, safe account rendering, browser-history checks, and logout |
| `screenshots/README.txt` | Names and guidance for screenshots to add yourself |
| `README.md` | Setup, explanation, test results, and submission guide |
| `.gitignore` | Common system and editor clutter |

## How to Run

1. Open `index.html` in a modern browser. No installation or build is required.
2. Select **Create an account**, register using test details, and select **Continue to sign in**.
3. Sign in with the same email and password.

Direct `file://` registration, login, and dashboard access were tested successfully in Microsoft Edge on Windows. This does not guarantee the same behavior in all browsers: file-origin storage rules differ. For consistent origins and browser APIs, open the folder in VS Code and use **Live Server**, or serve the static files through an existing localhost server. HTTPS also supports Web Crypto. Use the same origin throughout; different ports, profiles, and file/HTTP origins have separate account storage.

JavaScript, Web Storage, `crypto.subtle`, and `crypto.randomUUID` must be available. Restricted browser storage can prevent registration or sessions. Ordinary remote HTTP may not provide Web Crypto. The application reports an error rather than storing plaintext as a fallback.

## Authentication Flow

```text
Register → save demo user → return to Login
Login → compare password hash → create Session → Dashboard
Logout → remove Session → Login
```

Registration trims the name and username and normalizes email by trimming and lowercasing it. Passwords are not trimmed or otherwise changed. Confirmation must match exactly. A successful registration clears and hides the form and shows an explicit sign-in link; it does not sign the user in automatically.

The dashboard checks for a session, validates its timestamp and user ID, and finds the registered user before displaying anything. Missing, malformed, or unmatched sessions redirect to login. Account data is inserted with `textContent`, not HTML. Session checks also run on page restoration, visibility changes, and storage changes. Login and registration redirect to the dashboard when a valid session exists.

## Storage

| Storage | Key | Contents | Lifetime |
| --- | --- | --- | --- |
| `localStorage` | `securegate_users` | Array of users: `id`, `fullName`, `username`, `email`, `passwordHash`, `createdAt` | Remains across refreshes and logout until browser data is cleared |
| `sessionStorage` | `securegate_session` | `userId` and `loggedInAt` only | Current tab's page session, or until logout |

Neither password nor password hash is placed in the session. Logout removes only the session key. Other application storage is not cleared. Browser tab duplication and session restoration can copy or restore sessionStorage; use **Logout** to explicitly end access. There is no timed session expiry.

Damaged account data is not silently overwritten. To reset this demo, remove its two keys in Developer Tools → Application → Storage, or use a fresh browser profile. Removing the users key deletes that browser's demo accounts.

## Password Handling

`hashPassword(password)` encodes the password with `TextEncoder`, passes those bytes to `crypto.subtle.digest('SHA-256', ...)`, and converts the resulting 32 bytes into a 64-character hexadecimal string. Registration stores that hash only. Login hashes the supplied password in the same way and compares it with the stored hash. Unknown email and wrong password both produce **“Invalid email or password.”**

SHA-256 keeps passwords from being stored as readable plaintext for this educational exercise. It is fast and unsalted here, and is **not suitable production password storage**. Real applications should authenticate on a secure backend and normally use dedicated password-hashing algorithms such as Argon2 or bcrypt with appropriate salts, together with secure server-side sessions.

This frontend cannot enforce real security: anyone with developer tools can change storage or bypass JavaScript checks. Stored hashes are accessible to scripts on the same origin and can be attacked offline. Account names and emails are stored locally in readable form. Do not use sensitive real-world accounts or reuse a real password. Registration across simultaneously submitting tabs is not transactional; a backend/database would be needed to guarantee uniqueness under concurrency.

## Test Results and Official Oasis Checklist

Verified in a fresh automated Microsoft Edge browser context on Windows, using a temporary local static server. Test tooling is not part of the application or required to run it.

| Requirement / test | Result |
| --- | --- |
| Registration includes username, email, password | PASS |
| Empty registration shows five inline errors | PASS |
| Invalid email `aisha@` is rejected | PASS |
| Password `abcdefg` is rejected (length and number) | PASS |
| Password `abcdefgh` is rejected (number required) | PASS |
| Mismatched confirmation is rejected | PASS |
| Valid registration succeeds without automatic login | PASS |
| Duplicate email and username are rejected case-insensitively | PASS |
| Empty login shows inline errors | PASS |
| Wrong password and unregistered email show the same generic message | PASS |
| Correct login, including normalized email, reaches dashboard | PASS |
| Stored hash matches independently calculated SHA-256; no plaintext stored | PASS |
| Session contains only user ID and login timestamp | PASS |
| Logged-out dashboard access redirects before and after logout | PASS |
| Dashboard refresh retains authentication | PASS |
| Authenticated login/register visits redirect to dashboard | PASS |
| Logout clears session while preserving the registered account | PASS |
| Registration password and confirmation visibility controls | PASS |
| Malformed session redirects; malformed account storage shows a useful error | PASS |
| All three pages at 1440, 1024, 768, 440, and 375px: no horizontal overflow | PASS |
| Authentication flow: no uncaught page JavaScript errors | PASS |
| Edge `file://` registration → login → dashboard | PASS |

The login desktop design was also visually inspected. Automated checks are not a substitute for your own keyboard and mobile review before submission. Other browser engines have not been tested.

To repeat the main manual test, register a disposable demo account, try the same username/email with different capitalization, try one incorrect login, then log in correctly. Refresh, log out, and type `dashboard.html` into the address bar. Inspect the two storage keys to see the hash and session distinction. Never use real credentials in a recording.

## Screenshots

The following are **planned filenames, not included screenshots**. Capture them yourself after personally testing:

- [ ] `screenshots/securegate-login.png` — desktop login
- [ ] `screenshots/securegate-register.png` — registration
- [ ] `screenshots/securegate-dashboard.png` — signed-in account
- [ ] `screenshots/securegate-mobile.png` — mobile login or dashboard

## What I Learned

This project provides practice in form validation, Web Crypto, localStorage, sessionStorage, authentication flow, protected pages, safe DOM manipulation, and responsive forms. A key lesson is that a frontend redirect demonstrates a workflow but cannot replace backend authorization.

## Future Improvements

- Secure backend with a database
- Server-side sessions
- Argon2 or bcrypt password hashing
- Email verification
- Password reset

These are future ideas, not implemented features.

## Demo Video Plan

**0:00–0:02:** Keep a static title card on screen for the full first two seconds:

```text
Aisha Meraj
Web Development & Designing
Level 2 — Task 4: Login Authentication
```

Then record approximately 60–90 seconds:

1. Show the login page and open registration.
2. Submit an empty form briefly to demonstrate validation.
3. Register a new disposable test account, keeping passwords masked.
4. Return to login through the success link.
5. Demonstrate an incorrect login once, then sign in correctly.
6. Show the account dashboard and refresh it.
7. Log out, then open `dashboard.html` to demonstrate the redirect.
8. Briefly show the responsive interface in a narrow viewport.

Use demo details only. Do not expose real passwords or personal credentials.

## GitHub Upload

After your own testing and screenshots, add this entire folder to your **existing `OIBSIP` repository**, beside `WebDev-L2-Calculator`, `WebDev-L2-TributePage`, and `WebDev-L2-ToDoApp`. Do not create a new repository. Suggested commit message:

```text
Add Level 2 Login Authentication project
```

Nothing has been pushed automatically. No LinkedIn post is included.

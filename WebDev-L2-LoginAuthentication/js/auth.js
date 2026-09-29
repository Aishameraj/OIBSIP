/* Educational browser-only authentication. This is not a security boundary. */
'use strict';

const Auth = (() => {
  const USERS_KEY = 'securegate_users';
  const SESSION_KEY = 'securegate_session';
  const normalizeEmail = value => value.trim().toLowerCase();
  const validateEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  function getUsers() {
    let users;
    try { users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { throw new Error('Account storage is unavailable or damaged. Check your browser storage settings.'); }
    if (!Array.isArray(users) || !users.every(user => user &&
      ['id', 'fullName', 'username', 'email', 'passwordHash', 'createdAt'].every(key => typeof user[key] === 'string') &&
      /^[a-f0-9]{64}$/.test(user.passwordHash) && Number.isFinite(Date.parse(user.createdAt)))) {
      throw new Error('Account storage is damaged. Use a fresh browser profile for this demo.');
    }
    return users;
  }

  function saveUsers(users) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
    catch { throw new Error('Your browser could not save the account. Allow browser storage and try again.'); }
  }

  async function hashPassword(password) {
    if (!window.crypto?.subtle) throw new Error('Password hashing is unavailable. Open this project on localhost with Live Server or over HTTPS.');
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  }

  function clearSession() { sessionStorage.removeItem(SESSION_KEY); }

  function getCurrentUser() {
    try {
      const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
      if (!session) return null;
      if (typeof session.userId !== 'string' || typeof session.loggedInAt !== 'string' || !Number.isFinite(Date.parse(session.loggedInAt))) {
        clearSession();
        return null;
      }
      const user = getUsers().find(user => user.id === session.userId);
      if (!user) clearSession();
      return user || null;
    } catch { return null; }
  }

  function createSession(user) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, loggedInAt: new Date().toISOString() })); }
    catch { throw new Error('Your browser could not start a session. Allow browser storage and try again.'); }
  }

  function fieldError(id, message) {
    const input = document.getElementById(id);
    input.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(`${id}-error`).textContent = message;
  }

  function validateForm(form, registering) {
    const values = Object.fromEntries(new FormData(form));
    const errors = {};
    values.email = normalizeEmail(values.email);
    if (!values.email) errors.email = 'Email is required.';
    else if (!validateEmail(values.email)) errors.email = 'Enter a valid email address.';
    if (!values.password) errors.password = 'Password is required.';
    if (registering) {
      values.fullName = values.fullName.trim();
      values.username = values.username.trim();
      if (!values.fullName) errors.fullName = 'Full name is required.';
      else if (values.fullName.length < 2) errors.fullName = 'Use at least 2 characters for your name.';
      if (!values.username) errors.username = 'Username is required.';
      else if (values.username.length < 3) errors.username = 'Use at least 3 characters for your username.';
      if (values.password && (values.password.length < 8 || !/[0-9]/.test(values.password))) errors.password = 'Password must be at least 8 characters and include at least one number.';
      if (!values.confirmPassword) errors.confirmPassword = 'Confirm your password.';
      else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.';
    }
    form.querySelectorAll('input').forEach(input => fieldError(input.id, errors[input.id] || ''));
    form.querySelector('[aria-invalid="true"]')?.focus();
    return { values, valid: Object.keys(errors).length === 0 };
  }

  async function registerUser(values) {
    const passwordHash = await hashPassword(values.password);
    // Read again after hashing so another completed registration is not overwritten.
    const users = getUsers();
    let duplicate = false;
    if (users.some(user => normalizeEmail(user.email) === values.email)) {
      fieldError('email', 'An account with this email already exists.'); duplicate = true;
    }
    if (users.some(user => user.username.toLowerCase() === values.username.toLowerCase())) {
      fieldError('username', 'That username is already taken.'); duplicate = true;
    }
    if (duplicate) { document.querySelector('[aria-invalid="true"]')?.focus(); return false; }
    users.push({ id: crypto.randomUUID(), fullName: values.fullName, username: values.username,
      email: values.email, passwordHash, createdAt: new Date().toISOString() });
    saveUsers(users);
    return true;
  }

  async function loginUser(values) {
    const hash = await hashPassword(values.password);
    const user = getUsers().find(user => normalizeEmail(user.email) === values.email && user.passwordHash === hash);
    if (!user) throw new Error('Invalid email or password.');
    createSession(user);
  }

  function initializeForm() {
    const form = document.querySelector('[data-auth-form]');
    if (!form) return;
    const redirectIfAuthenticated = () => {
      if (getCurrentUser()) window.location.replace('dashboard.html');
    };
    redirectIfAuthenticated();
    window.addEventListener('pageshow', redirectIfAuthenticated);
    const registering = form.dataset.authForm === 'register';
    const message = document.getElementById('form-message');
    form.querySelectorAll('input').forEach(input => input.addEventListener('input', () => {
      fieldError(input.id, ''); message.textContent = '';
      if (input.id === 'password' && registering) fieldError('confirmPassword', '');
    }));
    document.querySelectorAll('[data-toggle]').forEach(button => button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.toggle);
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.textContent = show ? 'Hide' : 'Show';
      button.setAttribute('aria-pressed', String(show));
      button.setAttribute('aria-label', `${show ? 'Hide' : 'Show'} ${input.id === 'confirmPassword' ? 'confirm password' : 'password'}`);
    }));
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const submit = form.querySelector('[type="submit"]');
      if (submit.disabled) return;
      message.textContent = ''; message.className = 'form-message';
      const { values, valid } = validateForm(form, registering);
      if (!valid) return;
      submit.disabled = true;
      submit.textContent = registering ? 'Creating account…' : 'Signing in…';
      try {
        if (registering) {
          if (await registerUser(values)) {
            form.reset();
            form.hidden = true;
            const success = document.getElementById('registration-success');
            success.hidden = false; success.focus();
          }
        } else {
          await loginUser(values);
          form.reset();
          window.location.replace('dashboard.html');
        }
      } catch (error) { message.textContent = error.message; }
      finally { submit.disabled = false; submit.textContent = registering ? 'Create account' : 'Sign in'; }
    });
  }

  initializeForm();
  return { getCurrentUser, clearSession };
})();

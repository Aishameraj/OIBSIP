'use strict';

function renderDashboard() {
  const user = Auth.getCurrentUser();
  if (!user) {
    document.getElementById('dashboard').hidden = true;
    window.location.replace('index.html');
    return;
  }
  const fields = { greeting: `Welcome, ${user.fullName.split(/\s+/)[0]}.`,
    fullName: user.fullName, username: user.username, email: user.email,
    memberSince: new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(new Date(user.createdAt)),
    initials: user.fullName.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase() };
  Object.entries(fields).forEach(([id, value]) => { document.getElementById(id).textContent = value; });
  document.getElementById('dashboard').hidden = false;
}

renderDashboard();
window.addEventListener('pageshow', renderDashboard);
window.addEventListener('storage', renderDashboard);
document.addEventListener('visibilitychange', () => { if (!document.hidden) renderDashboard(); });
document.getElementById('logout').addEventListener('click', () => {
  try { Auth.clearSession(); window.location.replace('index.html'); }
  catch { document.getElementById('logout-error').textContent = 'Could not clear your session. Close this tab to end the demo session.'; }
});

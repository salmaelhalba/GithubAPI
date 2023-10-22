// This function redirects the user to the GitHub OAuth authorization page.
export function gitOAuth() {
  window.location.assign(
    "https://github.com/login/oauth/authorize?client_id=bedd18f6c7359755a50e"
  );
}

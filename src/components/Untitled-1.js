// Your response string
let response =
  "access_token=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&scope=&token_type=bearer";

// Use a regular expression to extract the access_token value
let match = response.match(/access_token=([^&]*)/);

// Check if a match was found
if (match && match.length > 1) {
  let accessToken = match[1];
  console.log(accessToken); // This will log the access token
} else {
  console.log("Access token not found in the response");
}

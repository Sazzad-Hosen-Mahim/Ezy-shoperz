const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AdCktd4fiYn71r6hMJ0Lwot35svjni5qCbhsxGU_XmjAyL6AxrzrcHo183Adr-RXZg_ab6Buo1iG0wnw",
  client_secret:
    "EP0u7vK2sXe__IgUsMfsgWrce8B5kcbNqnUU1HhYQK2TsW71jdznaq9qzEWYu17C9v07n6cYL54SpWEN",
});

module.exports = paypal;

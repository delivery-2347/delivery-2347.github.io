const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const ORIGINAL_PAGE = "https://delivery-2347.github.io/";
const NON_BROWSER_TEXT = "Your request was received successfully.";

function isBrowser(req) {
    const userAgent = req.headers["user-agent"] || "";

    return /Mozilla\/5\.0/i.test(userAgent) &&
           /Chrome|Chromium|Firefox|Safari|Edg|Opera/i.test(userAgent);
}

app.get("/script", (req, res) => {
    if (isBrowser(req)) {
        return res.redirect(302, ORIGINAL_PAGE);
    }

    return res
        .status(200)
        .type("text")
        .send(NON_BROWSER_TEXT);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

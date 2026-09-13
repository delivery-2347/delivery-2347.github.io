const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const SCRIPT = `
print("Hello from server!")
-- твой Lua-код здесь
`;

function isBrowser(req) {
    const ua = req.get("user-agent") || "";

    const browserUA =
        /Mozilla\\/5\\.0/i.test(ua) &&
        /Chrome|Chromium|Firefox|Safari|Edg/i.test(ua);

    const secFetchDest = req.get("sec-fetch-dest");
    const secFetchMode = req.get("sec-fetch-mode");

    // Современный браузер обычно присылает эти заголовки
    const browserFetchHeaders =
        secFetchDest === "document" ||
        secFetchMode === "navigate";

    return browserUA && browserFetchHeaders;
}

app.get("/scripts", (req, res) => {
    console.log("Request:", {
        ip: req.ip,
        userAgent: req.get("user-agent"),
        secFetchDest: req.get("sec-fetch-dest"),
        secFetchMode: req.get("sec-fetch-mode"),
        isBrowser: isBrowser(req)
    });

    if (isBrowser(req)) {
        // Человек открыл страницу в браузере
        return res.redirect("https://example.com/");
    }

    // Похоже на запрос от скрипта
    res.type("text/plain").send(SCRIPT);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

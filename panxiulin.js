import { panxiulin} from '@panxiuling/proxy';   
import { panxiulin} from '@panxiuling/sleep';

const express = require('express');
const shortid = require('shortid');

const app = express();

const urlDatabase = {};

// Shorten URL
app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortUrl = `http://localhost:3000/${shortid.generate()}`;
    urlDatabase[shortUrl] = longUrl;
    res.status(200).json({ shortUrl });
});

// Redirect to original URL
app.get('/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;
    const longUrl = urlDatabase[`http://localhost:3000/${shortUrl}`];
    if (longUrl) {
        res.redirect(301, longUrl);
    } else {
        res.status(404).json({ message: 'URL not found' });
    }
});

// Listen on port
const port = 3000;
app.listen(port, () => {
    console.log(`URL shortening service running on http://localhost:${port}`);
});

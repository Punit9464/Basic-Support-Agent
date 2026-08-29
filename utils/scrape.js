import axios from 'axios';
import * as cheerio from 'cheerio'

function checkUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export async function scrapeWebpage(url = '') {
    if(url.trim().length === 0 || !checkUrl(url))
        throw new Error("Provide me a valid url to scrape data from.");

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const pageHead = $('head').html();
    const pageBody = $('body').html();

    const links = new Set();

    $('a').each((_, el) => {
        const link = $(el).attr('href');
        if(
            link === '/' ||
            link.startsWith('#') || 
            link.startsWith('mailto') || 
            link.startsWith('http') || 
            link.startsWith('https')
        ) return;

        links.add(link);
    });

    return {
        head: pageHead,
        body: pageBody,
        internalLinks: Array.from(links)
    };
}
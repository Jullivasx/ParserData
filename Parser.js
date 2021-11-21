const fetch = require('node-fetch');
const fs = require('fs');

/**
 * Поиск множества значений в text обрамленых start и end
 * @param {String} text 
 * @param {String} start 
 * @param {String} end 
 */
function findAll(text, start, end) {
    if (typeof(text) !== 'string' ||
        typeof(start) !== 'string' ||
        typeof(end) !== 'string') return [];

    return text.split(start).slice(1).map(v => v.split(end)[0]);
}

/**
 * Поиск первого значения в text обрамленых start и end
 * @param {String} text 
 * @param {String} start 
 * @param {String} end 
 */
function findOne(text, start, end) {
    const result = findAll(text, start, end)[0];
    if (typeof(result) !== 'string') return ''; 
    return result;
}

/**
 * Парсинг строки согласно схеме
 * @param {String} html 
 * @param {Object} schema 
 */
function parse(html, schema) {
    if (typeof(html) !== 'string') return {};
    if (!schema || typeof(schema) !== 'object') return {};

    function x(html, rule) {
        let result;
        if (rule.isArray) {
            result = findAll(html, rule.start, rule.end);
            if (rule.next) {
                result = result.map(value => x(value, rule.next));
            }
            if (rule.nextObject) {
                result = result.map(value => f(value, rule.nextObject));
            }
        } else {
            result = findOne(html, rule.start, rule.end);
            if (rule.next) {
                result = x(result, rule.next);
            }
            if (rule.nextObject) {
                result = f(result, rule.nextObject);
            }
        }
        return result;
    }

    function f(html, schema){
        const result = {};
        Object.entries(schema).forEach(([key, value]) => {
            result[key] =  x(html, value);
        });
        return result;
    }

    return f(html, schema);
}


/**
 * Чтения с сайта по url
 * @param {string} url 
 */
async function fetchHTML(url) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        return html;
    } catch(e) {
        console.error('fetchHTML: error ' + url);
        return '';
    }
}

/**
 * Чтения картинок по url
 * @param {string} url 
 * @param {string} src 
 */
async function fetchImage(url, src) {
    try {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        fs.writeFileSync(src, Buffer.from(buf));
        return true;
    } catch(e) {
        console.error('fetchImage: error ' + url);
        return false;
    }
}

function escape(html) {
    return html.replace(/\t/g, '').replace(/\r/g, '').replace(/\n/g, '');
}

module.exports = {
    findOne,
    findAll,
    parse,
    fetchHTML,
    escape,
    fetchImage,
}
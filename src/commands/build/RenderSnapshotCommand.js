import Command from '../Command.js';
import fs from 'fs';
import nlp from 'compromise/one';
import cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { InsertToDBCommand } from '../query/index.js';

class RenderSnapshotCommand extends Command {
    execute(sessionId, html=null) {
        this.sessionId = sessionId;
        const fileHtmlContents = html ? html : this.getFileContent('../../../snapshots/page.html');
        const fileCssContents = this.getFileContent('../../../snapshots/page.css');
        
        this.saveToDatabase(fileHtmlContents, fileCssContents);
    }

    saveToDatabase(html, css) {
        const insertToDBCommand = new InsertToDBCommand();
        const data = [{
            css: css,
            html: html,
            sessionId: this.sessionId
        }]
        insertToDBCommand.execute(data, 'snapshots', this.sessionId);
    }

    getFileContent(path) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const filePath = join(__dirname, path);
        return fs.readFileSync(filePath, 'utf8');
    }

    parseHtml(html) {
        return cheerio.load(html);
    }

    minimizeContent(data) {
        const elements = data[0];
        return elements.map(element => {
            const doc = nlp(element.content);
            let tokens = doc.json();
            let mostFrequentToken = this.getMostFrequentToken(tokens);
            return {
                ...element,
                content: JSON.stringify(mostFrequentToken)
            };
        });
    }

    getMostFrequentToken(tokens) {
        let frequencyMap = {};
        tokens.forEach(token => {
            if (!frequencyMap[token]) {
                frequencyMap[token] = 0;
            }
            frequencyMap[token]++;
        });
    
        let mostFrequentToken = Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
    
        return mostFrequentToken;
    }

extractElements($) {
    const sections = [];

    $('section').each((sectionIndex, sectionElement) => {
        const section = [];
        $(sectionElement).find('*').each((elementIndex, element) => {
            const processedElement = this.processElement($, element, section);
            if (processedElement) {
                let filteredElement = {};
                for (let [key, value] of Object.entries(processedElement)) {
                    if (value !== '' && value !== undefined && !(Array.isArray(value) && value.length === 0) && !(typeof value === 'object' && Object.keys(value).length === 0)) {
                        filteredElement[key] = value;
                    }
                }
                if (Object.keys(filteredElement).length > 0) {
                    section.push(filteredElement);
                }
            }
        });
        sections.push(section);
    });

    return sections;
}

    processElement($, element, elements) {
        const processedElement = {
            name: element.name,
            style: element.attribs.style,
            class: element.attribs.class,
            id: element.attribs.id,
            otherAttributes: this.extractOtherAttributes(element.attribs),
            content: $(element).text(),
            children: []
        };

        if (element.parent) {
            const parent = elements.find(el => el === element.parent);
            if (parent) {
                parent.children.push(processedElement);
            }
        }

        return processedElement;
    }

    extractOtherAttributes(attribs) {
        const otherAttributes = {};

        for (let key in attribs) {
            if (!['style', 'class', 'id'].includes(key)) {
                otherAttributes[key] = attribs[key];
            }
        }

        return otherAttributes;
    }
}

export default RenderSnapshotCommand;
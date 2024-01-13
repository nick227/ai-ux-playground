import Command from '../Command.js';
import fs from 'fs';
import nlp from 'compromise';
import cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { InsertToDBCommand } from '../query/index.js';

class RenderSnapshotCommand extends Command {
    execute(sessionId) {
        this.sessionId = sessionId;
        const filePath = this.getFilePath();
        const html = this.getFileContent(filePath);
        const $ = this.parseHtml(html);
        const elements = this.extractElements($);
        const abbreviatedElements = this.minimizeContent(elements);
        this.saveToDatabase(abbreviatedElements);
    }

    getFilePath() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        return join(__dirname, '../../embeddings/test.html');
    }

    getFileContent(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    }

    parseHtml(html) {
        return cheerio.load(html);
    }

    minimizeContent(elements) {
        return elements.map(element => {
            const doc = nlp(element.content);
            const tokens = doc.terms().out('freq'); // Get the frequency of each token
            let mostFrequentToken = '';
            if (tokens.length > 0) {
                mostFrequentToken = tokens[0].normal; // Get the most frequent token
            }
            return {
                ...element,
                content: mostFrequentToken
            };
        });
    }

    saveToDatabase(elements) {
        const insertToDBCommand = new InsertToDBCommand();
        let jsonString = JSON.stringify(elements);
        jsonString = jsonString.replace(/\\"/g, '"');
        const data = {
            document: jsonString,
            sessionId: this.sessionId
        }
        insertToDBCommand.execute(data, 'snapshots');
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
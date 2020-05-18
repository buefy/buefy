var fs = require('fs');
var path = require('path');

const buefyDir = path.resolve(__dirname, '../docs/pages/components')

var tags = {}
var attributes = {}

fs.readdirSync(buefyDir, { withFileTypes: true })
    .filter(item => item.isDirectory()
    ).forEach(dir => {
        const componentName = dir.name
        const componentJsPath = buefyDir + '/' + dir.name + '/api/' + dir.name + '.js'
        console.log('Processing --> ' + componentJsPath)

        let mainTag = {
            "attributes": [],
            "description": `Buefy component <b-${componentName}>`,
            "subtags": []
        }

        let componentJs = require(componentJsPath).default;
        console.log(componentJs)
        componentJs.forEach((tag, index) => {
            let htmlName;
            let curTag;
            if (index == 0) {
                curTag = mainTag
                htmlName = 'b-' + componentName
                tags[htmlName] = curTag;
            } else {
                htmlName = 'b-' + componentName + '-' + tag.title.toLowerCase()
                curTag = {
                    "attributes": [],
                    "description": `Buefy component <${htmlName}>`,
                    "subtags": []
                }
                tags[htmlName] = curTag;
                mainTag.subtags.push(htmlName)
            }

            tag.props.forEach(prop => {
                const name = prop.name.replace('<code>', '').replace('</code>', '').replace('v-model', 'value')
                if (!name.includes('Any'))
                    curTag.attributes.push(name);

                attributes[htmlName + '/' + name] = {
                    "description": prop.description.split('<code>').join('').split('</code>').join(''),
                    "type": prop.type.toLowerCase().replace(' ', '').replace(',', '|')
                }
            });
        });
    });

fs.writeFile(path.resolve(__dirname, '../helper-json/tags.json'), JSON.stringify(tags, null, 2), function (err, data) {
    if (err) {
        return console.log(err);
    }
})
fs.writeFile(path.resolve(__dirname, '../helper-json/attributes.json'), JSON.stringify(attributes, null, 2), function (err, data) {
    if (err) {
        return console.log(err);
    }
})


import fs from 'fs-extra';
import path from 'path';



export default async function File_To_Base64() {

    try {

        const __dirname = path.resolve();
        fs.mkdirSync(__dirname + "/Output", { recursive: true });
        fs.writeJSONSync(__dirname + "/Output/base64.json", {});
        fs.writeJSONSync(__dirname + "/Output/FileArray.json", []);
        
        let Files = fs.readdirSync(__dirname)
        let extensions = [".mp3",".mp4",".jpg",".jpeg",".png",".gif",".txt",".pdf",".svg",".webp"]
        for (let lop of Files) {
        
            if (extensions.some(fltr => lop.includes(fltr))) {
        
                let Base64 = fs.readFileSync(__dirname + `/${lop}`).toString('base64');
                let Base64json = fs.readJsonSync(__dirname + '/Output/base64.json');
                let FileArrayjson = fs.readJsonSync(__dirname + '/Output/FileArray.json');
                let OPJ = {
                    FileName:lop,
                    Base64:Base64
                }
                FileArrayjson.push(OPJ)
                fs.writeJsonSync(__dirname + '/Output/FileArray.json', FileArrayjson, {spaces:'\t'});
                fs.writeJsonSync(__dirname + '/Output/base64.json', Object.assign({}, Base64json, {[lop]:{"base64":Base64}}), {spaces:'\t'});
                console.log(`${lop} converted to Base64 `);
                
            }

        }

        console.log('\n\n\nFiles has been added to base64.json');

        return fs.readJsonSync(__dirname + '/Output/base64.json');
        
    } catch (error) {

        console.log(error);
        
    }
    
}

File_To_Base64()
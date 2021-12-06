#!/usr/bin/env node

'use strict'

import fs from 'fs-extra';
import path from 'path';



export default async function File_To_Base64() {

    try {

        const __dirname = path.resolve();
        fs.mkdirSync(__dirname + "/Files-Json", { recursive: true });

        let Files = fs.readdirSync(__dirname)
        let extensions = [".mp3",".mp4",".jpg",".jpeg",".png",".gif",".txt",".pdf",".svg",".webp"]
        for (let lop of Files) {
        
            if (extensions.some(fltr => lop.includes(fltr))) {
        
                let Base64 = fs.readFileSync(__dirname + `/${lop}`).toString('base64');
                let FileName = lop.split('.',1)[0]
                let OPJ = {
                    FileName:lop,
                    Base64:Base64
                }
                fs.writeJsonSync(__dirname + `/Files-Json/${FileName}.json`, OPJ, {spaces:'\t'});
                console.log(`${lop} converted to ${FileName}.json`);
                
            }

        }

        console.log('\n\nDone...');
        
    } catch (error) {

        console.log(error);
        
    }
    
}

File_To_Base64()
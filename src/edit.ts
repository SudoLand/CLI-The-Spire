/**
 * @author WMXPY
 * @namespace CLI
 * @description Edit
 */

import { attemptMarkDir, readTextFile, removeFile, writeTextFile } from "@sudoo/io";
import { openFile, waitForKeyPress } from "@sudoo/shell";
import * as Path from "path";
import { decryptSaveFile, encryptSaveFile, SaveFile } from "slay-the-spire";

export const editAndUpdateSaveFile = async (fileName: string): Promise<void> => {

    const fileExtension: string = Path.extname(fileName);
    if (fileExtension !== '.autosave') {
        console.log('Provide AutoSave');
        process.exit();
    }

    const baseFileName: string = Path.basename(fileName, '.autosave');
    const backupFileName: string = `${baseFileName}.backup.autosave`;

    const beforeContent: string = await readTextFile(fileName);

    const tempFolderPath: string = Path.resolve('temp');
    await attemptMarkDir(tempFolderPath);

    const backupLocation: string = Path.join(tempFolderPath, backupFileName);
    await writeTextFile(backupLocation, beforeContent);

    const decrypted: SaveFile = decryptSaveFile(beforeContent);

    const tempJsonLocation: string = Path.join(tempFolderPath, 'temp.json');
    await writeTextFile(tempJsonLocation, JSON.stringify(decrypted, null, 2));
    await openFile(tempJsonLocation);

    console.log(`BACKUP AT --- <${backupLocation}>`);
    console.log(`EDITING ----- <${tempJsonLocation}>`);
    console.log('Press any key to continue...');
    console.log('Press <ESC> to cancel...');

    const shouldContinue: boolean = await waitForKeyPress({
        cancelKeys: ['escape'],
    });
    if (!shouldContinue) {
        console.log('ABANDONED!');
        process.exit();
    }

    const afterContent: string = await readTextFile(tempJsonLocation);
    await removeFile(tempJsonLocation);

    const encrypted: string = encryptSaveFile(JSON.parse(afterContent));

    await writeTextFile(fileName, encrypted);

    console.log('DONE!');
    process.exit();
};

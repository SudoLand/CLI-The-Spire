/**
 * @author WMXPY
 * @namespace CLI
 * @description Open
 */

import { exec } from "child_process";

const getOpenCommand = (): string => {

    switch (process.platform) {
        case 'win32':
            return 'start';
    }

    return 'open';
};

export const openFile = (file: string): Promise<void> => {

    return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

        const openCommand: string = getOpenCommand();
        exec(`${openCommand} ${file}`, (error: any, stdout: string, stderr: string) => {

            if (!error) {
                resolve();
                return;
            }

            reject(stderr);
        });
    });
};

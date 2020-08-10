/**
 * @author WMXPY
 * @namespace CLI
 * @description Open
 */

import { exec } from "child_process";

export const openFile = (file: string): Promise<void> => {

    return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

        exec(`open ${file}`, (error: any, stdout: string, stderr: string) => {

            if (!error) {
                resolve();
                return;
            }

            reject(stderr);
        });
    });
};

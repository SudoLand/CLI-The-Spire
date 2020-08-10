/**
 * @author WMXPY
 * @namespace CLI
 * @description Input
 */

const escCharCode: number = 27;

export const waitForKeyPress = (): Promise<boolean> => {

    process.stdin.setRawMode(true);

    return new Promise<boolean>((resolve: (result: boolean) => void) => {

        process.stdin.on('data', (buffer: Buffer) => {

            const charCode: number = buffer.toString().charCodeAt(0);
            process.stdin.setRawMode(false);

            if (charCode === escCharCode) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

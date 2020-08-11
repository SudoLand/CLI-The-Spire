/**
 * @author WMXPY
 * @namespace CLI
 * @description CLI
 */

import { Argument, Coco, Command } from "@sudoo/coco";
import * as Path from "path";
import { editAndUpdateSaveFile } from "./edit";

const coco = Coco.create();

type EditCommandOption = {

    readonly path: string;
};

coco.command(Command.create('edit')
    .argument(Argument.create('path'))
    .then(async (args: EditCommandOption) => {
        const path: string = Path.resolve(args.path);
        await editAndUpdateSaveFile(path);
    }),
);

export const execute = async (args: string[]): Promise<void> => {

    await coco.go(args);
};

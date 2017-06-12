/**
 * Created on 2017/6/10.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
'use strict';

const loader = require('dir-traverse');
const PATH = require('path');

module.exports = function (App) {
    let {configs} = App;
    let baseDir = configs.dir;
    let mongoose = App.mongoose;
    if (!mongoose) {
        throw new Error(`'App.mongoose' is not initialized yet.`);
    }
    let dir = configs.schemaDir = configs.schemaDir || 'schema';
    let getSchema = path => {
        let m = require(path);
        if (typeof m === 'function') {
            return m(mongoose.Schema);
        }

        let s = new mongoose.Schema(m.schema, m.options);
        Object.keys(m)
            .filter(k => ['schema', 'options'].indexOf(k) < 0)
            .forEach(k => Object.assign(s, m[k]));
        return s;
    };

    App.schema = {};

    loader(PATH.resolve(baseDir, dir), {
        handler: (({name, filename, fullPath, isDirectory}) => {
            if (isDirectory) {
                console.warn(`Detected an directory '${filename}', please ensure it exports a schema object.`);
            }
            App.schema[name] = getSchema(fullPath);
        })
    });

    return App.schema;
};

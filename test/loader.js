/**
 * Created on 2017/6/10.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
const loader = require('../');
const PATH = require('path');
const connect = require('gnat-mongoose');
const assert = require('chai').assert;

const mongoUrl = 'mongodb://127.0.0.1:27017/test';
const App = {
    configs: {
        dir: PATH.resolve(__dirname, '../'),
        schemaDir: 'test/mock/schema',
    }
};

describe('schema-loader', function () {
    before('connect db', function () {
        let {db, mongoose} = connect({
            url: mongoUrl
        });
        App.db = db;
        App.mongoose = mongoose;
    });
    it('execute', function () {
        loader(App);
        let SchemaMap = App.schema;
        assert.instanceOf(SchemaMap.Cat, App.mongoose.Schema);
        assert.instanceOf(SchemaMap.Dog, App.mongoose.Schema);
    });
});

/**
 * Created on 2017/6/10.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
module.exports = function (Schema) {
    return new Schema({
        say: {type: String, value: 'miaow'},
        name: {type: String, required: true}
    });
};

require('core-js/stable')
require('regenerator-runtime/runtime');

const encodings = require('./node_modules/iconv-lite/encodings');                                                                                                                                                                       
const iconvLite = require('./node_modules/iconv-lite/lib');                                                                                                                                                                             
iconvLite.getCodec('UTF-8');
// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "S", "symbols": ["T", "S1"]},
    {"name": "S1", "symbols": [{"literal":"+","pos":12}, "T", "S1"]},
    {"name": "S1", "symbols": ["e"]},
    {"name": "T", "symbols": ["F", "T1"]},
    {"name": "T1", "symbols": [{"literal":"*","pos":34}, "F", "T1"]},
    {"name": "T1", "symbols": ["e"]},
    {"name": "F", "symbols": [{"literal":"a","pos":48}]},
    {"name": "F", "symbols": [{"literal":"(","pos":50}, "S", {"literal":")","pos":54}]},
    {"name": "e", "symbols": []}
]
  , ParserStart: "S"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

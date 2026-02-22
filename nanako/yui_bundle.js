var YuiEditor = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/browser_entry.js
  var browser_entry_exports = {};
  __export(browser_entry_exports, {
    YuiError: () => YuiError,
    YuiRuntime: () => YuiRuntime,
    YuiType: () => YuiType,
    YuiValue: () => YuiValue,
    getAllExamples: () => getAllExamples
  });

  // src/yuiast.js
  var OPERATORS = null;
  function setOperators(operators) {
    OPERATORS = operators;
  }
  var ASTNode = class {
    constructor() {
      this.filename = "main.yui";
      this.source = "";
      this.pos = 0;
      this.endPos = -1;
      this.comment = null;
    }
    setpos(source, pos, endPos = -1, filename = "main.yui") {
      this.source = source;
      this.pos = pos;
      this.endPos = endPos;
      this.filename = filename;
      this.comment = null;
      return this;
    }
    toString() {
      return this.source.slice(this.pos, this.endPos);
    }
    evaluate(runtime) {
      return this.visit(runtime);
    }
    visit(visitor) {
      const method = "visit" + this.constructor.name;
      if (typeof visitor[method] === "function") {
        return visitor[method](this);
      }
      if (typeof visitor.visitASTNode === "function") {
        return visitor.visitASTNode(this);
      }
      throw new Error(`No visitor method: ${method}`);
    }
    extract() {
      let linenum = 1;
      let col = 1;
      let start = 0;
      for (let i = 0; i < this.source.length; i++) {
        if (i === this.pos) break;
        if (this.source[i] === "\n") {
          linenum++;
          col = 1;
          start = i + 1;
        } else {
          col++;
        }
      }
      let endPos = this.source.indexOf("\n", start);
      if (endPos === -1) endPos = this.source.length;
      return [linenum, col, this.source.slice(start, endPos)];
    }
  };
  var ExpressionNode = class extends ASTNode {
    constructor() {
      super();
    }
  };
  function _node(node) {
    if (node === null || node === void 0) return null;
    if (typeof node === "number") return new NumberNode(node);
    if (typeof node === "string") return new StringNode(node);
    if (Array.isArray(node)) return new ArrayNode(node.map(_node));
    if (node instanceof ASTNode) return node;
    throw new Error(`Cannot convert to ASTNode: ${node}`);
  }
  var ConstNode = class extends ExpressionNode {
    // null/boolean: nativeValue is null, true, or false
    constructor(value = null) {
      super();
      this.nativeValue = value;
    }
    visit(visitor) {
      return visitor.visitConstNode(this);
    }
  };
  var NumberNode = class extends ExpressionNode {
    constructor(value, isFloat = false) {
      super();
      this.nativeValue = value;
      this.isFloat = isFloat;
    }
    visit(visitor) {
      return visitor.visitNumberNode(this);
    }
  };
  var ArrayLenNode = class extends ExpressionNode {
    constructor(element) {
      super();
      this.element = element;
    }
    visit(visitor) {
      return visitor.visitArrayLenNode(this);
    }
  };
  var MinusNode = class extends ExpressionNode {
    constructor(element) {
      super();
      this.element = element;
    }
    visit(visitor) {
      return visitor.visitMinusNode(this);
    }
  };
  var StringNode = class extends ExpressionNode {
    constructor(contents) {
      super();
      this.contents = contents;
    }
    visit(visitor) {
      return visitor.visitStringNode(this);
    }
  };
  var ArrayNode = class extends ExpressionNode {
    constructor(elements) {
      super();
      this.elements = elements.map(_node);
    }
    visit(visitor) {
      return visitor.visitArrayNode(this);
    }
  };
  var ObjectNode = class extends ExpressionNode {
    constructor(elements) {
      super();
      this.elements = elements.map(_node);
    }
    visit(visitor) {
      return visitor.visitObjectNode(this);
    }
  };
  var NameNode = class extends ExpressionNode {
    constructor(name) {
      super();
      this.name = name;
    }
    visit(visitor) {
      return visitor.visitNameNode(this);
    }
    update(value, visitor) {
      visitor.setenv(this.name, value);
    }
  };
  var GetIndexNode = class extends ASTNode {
    constructor(collection, index) {
      super();
      this.collection = _node(collection);
      this.indexNode = _node(index);
    }
    visit(visitor) {
      return visitor.visitGetIndexNode(this);
    }
    update(value, visitor) {
      const collection = this.collection.visit(visitor);
      const index = this.indexNode.visit(visitor);
      collection.setItem(index, value);
    }
  };
  var BinaryNode = class extends ASTNode {
    constructor(left, operator, right, comparative = false) {
      super();
      this.leftNode = _node(left);
      this.operator = operator;
      this.rightNode = _node(right);
      this.comparative = comparative;
    }
  };
  var FuncAppNode = class extends ExpressionNode {
    constructor(name, argumentsList) {
      super();
      this.nameNode = typeof name === "string" ? new NameNode(name) : _node(name);
      this.arguments = argumentsList.map(_node);
      this.snippet = "";
    }
    visit(visitor) {
      return visitor.visitFuncAppNode(this);
    }
  };
  var StatementNode = class extends ASTNode {
    constructor() {
      super();
    }
  };
  var AssignmentNode = class extends StatementNode {
    constructor(variable, expression) {
      super();
      this.variable = typeof variable === "string" ? new NameNode(variable) : _node(variable);
      this.expression = _node(expression);
    }
    visit(visitor) {
      return visitor.visitAssignmentNode(this);
    }
  };
  var IncrementNode = class extends StatementNode {
    constructor(variable) {
      super();
      this.variable = typeof variable === "string" ? new NameNode(variable) : _node(variable);
    }
    visit(visitor) {
      return visitor.visitIncrementNode(this);
    }
  };
  var DecrementNode = class extends StatementNode {
    constructor(variable) {
      super();
      this.variable = typeof variable === "string" ? new NameNode(variable) : _node(variable);
    }
    visit(visitor) {
      return visitor.visitDecrementNode(this);
    }
  };
  var AppendNode = class extends StatementNode {
    constructor(variable, expression) {
      super();
      this.variable = typeof variable === "string" ? new NameNode(variable) : _node(variable);
      this.expression = _node(expression);
    }
    visit(visitor) {
      return visitor.visitAppendNode(this);
    }
  };
  var BlockNode = class extends StatementNode {
    constructor(statements, topLevel = false) {
      super();
      if (statements instanceof StatementNode) {
        this.statements = [statements];
      } else {
        this.statements = statements;
      }
      this.topLevel = topLevel;
    }
    visit(visitor) {
      return visitor.visitBlockNode(this);
    }
  };
  var IfNode = class extends StatementNode {
    constructor(left, operator, right, thenBlock, elseBlock = null) {
      super();
      this.left = _node(left);
      this.operator = OPERATORS[operator];
      this.right = _node(right);
      this.thenBlock = thenBlock;
      this.elseBlock = elseBlock;
    }
    visit(visitor) {
      return visitor.visitIfNode(this);
    }
  };
  var BreakNode = class extends StatementNode {
    constructor() {
      super();
    }
    visit(visitor) {
      return visitor.visitBreakNode(this);
    }
  };
  var PassNode = class extends StatementNode {
    constructor(comment = null) {
      super();
      this.comment = comment;
    }
    visit(visitor) {
      return visitor.visitPassNode(this);
    }
  };
  var RepeatNode = class extends StatementNode {
    constructor(countNode, blockNode) {
      super();
      this.countNode = _node(countNode);
      this.blockNode = blockNode;
    }
    visit(visitor) {
      return visitor.visitRepeatNode(this);
    }
  };
  var ImportNode = class extends StatementNode {
    constructor(moduleName = null) {
      super();
      this.moduleName = typeof moduleName === "string" ? new NameNode(moduleName) : _node(moduleName);
    }
    visit(visitor) {
      return visitor.visitImportNode(this);
    }
  };
  var ReturnNode = class extends StatementNode {
    constructor(expression) {
      super();
      this.expression = _node(expression);
    }
    visit(visitor) {
      return visitor.visitReturnNode(this);
    }
  };
  var FuncDefNode = class extends StatementNode {
    constructor(nameNode, parameters, body) {
      super();
      this.nameNode = typeof nameNode === "string" ? new NameNode(nameNode) : _node(nameNode);
      this.parameters = parameters.map((p) => typeof p === "string" ? new NameNode(p) : _node(p));
      this.body = body;
    }
    visit(visitor) {
      return visitor.visitFuncDefNode(this);
    }
  };
  var PrintExpressionNode = class extends StatementNode {
    constructor(expression, inspection = false, groping = false) {
      super();
      this.expression = _node(expression);
      this.inspection = inspection;
      this.groping = groping;
    }
    visit(visitor) {
      return visitor.visitPrintExpressionNode(this);
    }
  };
  var AssertNode = class extends StatementNode {
    constructor(test, reference) {
      super();
      this.test = _node(test);
      this.reference = _node(reference);
    }
    visit(visitor) {
      return visitor.visitAssertNode(this);
    }
  };

  // src/yuitypes.js
  var TY_NULL = "\u26D4";
  var TY_BOOLEAN = "\u{1F518}";
  var TY_INT = "\u{1F4AF}";
  var TY_FLOAT = "\u{1F4CA}";
  var TY_NUMBER = "\u{1F522}";
  var TY_ARRAY = "\u{1F361}";
  var TY_OBJECT = "\u{1F5C2}\uFE0F";
  var TY_STRING = "\u{1F4AC}";
  var YuiError = class extends Error {
    constructor(messages, errorNode = null, runtime = null, BK = false) {
      const msg = Array.isArray(messages) ? messages.join(" ") : String(messages);
      super(msg);
      this.messages = Array.isArray(messages) ? messages : [messages];
      this.errorNode = errorNode instanceof ASTNode ? errorNode : null;
      this.runtime = runtime;
      this.BK = BK;
      this.name = "YuiError";
    }
    get lineno() {
      if (this.errorNode) {
        const [line] = this.errorNode.extract();
        return line;
      }
      return 0;
    }
    get offset() {
      if (this.errorNode) {
        const [, offset] = this.errorNode.extract();
        return offset;
      }
      return 0;
    }
    get text() {
      if (this.errorNode) {
        const [, , snippet] = this.errorNode.extract();
        return snippet;
      }
      return "";
    }
    formattedMessage(prefix = " ", marker = "^", lineoffset = 0) {
      const message = this.messages.join(" ");
      let msg = message;
      if (this.errorNode) {
        const [line, col, snippet] = this.errorNode.extract();
        const length = Math.max(
          this.errorNode.endPos != null ? this.errorNode.endPos - this.errorNode.pos : 3,
          3
        );
        const makePointer = marker.repeat(Math.min(length, 16));
        const firstLine = snippet.split("\n")[0];
        const indent = " ".repeat(col - 1);
        msg = `${message} line ${line + lineoffset}, column ${col}:
${prefix}${firstLine}
${prefix}${indent}${makePointer}`;
      }
      if (this.runtime === null) {
        msg = `[\u69CB\u6587\u30A8\u30E9\u30FC/SyntaxError] ${msg}`;
      } else {
        msg = `[\u5B9F\u884C\u6642\u30A8\u30E9\u30FC/RuntimeError] ${msg}
[\u74B0\u5883/Environment] ${this.runtime.stringfyEnv(-1)}
`;
      }
      return msg;
    }
  };
  var YuiType = class _YuiType {
    constructor(name, emoji) {
      this.name = name;
      this.emoji = emoji;
    }
    toString() {
      return this.emoji;
    }
    // Abstract: must be overridden
    match(value) {
      throw new Error("Abstract method: match");
    }
    matchOrRaise(nodeOrValue = null) {
      if (!this.match(nodeOrValue)) {
        throw new YuiError(
          ["error", "type", `\u2705<${this.emoji}${this.name}>`, `\u274C${nodeOrValue}`],
          nodeOrValue instanceof ASTNode ? nodeOrValue : null
        );
      }
    }
    toArrayview(n) {
      throw new Error("Abstract method: toArrayview");
    }
    toNative(elements, node = null) {
      throw new Error("Abstract method: toNative");
    }
    stringfy(nativeValue, indentPrefix = "", width = 80) {
      throw new Error("Abstract method: stringfy");
    }
    equals(leftNode, rightNode) {
      const leftValue = _YuiType.toNative(leftNode);
      const rightValue = _YuiType.toNative(rightNode);
      return leftValue === rightValue;
    }
    lessThan(leftNode, rightNode, op = "<") {
      throw new YuiError(
        ["unsupported", "comparison", `\u274C${leftNode} ${op} ${rightNode}`],
        leftNode instanceof ASTNode ? leftNode : null
      );
    }
    // ─── static utility methods ───
    static evaluated(value) {
      return value;
    }
    static isBool(nodeOrValue) {
      return _YuiType.BooleanType.match(nodeOrValue);
    }
    static isInt(nodeOrValue) {
      return _YuiType.IntType.match(nodeOrValue);
    }
    static isFloat(nodeOrValue) {
      return _YuiType.FloatType.match(nodeOrValue);
    }
    static isNumber(nodeOrValue) {
      return _YuiType.NumberType.match(nodeOrValue);
    }
    static isString(nodeOrValue) {
      return _YuiType.StringType.match(nodeOrValue);
    }
    static isArray(nodeOrValue) {
      return _YuiType.ArrayType.match(nodeOrValue);
    }
    static isObject(nodeOrValue) {
      return _YuiType.ObjectType.match(nodeOrValue);
    }
    static matchedNative(nodeOrValue) {
      if (nodeOrValue instanceof YuiValue) {
        return nodeOrValue.native;
      }
      return nodeOrValue;
    }
    static fromArrayview(value) {
      if (value instanceof YuiValue) return value;
      return new YuiValue(value);
    }
    static intoArrayview(nodeOrValue) {
      const value = nodeOrValue;
      if (value instanceof YuiValue && value.isPrimitive()) {
        return value.native;
      }
      if (typeof value === "number" || typeof value === "string" || value === null) {
        return value;
      }
      if (value instanceof YuiValue) return value;
      return new YuiValue(value);
    }
    static arrayviewS(value) {
      if (value === null || value === void 0) return "null";
      if (typeof value === "string") {
        const escaped = value.replace(/"/g, '\\"').replace(/\n/g, "\\n");
        return `"${escaped}"`;
      }
      if (typeof value === "number" && !Number.isInteger(value)) {
        return value.toFixed(6);
      }
      return String(value);
    }
    // Convert YuiValue (or nested) to native JS value
    static toNative(nodeOrValue) {
      if (nodeOrValue instanceof YuiValue) {
        return nodeOrValue.native;
      }
      if (Array.isArray(nodeOrValue)) {
        return nodeOrValue.map((v) => _YuiType.toNative(v));
      }
      if (nodeOrValue !== null && typeof nodeOrValue === "object" && !(nodeOrValue instanceof YuiValue)) {
        const result = {};
        for (const [k, v] of Object.entries(nodeOrValue)) {
          result[String(k)] = _YuiType.toNative(v);
        }
        return result;
      }
      return nodeOrValue;
    }
    static nativeToYui(nativeValue) {
      if (nativeValue === null || nativeValue === void 0) return YuiValue.NullValue;
      if (typeof nativeValue === "boolean") {
        return nativeValue ? YuiValue.TrueValue : YuiValue.FalseValue;
      }
      if (typeof nativeValue === "number" || Array.isArray(nativeValue) || typeof nativeValue === "string" || typeof nativeValue === "object" && nativeValue !== null) {
        return new YuiValue(nativeValue);
      }
      if (nativeValue instanceof YuiValue) return nativeValue;
      return new YuiValue(nativeValue);
    }
    static yuiToNative(value) {
      if (value instanceof YuiValue) {
        return value.native;
      }
      if (Array.isArray(value)) {
        return value.map((e) => _YuiType.yuiToNative(e));
      }
      if (value !== null && typeof value === "object") {
        const result = {};
        for (const [key, item] of Object.entries(value)) {
          result[key] = _YuiType.yuiToNative(item);
        }
        return result;
      }
      return value;
    }
    static compare(leftNodeOrValue, rightNodeOrValue) {
      if (_YuiType.isNumber(leftNodeOrValue) && _YuiType.isNumber(rightNodeOrValue)) {
        const lv2 = _round(_YuiType.matchedNative(leftNodeOrValue), 6);
        const rv2 = _round(_YuiType.matchedNative(rightNodeOrValue), 6);
        return _compare(lv2, rv2);
      }
      if (_YuiType.isString(leftNodeOrValue) && _YuiType.isString(rightNodeOrValue)) {
        const lv2 = _YuiType.matchedNative(leftNodeOrValue);
        const rv2 = _YuiType.matchedNative(rightNodeOrValue);
        return _compare(lv2, rv2);
      }
      let lv = leftNodeOrValue;
      let rv = rightNodeOrValue;
      if (!(rv instanceof YuiValue)) {
        rv = new YuiValue(rv.native);
      }
      return _compare(lv.arrayview, rv.arrayview);
    }
  };
  YuiType.NullType = null;
  YuiType.BooleanType = null;
  YuiType.IntType = null;
  YuiType.FloatType = null;
  YuiType.NumberType = null;
  YuiType.StringType = null;
  YuiType.ArrayType = null;
  YuiType.ObjectType = null;
  function _round(n, decimals) {
    const factor = 10 ** decimals;
    return Math.round(n * factor) / factor;
  }
  function _compare(left, right) {
    if (left === right) return 0;
    if (left < right) return -1;
    return 1;
  }
  var YuiNullType = class _YuiNullType extends YuiType {
    constructor() {
      super("null", TY_NULL);
    }
    match(nodeOrValue) {
      if (nodeOrValue === null || nodeOrValue === void 0) return true;
      return nodeOrValue instanceof YuiValue && nodeOrValue.type instanceof _YuiNullType;
    }
    checkElement(nodeOrValue) {
      throw new YuiError(["immutable", `\u274C${this}`], null);
    }
    toArrayview(n) {
      return [];
    }
    toNative(elements, node = null) {
      return null;
    }
    stringfy(nativeValue, indentPrefix = "", width = 80) {
      return "null";
    }
  };
  var YuiBooleanType = class _YuiBooleanType extends YuiType {
    constructor() {
      super("boolean", TY_BOOLEAN);
    }
    match(nodeOrValue) {
      if (typeof nodeOrValue === "boolean") return true;
      return nodeOrValue instanceof YuiValue && nodeOrValue.type instanceof _YuiBooleanType;
    }
    checkElement(nodeOrValue) {
      throw new YuiError(["immutable", `\u274C${this}`], null);
    }
    toArrayview(n) {
      return n ? [1] : [];
    }
    toNative(elements, node = null) {
      return elements.length > 0;
    }
    stringfy(nativeValue, indentPrefix = "", width = 80) {
      return nativeValue ? "true" : "false";
    }
    equals(leftNode, rightNode) {
      const leftValue = YuiType.toNative(leftNode);
      const rightValue = YuiType.toNative(rightNode);
      if (typeof rightValue === "boolean") {
        return leftValue === rightValue;
      }
      return false;
    }
    lessThan(leftNode, rightNode, op = "<") {
      const leftValue = YuiType.toNative(leftNode);
      const rightValue = YuiType.toNative(rightNode);
      if (typeof rightValue === "boolean") {
        return leftValue < rightValue;
      }
      return super.lessThan(leftNode, rightNode, op);
    }
  };
  var YuiIntType = class _YuiIntType extends YuiType {
    constructor() {
      super("int", TY_INT);
    }
    match(nodeOrValue) {
      if (typeof nodeOrValue === "number" && Number.isInteger(nodeOrValue)) return true;
      return nodeOrValue instanceof YuiValue && nodeOrValue.type instanceof _YuiIntType;
    }
    checkElement(nodeOrValue) {
      YuiType.IntType.matchOrRaise(nodeOrValue);
      const value = YuiType.matchedNative(nodeOrValue);
      if (value !== 0 && value !== 1) {
        throw new YuiError(["error", "value", "\u27050/1", `\u274C${value}`], null);
      }
    }
    toArrayview(n) {
      const nUnsigned = n >>> 0;
      const bits = [];
      for (let i = 31; i >= 0; i--) {
        bits.push(nUnsigned >>> i & 1);
      }
      return bits;
    }
    toNative(bits, node = null) {
      if (bits.length !== 32) {
        throw new YuiError(["array", "format", `\u274C${bits.length}`, "\u270532"], node);
      }
      let nUnsigned = 0;
      for (const bit of bits) {
        nUnsigned = nUnsigned * 2 + bit | 0;
      }
      nUnsigned = nUnsigned >>> 0;
      if (nUnsigned >= 2147483648) {
        return nUnsigned - 4294967296;
      }
      return nUnsigned;
    }
    stringfy(nativeValue, indentPrefix = "", width = 80) {
      return String(nativeValue);
    }
    equals(leftNode, rightNode) {
      const leftValue = YuiType.toNative(leftNode);
      const rightValue = YuiType.toNative(rightNode);
      if (typeof rightValue === "boolean") return false;
      if (typeof rightValue === "number" && !Number.isInteger(rightValue)) {
        return _round(leftValue, 6) === _round(rightValue, 6);
      }
      return leftValue === rightValue;
    }
    lessThan(leftNode, rightNode, op = "<") {
      const leftValue = YuiType.toNative(leftNode);
      const rightValue = YuiType.toNative(rightNode);
      if (typeof rightValue === "number") {
        if (!Number.isInteger(rightValue)) {
          return _round(leftValue, 6) < _round(rightValue, 6);
        }
        return leftValue < rightValue;
      }
      return super.lessThan(leftNode, rightNode, op);
    }
  };
  var YuiFloatType = class _YuiFloatType extends YuiType {
    constructor() {
      super("float", TY_FLOAT);
    }
    match(nodeOrValue) {
      if (typeof nodeOrValue === "number" && !Number.isInteger(nodeOrValue)) return true;
      return nodeOrValue instanceof YuiValue && nodeOrValue.type instanceof _YuiFloatType;
    }
    checkElement(nodeOrValue) {
      YuiType.IntType.matchOrRaise(nodeOrValue);
      const value = YuiType.matchedNative(nodeOrValue);
      if (value < -1 || value > 9) {
        throw new YuiError(["error", "value", "\u2705-1,0-9", `\u274C${value}`], null);
      }
    }
    toArrayview(x) {
      const sign = x < 0 ? -1 : 1;
      const s = Math.abs(x).toFixed(6).replace(".", "");
      const digits = [sign, ...s.split("").map(Number)];
      return digits;
    }
    toNative(digits, node = null) {
      const sign = digits[0];
      if (sign !== 1 && sign !== -1) {
        throw new YuiError(["conversion", "tofloat", `\u274C[0]${digits[0]}`, "\u27051/-1", `\u{1F50D}${digits}`], node);
      }
      const numDigits = digits.slice(1);
      for (let i = 0; i < numDigits.length; i++) {
        const d = numDigits[i];
        if (!Number.isInteger(d) || d < 0 || d > 9) {
          throw new YuiError(["conversion", "tofloat", `\u274C[${i + 1}]${d}`, "\u27050-9", `\u{1F50D}${digits}`], node);
        }
      }
      const s = numDigits.join("");
      let value;
      if (s.length <= 6) {
        value = parseInt(s, 10);
      } else {
        value = parseFloat(s.slice(0, -6) + "." + s.slice(-6));
      }
      return sign * value;
    }
    stringfy(nativeValue, indentPrefix = "", width = 80) {
      return nativeValue.toFixed(6);
    }
    equals(leftNode, rightNode) {
      const leftValue = _round(YuiType.toNative(leftNode), 6);
      const rightValue = YuiType.toNative(rightNode);
      if (typeof rightValue === "number") {
        return leftValue === _round(rightValue, 6);
      }
      return false;
    }
    lessThan(leftNode, rightNode, op = "<") {
      const leftValue = YuiType.toNative(leftNode);
      const rightValue = YuiType.toNative(rightNode);
      if (typeof rightValue === "number") {
        return leftValue < rightValue;
      }
      return super.lessThan(leftNode, rightNode, op);
    }
  };
  var YuiNumberType = class extends YuiType {
    constructor() {
      super("number", TY_NUMBER);
    }
    match(nodeOrValue) {
      return YuiType.IntType.match(nodeOrValue) || YuiType.FloatType.match(nodeOrValue);
    }
    checkElement(nodeOrValue) {
    }
    toArrayview(n) {
      if (!Number.isInteger(n)) {
        return YuiType.FloatType.toArrayview(n);
      }
      return YuiType.IntType.toArrayview(n);
    }
    toNative(bits, node = null) {
      if (bits.length === 32) {
        return YuiType.IntType.toNative(bits, node);
      }
      return YuiType.FloatType.toNative(bits, node);
    }
    stringfy(nativeValue, indentPrefix = "", width = 80) {
      if (!Number.isInteger(nativeValue)) {
        return YuiType.FloatType.stringfy(nativeValue, indentPrefix, width);
      }
      return YuiType.IntType.stringfy(nativeValue, indentPrefix, width);
    }
  };
  var YuiStringType = class _YuiStringType extends YuiType {
    constructor() {
      super("string", TY_STRING);
    }
    match(nodeOrValue) {
      if (typeof nodeOrValue === "string") return true;
      return nodeOrValue instanceof YuiValue && nodeOrValue.type instanceof _YuiStringType;
    }
    checkElement(nodeOrValue) {
      YuiType.IntType.matchOrRaise(nodeOrValue);
    }
    toArrayview(x) {
      const codes = [];
      for (const ch of x) {
        codes.push(ch.codePointAt(0));
      }
      return codes;
    }
    toNative(elements, node = null) {
      return elements.map((d) => String.fromCodePoint(d)).join("");
    }
    stringfy(nativeValue, indentPrefix = "", width = 80) {
      const content = nativeValue.replace(/"/g, '\\"').replace(/\n/g, "\\n");
      return `"${content}"`;
    }
    equals(leftNode, rightNode) {
      const leftValue = YuiType.toNative(leftNode);
      if (YuiType.isString(rightNode)) {
        const rightValue = YuiType.matchedNative(rightNode);
        return leftValue === rightValue;
      }
      return false;
    }
    lessThan(leftNode, rightNode, op = "<") {
      const leftValue = YuiType.toNative(leftNode);
      if (YuiType.isString(rightNode)) {
        const rightValue = YuiType.matchedNative(rightNode);
        return leftValue < rightValue;
      }
      return false;
    }
  };
  function _arrayEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((x, i) => _arrayEqual(x, b[i]));
    }
    if (Array.isArray(a) && typeof b === "string") {
      try {
        return a.map((c) => String.fromCodePoint(c)).join("") === b;
      } catch {
        return false;
      }
    }
    if (typeof a === "string" && Array.isArray(b)) {
      return _arrayEqual(b, a);
    }
    return a === b;
  }
  var YuiArrayType = class _YuiArrayType extends YuiType {
    constructor() {
      super("array", TY_ARRAY);
    }
    match(nodeOrValue) {
      if (Array.isArray(nodeOrValue)) return true;
      return nodeOrValue instanceof YuiValue && nodeOrValue.type instanceof _YuiArrayType;
    }
    checkElement(nodeOrValue) {
    }
    toArrayview(arrayValue) {
      return arrayValue.map((value) => YuiType.intoArrayview(value));
    }
    toNative(elements, node = null) {
      return elements.map((element) => {
        if (element instanceof YuiValue) return element.native;
        return element;
      });
    }
    stringfy(elements, indentPrefix = "", width = 80) {
      const parts = elements.map((e) => YuiType.arrayviewS(e));
      const oneLine = "[" + parts.join(", ") + "]";
      if (indentPrefix === null || indentPrefix.length + oneLine.length <= width) {
        return oneLine;
      }
      const inner = indentPrefix + "  ";
      const lines = elements.map((e, i) => {
        const s = e instanceof YuiValue ? e.stringfy(inner, false, width) : YuiType.arrayviewS(e);
        return `
${inner}${s}${i < elements.length - 1 ? "," : ""}`;
      });
      return "[" + lines.join("") + `
${indentPrefix}]`;
    }
    equals(leftNode, rightNode) {
      const leftNative = YuiType.toNative(leftNode);
      const rightNative = YuiType.toNative(rightNode);
      return _arrayEqual(leftNative, rightNative);
    }
  };
  var YuiObjectType = class _YuiObjectType extends YuiType {
    constructor() {
      super("object", TY_OBJECT);
    }
    match(nodeOrValue) {
      if (nodeOrValue !== null && typeof nodeOrValue === "object" && !Array.isArray(nodeOrValue) && !(nodeOrValue instanceof YuiValue)) return true;
      return nodeOrValue instanceof YuiValue && nodeOrValue.type instanceof _YuiObjectType;
    }
    checkElement(nodeOrValue) {
      YuiType.ArrayType.matchOrRaise(nodeOrValue);
      const array = YuiType.matchedNative(nodeOrValue);
      if (!Array.isArray(array) || array.length !== 2 || !YuiType.StringType.match(array[0])) {
        throw new YuiError(["error", "value", "\u2705[key, value]", `\u274C${array}`], null);
      }
    }
    toArrayview(objectValue) {
      return Object.entries(objectValue).map(([key, value]) => {
        return new YuiValue([String(key), YuiType.intoArrayview(value)]);
      });
    }
    toNative(elements, node = null) {
      const obj = {};
      for (const keyValue of elements) {
        if (!(keyValue instanceof YuiValue)) {
          throw new YuiError(["conversion", "toobject", `\u274C${keyValue}`, "\u2705[key, value]", `\u{1F50D}${elements}`], node);
        }
        const kv = keyValue.native;
        if (!Array.isArray(kv) || kv.length !== 2) {
          throw new YuiError(["conversion", "toobject", `\u274C${kv}`, "\u2705[key, value]", `\u{1F50D}${elements}`], node);
        }
        const key = kv[0];
        if (typeof key !== "string") {
          throw new YuiError(["conversion", "toobject", `\u274C${key}`, "\u2705<string>", `\u{1F50D}${kv}`], node);
        }
        obj[key] = kv[1];
      }
      return obj;
    }
    stringfy(nativeValue, indentPrefix = "", width = 80) {
      const entries = Object.entries(nativeValue);
      const parts = entries.map(([k, v]) => `"${k}": ${YuiType.arrayviewS(v)}`);
      const oneLine = "{" + parts.join(", ") + "}";
      if (indentPrefix === null || indentPrefix.length + oneLine.length <= width) {
        return oneLine;
      }
      const inner = indentPrefix + "  ";
      const lines = entries.map(([k, v], i) => {
        const s = v instanceof YuiValue ? v.stringfy(inner, false, width) : YuiType.arrayviewS(v);
        return `
${inner}"${k}": ${s}${i < entries.length - 1 ? "," : ""}`;
      });
      return "{" + lines.join("") + `
${indentPrefix}}`;
    }
    equals(leftNode, rightNode) {
      const leftNative = YuiType.toNative(leftNode);
      const rightNative = YuiType.toNative(rightNode);
      if (typeof rightNative !== "object" || rightNative === null || Array.isArray(rightNative)) {
        return false;
      }
      const lKeys = Object.keys(leftNative);
      const rKeys = Object.keys(rightNative);
      if (lKeys.length !== rKeys.length) return false;
      if (!lKeys.every((k) => rKeys.includes(k))) return false;
      return lKeys.every((k) => _arrayEqual(leftNative[k], rightNative[k]));
    }
  };
  YuiType.NullType = new YuiNullType();
  YuiType.BooleanType = new YuiBooleanType();
  YuiType.IntType = new YuiIntType();
  YuiType.FloatType = new YuiFloatType();
  YuiType.NumberType = new YuiNumberType();
  YuiType.StringType = new YuiStringType();
  YuiType.ObjectType = new YuiObjectType();
  YuiType.ArrayType = new YuiArrayType();
  var TYPES = [
    YuiType.NullType,
    YuiType.BooleanType,
    YuiType.IntType,
    YuiType.FloatType,
    YuiType.NumberType,
    YuiType.StringType,
    YuiType.ArrayType,
    YuiType.ObjectType
  ];
  function _typing(value) {
    for (const ty of TYPES) {
      if (ty.match(value)) return ty;
    }
    throw new Error(`unknown type for value: ${value}`);
  }
  var YuiValue = class _YuiValue {
    constructor(nativeValue, type = null) {
      this._nativeValue = YuiType.toNative(nativeValue);
      this._elements = null;
      this.type = type !== null ? type : _typing(nativeValue);
    }
    get native() {
      if (this._nativeValue === null && this._elements !== null) {
        this._nativeValue = this.type.toNative(this._elements);
      }
      return this._nativeValue;
    }
    get arrayview() {
      if (this._elements === null) {
        this._elements = this.type.toArrayview(this._nativeValue);
      }
      return this._elements;
    }
    // Alias
    get array() {
      return this.arrayview;
    }
    getItem(nodeOrIndex) {
      if (YuiType.isString(nodeOrIndex)) {
        const key = YuiType.matchedNative(nodeOrIndex);
        if (YuiType.isObject(this)) {
          const obj = YuiType.matchedNative(this);
          const val = obj[key];
          return YuiType.fromArrayview(val !== void 0 ? val : _YuiValue.NullValue);
        }
      }
      YuiType.IntType.matchOrRaise(nodeOrIndex);
      const index = YuiType.matchedNative(nodeOrIndex);
      const elements = this.arrayview;
      if (index < 0 || index >= elements.length) {
        throw new YuiError(
          ["error", "index", `\u2705<${elements.length}`, `\u274C${index}`, `\u{1F50D}${elements}`],
          null
        );
      }
      return YuiType.fromArrayview(elements[index]);
    }
    setItem(nodeOrIndex, nodeOrValue) {
      const value = YuiType.intoArrayview(nodeOrValue);
      if (YuiType.isString(nodeOrIndex)) {
        const key = YuiType.matchedNative(nodeOrIndex);
        if (YuiType.isObject(this)) {
          const obj = YuiType.matchedNative(this);
          obj[key] = value;
          this._elements = null;
          return;
        }
      }
      YuiType.IntType.matchOrRaise(nodeOrIndex);
      const index = YuiType.matchedNative(nodeOrIndex);
      const elements = this.arrayview;
      if (index < 0 || index >= elements.length) {
        throw new YuiError(
          ["error", "index", `\u2705<${elements.length}`, `\u274C${index}`, `\u{1F50D}${elements}`],
          null
        );
      }
      this.type.checkElement(nodeOrValue);
      elements[index] = value;
      this._nativeValue = null;
    }
    append(nodeOrValue) {
      this.type.checkElement(nodeOrValue);
      const value = YuiType.intoArrayview(nodeOrValue);
      this.arrayview.push(value);
      this._nativeValue = null;
    }
    isPrimitive() {
      return this.type instanceof YuiNullType || this.type instanceof YuiBooleanType || this.type instanceof YuiIntType || this.type instanceof YuiFloatType || this.type instanceof YuiStringType;
    }
    static stringfyValue(value, indentPrefix = "", width = 80) {
      if (value instanceof _YuiValue) {
        return value.stringfy(indentPrefix, false, width);
      }
      return String(value);
    }
    stringfy(indentPrefix = "", arrayview = false, width = 80) {
      if (arrayview) {
        const elements = this.arrayview;
        return YuiType.ArrayType.stringfy(elements, indentPrefix, width);
      }
      return this.type.stringfy(this.native, indentPrefix, width);
    }
    equals(otherNode) {
      return this.type.equals(this, otherNode);
    }
    lessThan(otherNode, op = "<") {
      return this.type.lessThan(this, otherNode, op);
    }
    toString() {
      return this.stringfy(null);
    }
  };
  YuiValue.NullValue = new YuiValue(null, YuiType.NullType);
  YuiValue.TrueValue = new YuiValue(true, YuiType.BooleanType);
  YuiValue.FalseValue = new YuiValue(false, YuiType.BooleanType);
  var Operator = class {
    constructor(symbol, comparative) {
      this.symbol = symbol;
      this.comparative = comparative;
    }
    toString() {
      return this.symbol;
    }
    evaluate(leftNode, rightNode) {
      throw new Error("Abstract method: evaluate");
    }
  };
  var Equals = class extends Operator {
    constructor(symbol = "==") {
      super(symbol, false);
    }
    evaluate(leftNode, rightNode) {
      return leftNode.type.equals(leftNode, rightNode);
    }
  };
  var NotEquals = class extends Operator {
    constructor(symbol = "!=") {
      super(symbol, false);
    }
    evaluate(leftNode, rightNode) {
      return !leftNode.type.equals(leftNode, rightNode);
    }
  };
  var LessThan = class extends Operator {
    constructor(symbol = "<") {
      super(symbol, true);
    }
    evaluate(leftNode, rightNode) {
      return !leftNode.type.equals(leftNode, rightNode) && leftNode.type.lessThan(leftNode, rightNode, this.symbol);
    }
  };
  var GreaterThan = class extends Operator {
    constructor(symbol = ">") {
      super(symbol, true);
    }
    evaluate(leftNode, rightNode) {
      return !leftNode.type.equals(leftNode, rightNode) && !leftNode.type.lessThan(leftNode, rightNode, this.symbol);
    }
  };
  var LessThanEquals = class extends Operator {
    constructor(symbol = "<=") {
      super(symbol, true);
    }
    evaluate(leftNode, rightNode) {
      return leftNode.type.equals(leftNode, rightNode) || leftNode.type.lessThan(leftNode, rightNode, this.symbol);
    }
  };
  var GreaterThanEquals = class extends Operator {
    constructor(symbol = ">=") {
      super(symbol, true);
    }
    evaluate(leftNode, rightNode) {
      return leftNode.type.equals(leftNode, rightNode) || !leftNode.type.lessThan(leftNode, rightNode, this.symbol);
    }
  };
  var In = class extends Operator {
    constructor(symbol = "in") {
      super(symbol, false);
    }
    evaluate(leftNode, rightNode) {
      const rightArray = rightNode.arrayview;
      for (const element of rightArray) {
        if (leftNode.type.equals(leftNode, element)) return true;
      }
      return false;
    }
  };
  var NotIn = class extends Operator {
    constructor(symbol = "notin") {
      super(symbol, false);
    }
    evaluate(leftNode, rightNode) {
      const rightArray = rightNode.arrayview;
      for (const element of rightArray) {
        if (leftNode.type.equals(leftNode, element)) return false;
      }
      return true;
    }
  };
  var OPERATORS2 = {
    "==": new Equals(),
    "!=": new NotEquals(),
    "<": new LessThan(),
    ">": new GreaterThan(),
    "<=": new LessThanEquals(),
    ">=": new GreaterThanEquals(),
    "in": new In(),
    "notin": new NotIn()
  };
  setOperators(OPERATORS2);

  // src/yuistdlib.js
  function standardLib(modules) {
    function checkNumberOfArgs(nodeargs, expected) {
      if (expected === -1) {
        if (nodeargs.length < 1) {
          throw new YuiError(["required", "arguments", `\u274C${nodeargs.length}`, "\u2705>0"]);
        }
        return;
      }
      if (nodeargs.length !== expected) {
        const last = nodeargs.length > 0 ? nodeargs[nodeargs.length - 1] : null;
        throw new YuiError(
          ["expected", "arguments", `\u2705${expected}`, `\u274C${nodeargs.length}`],
          null
        );
      }
    }
    function arrayToVarargs(nodeargs) {
      if (nodeargs.length === 1 && nodeargs[0] instanceof YuiValue) {
        return nodeargs[0].array;
      }
      return nodeargs;
    }
    function hasFloatOrRaise(nodeargs) {
      for (const nodearg of nodeargs) {
        YuiType.NumberType.matchOrRaise(nodearg);
        if (YuiType.isFloat(nodearg)) return true;
      }
      return false;
    }
    function yuiAbs(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      YuiType.NumberType.matchOrRaise(nodeargs[0]);
      const value = YuiType.matchedNative(nodeargs[0]);
      return new YuiValue(Math.abs(value));
    }
    modules.push(["\u{1F4CF}|\u7D76\u5BFE\u5024|abs", yuiAbs]);
    function yuiRandom(...nodeargs) {
      checkNumberOfArgs(nodeargs, 0);
      return new YuiValue(Math.random());
    }
    modules.push(["\u{1F3B2}\u{1F4CA}|\u4E71\u6570|random", yuiRandom]);
    function yuiRandint(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      YuiType.IntType.matchOrRaise(nodeargs[0]);
      const x = YuiType.matchedNative(nodeargs[0]);
      if (x <= 0) throw new YuiError(["error", "invalid argument", `\u274C${x}`, "\u2705>0"]);
      return new YuiValue(Math.floor(Math.random() * x));
    }
    modules.push(["\u{1F3B2}\u{1F4CA}|\u4E71\u6574\u6570|randint", yuiRandint]);
    function yuiSum(...nodeargs) {
      checkNumberOfArgs(nodeargs, -1);
      nodeargs = arrayToVarargs(nodeargs);
      if (hasFloatOrRaise(nodeargs)) {
        let total = parseFloat(YuiType.matchedNative(nodeargs[0]));
        for (const nodearg of nodeargs.slice(1)) {
          total += parseFloat(YuiType.matchedNative(nodearg));
        }
        return new YuiValue(total);
      } else {
        let total = YuiType.matchedNative(nodeargs[0]);
        for (const nodearg of nodeargs.slice(1)) {
          total += YuiType.matchedNative(nodearg);
        }
        return new YuiValue(total);
      }
    }
    modules.push(["\u{1F9EE}|\u548C|sum", yuiSum]);
    function yuiSub(...nodeargs) {
      checkNumberOfArgs(nodeargs, -1);
      nodeargs = arrayToVarargs(nodeargs);
      if (hasFloatOrRaise(nodeargs)) {
        let total = YuiType.matchedNative(nodeargs[0]);
        for (const nodearg of nodeargs.slice(1)) {
          total -= YuiType.matchedNative(nodearg);
        }
        return new YuiValue(total);
      } else {
        let total = YuiType.matchedNative(nodeargs[0]);
        for (const nodearg of nodeargs.slice(1)) {
          total -= YuiType.matchedNative(nodearg);
        }
        return new YuiValue(total);
      }
    }
    modules.push(["\u2796|\u5DEE|diff", yuiSub]);
    function yuiProduct(...nodeargs) {
      checkNumberOfArgs(nodeargs, -1);
      nodeargs = arrayToVarargs(nodeargs);
      if (hasFloatOrRaise(nodeargs)) {
        let total = parseFloat(YuiType.matchedNative(nodeargs[0]));
        for (const nodearg of nodeargs.slice(1)) {
          total *= YuiType.matchedNative(nodearg);
        }
        return new YuiValue(total);
      } else {
        let total = YuiType.matchedNative(nodeargs[0]);
        for (const nodearg of nodeargs.slice(1)) {
          total *= YuiType.matchedNative(nodearg);
        }
        return new YuiValue(total);
      }
    }
    modules.push(["\u2716\uFE0F|\u7A4D|product", yuiProduct]);
    function yuiDiv(...nodeargs) {
      checkNumberOfArgs(nodeargs, -1);
      nodeargs = arrayToVarargs(nodeargs);
      if (hasFloatOrRaise(nodeargs)) {
        let total = parseFloat(YuiType.matchedNative(nodeargs[0]));
        for (const nodearg of nodeargs.slice(1)) {
          const d = parseFloat(YuiType.matchedNative(nodearg));
          if (d === 0) throw new YuiError(["error", "division by zero", `\u274C${d}`], null);
          total /= d;
        }
        return new YuiValue(total);
      } else {
        let total = YuiType.matchedNative(nodeargs[0]);
        for (const nodearg of nodeargs.slice(1)) {
          const d = YuiType.matchedNative(nodearg);
          if (d === 0) throw new YuiError(["error", "division by zero", `\u274C${d}`], null);
          total = Math.floor(total / d);
        }
        return new YuiValue(total);
      }
    }
    modules.push(["\u2702\uFE0F|\u5546|quotient", yuiDiv]);
    function yuiMod(...nodeargs) {
      checkNumberOfArgs(nodeargs, -1);
      nodeargs = arrayToVarargs(nodeargs);
      if (hasFloatOrRaise(nodeargs)) {
        let total = parseFloat(YuiType.matchedNative(nodeargs[0]));
        for (const nodearg of nodeargs.slice(1)) {
          const d = parseFloat(YuiType.matchedNative(nodearg));
          if (d === 0) throw new YuiError(["error", "division by zero", `\u274C${d}`], null);
          total %= d;
        }
        return new YuiValue(total);
      } else {
        let total = YuiType.matchedNative(nodeargs[0]);
        for (const nodearg of nodeargs.slice(1)) {
          const d = YuiType.matchedNative(nodearg);
          if (d === 0) throw new YuiError(["error", "division by zero", `\u274C${d}`], null);
          total = (total % d + d) % d;
        }
        return new YuiValue(total);
      }
    }
    modules.push(["\u{1F355}|\u5270\u4F59|remainder", yuiMod]);
    function yuiAnd(...nodeargs) {
      let total = YuiType.matchedNative(nodeargs[0]);
      for (const nodearg of nodeargs.slice(1)) total &= YuiType.matchedNative(nodearg);
      return new YuiValue(total);
    }
    modules.push(["\u{1F4A1}\u2716\uFE0F|\u8AD6\u7406\u7A4D|and", yuiAnd]);
    function yuiOr(...nodeargs) {
      let total = YuiType.matchedNative(nodeargs[0]);
      for (const nodearg of nodeargs.slice(1)) total |= YuiType.matchedNative(nodearg);
      return new YuiValue(total);
    }
    modules.push(["\u{1F4A1}\u2795|\u8AD6\u7406\u548C|or", yuiOr]);
    function yuiXor(...nodeargs) {
      let total = YuiType.matchedNative(nodeargs[0]);
      for (const nodearg of nodeargs.slice(1)) total ^= YuiType.matchedNative(nodearg);
      return new YuiValue(total);
    }
    modules.push(["\u{1F4A1}\u{1F500}|\u6392\u4ED6\u7684\u8AD6\u7406\u548C|xor", yuiXor]);
    function yuiNot(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      return new YuiValue(~YuiType.matchedNative(nodeargs[0]));
    }
    modules.push(["\u{1F4A1}\u{1F504}|\u30D3\u30C3\u30C8\u53CD\u8EE2|not", yuiNot]);
    function yuiLeftShift(...nodeargs) {
      checkNumberOfArgs(nodeargs, 2);
      return new YuiValue(YuiType.matchedNative(nodeargs[0]) << YuiType.matchedNative(nodeargs[1]));
    }
    modules.push(["\u{1F4A1}\u2B05\uFE0F|\u5DE6\u30B7\u30D5\u30C8|shl", yuiLeftShift]);
    function yuiRightShift(...nodeargs) {
      checkNumberOfArgs(nodeargs, 2);
      return new YuiValue(YuiType.matchedNative(nodeargs[0]) >> YuiType.matchedNative(nodeargs[1]));
    }
    modules.push(["\u{1F4A1}\u27A1\uFE0F|\u53F3\u30B7\u30D5\u30C8|shr", yuiRightShift]);
    function yuiMax(...nodeargs) {
      checkNumberOfArgs(nodeargs, -1);
      nodeargs = arrayToVarargs(nodeargs);
      const result = Math.max(...nodeargs.map((a) => YuiType.matchedNative(a)));
      return new YuiValue(Number.isInteger(result) ? result : result);
    }
    modules.push(["\u{1F451}|\u6700\u5927\u5024|max", yuiMax]);
    function yuiMin(...nodeargs) {
      checkNumberOfArgs(nodeargs, -1);
      nodeargs = arrayToVarargs(nodeargs);
      const result = Math.min(...nodeargs.map((a) => YuiType.matchedNative(a)));
      return new YuiValue(Number.isInteger(result) ? result : result);
    }
    modules.push(["\u{1F41C}|\u6700\u5C0F\u5024|min", yuiMin]);
    function yuiIsint(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      return YuiType.isInt(nodeargs[0]) ? YuiValue.TrueValue : YuiValue.FalseValue;
    }
    modules.push(["\u{1F4AF}\u2753|\u6574\u6570\u5224\u5B9A|isint", yuiIsint]);
    function yuiToint(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      return new YuiValue(Math.trunc(YuiType.matchedNative(nodeargs[0])));
    }
    modules.push(["\u{1F4AF}|\u6574\u6570\u5316|toint", yuiToint]);
    function yuiIsfloat(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      return YuiType.isFloat(nodeargs[0]) ? YuiValue.TrueValue : YuiValue.FalseValue;
    }
    modules.push(["\u{1F4CA}\u2753|\u5C11\u6570\u5224\u5B9A|isfloat", yuiIsfloat]);
    function yuiTofloat(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      const value = nodeargs[0];
      if (YuiType.isString(value)) {
        const str = YuiType.matchedNative(value);
        const f = parseFloat(str);
        if (isNaN(f)) throw new YuiError(["error", "conversion", `\u274C${str}`]);
        return new YuiValue(f, YuiType.FloatType);
      }
      return new YuiValue(parseFloat(YuiType.matchedNative(nodeargs[0])), YuiType.FloatType);
    }
    modules.push(["\u{1F4CA}|\u5C11\u6570\u5316|tofloat", yuiTofloat]);
    function yuiIsstring(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      return YuiType.isString(nodeargs[0]) ? YuiValue.TrueValue : YuiValue.FalseValue;
    }
    modules.push(["\u{1F4AC}\u2753|\u6587\u5B57\u5217\u5224\u5B9A|isstring", yuiIsstring]);
    function yuiTostring(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      if (YuiType.isFloat(nodeargs[0])) {
        const v = YuiType.matchedNative(nodeargs[0]);
        return new YuiValue(v.toFixed(6));
      }
      return new YuiValue(String(nodeargs[0]));
    }
    modules.push(["\u{1F4AC}|\u6587\u5B57\u5217\u5316|tostring", yuiTostring]);
    function yuiIsobject(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      return YuiType.isObject(nodeargs[0]) ? YuiValue.TrueValue : YuiValue.FalseValue;
    }
    modules.push(["\u{1F5C2}\uFE0F\u2753|\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u5224\u5B9A|isobject", yuiIsobject]);
    function yuiToobject(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      if (YuiType.isObject(nodeargs[0])) return nodeargs[0];
      if (YuiType.isString(nodeargs[0])) {
        const s = YuiType.matchedNative(nodeargs[0]);
        if (s.startsWith("{")) {
          try {
            return new YuiValue(JSON.parse(s));
          } catch {
          }
        }
      }
      return new YuiValue({});
    }
    modules.push(["\u{1F5C2}\uFE0F|\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u5316|toobject", yuiToobject]);
    function yuiIsarray(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      return YuiType.isArray(nodeargs[0]) ? YuiValue.TrueValue : YuiValue.FalseValue;
    }
    modules.push(["\u{1F361}\u2753|\u914D\u5217\u5224\u5B9A|isarray", yuiIsarray]);
    function yuiToarray(...nodeargs) {
      checkNumberOfArgs(nodeargs, 1);
      const value = nodeargs[0];
      if (value instanceof YuiValue) {
        const _ = value.arrayview;
        value._nativeValue = null;
        return value;
      }
      return new YuiValue(YuiType.matchedNative(value));
    }
    modules.push(["\u{1F361}|\u914D\u5217\u5316|toarray", yuiToarray]);
  }

  // src/yuisyntax.js
  var BUILTIN_SYNTAXES = {
    yui: {
      "syntax": "Yui-Classic",
      "whitespace": "[ \\t\\r\u3000]",
      "whitespaces": "[ \\t\\r\u3000]+",
      "linefeed": "[\\n]",
      "line-comment-begin": "[#\uFF03]",
      "comment-begin": "",
      "comment-end": "",
      "null": "\u5024\u306A\u3057|null",
      "boolean-true": "\u771F|true",
      "boolean-false": "\u507D|false",
      "number-first-char": "[0-9]",
      "number-chars": "[0-9]*",
      "number-dot-char": "[\\.]",
      "name-first-char": "[A-Za-z_]",
      "name-chars": "[A-Za-z0-9_]*",
      "extra-name-begin": "\u300C",
      "extra-name-end": "\u300D",
      "string-begin": '"',
      "string-end": '"',
      "string-escape": "\\\\",
      "string-interpolation-begin": "\\{",
      "string-interpolation-end": "\\}",
      "string-content-end": '\\\\|\\{|\\"',
      "!string-begin": `'|f"`,
      "array-begin": "\\[",
      "array-end": "\\]",
      "array-separator": ",",
      "object-begin": "\\{",
      "object-end": "\\}",
      "object-separator": ",",
      "key-value-separator": ":",
      "grouping-begin!": "\\(",
      "grouping-end!": "\\)",
      "length-begin": "\\|",
      "length-end": "\\|",
      "binary+": "\\+",
      "binary-": "-",
      "binary*": "\\*",
      "binary/": "/",
      "binary%": "%",
      "unary-minus": "-",
      "array-indexer-suffix": "\\[",
      "array-indexer-end": "\\]",
      "property-accessor": "\u306E",
      "property-length": "\u5927\u304D\u3055|\u500B\u6570|\u6587\u5B57\u6570|\u8981\u7D20\u6570",
      "property-type": "\u578B",
      "funcapp-args-suffix": "\\(",
      "funcapp-args-end": "\\)",
      "funcapp-args-separator": ",",
      "import-standard": "\u6A19\u6E96\u30E9\u30A4\u30D6\u30E9\u30EA\u3092\u4F7F\u3046",
      "import-operator": "\u56DB\u5247\u6F14\u7B97\u5B50\u3092\u4F7F\u3046",
      "import-begin": "",
      "import-end": "\u3092\u4F7F\u3046",
      "block-begin": "\\{",
      "block-end": "\\}",
      "block-line": "",
      "assignment-begin": "",
      "assignment-infix": "=",
      "assignment-end": "",
      "increment-begin": "",
      "increment-infix": "\u3092",
      "increment-end": "\u5897\u3084\u3059",
      "increment-lookahead": "\u5897\u3084\u3059",
      "decrement-begin": "",
      "decrement-infix": "\u3092",
      "decrement-end": "\u6E1B\u3089\u3059",
      "append-begin": "",
      "append-infix": "(\u306E\u672B\u5C3E)?\u306B",
      "append-suffix": "\u3092",
      "append-end": "\u8FFD\u52A0\u3059\u308B",
      "print-begin": "",
      "print-end": "",
      "break": "\u304F\u308A\u8FD4\u3057\u3092\u629C\u3051\u308B",
      "continue": "\u3082\u3046\u4E00\u5EA6[\u3001]?\u304F\u308A\u8FD4\u3059",
      "pass": "\u4F55\u3082\u3057\u306A\u3044",
      "return-begin": "",
      "return-end": "\u304C[\u3001 ]?\u7B54\u3048",
      "return-none": "\u95A2\u6570\u304B\u3089\u629C\u3051\u308B",
      "repeat-begin": "",
      "repeat-times": "\u56DE[\u3001]?",
      "repeat-block": "\u304F\u308A\u8FD4\u3059",
      "repeat-end": "",
      "if-begin": "\u3082\u3057",
      "if-condition-begin": "",
      "if-condition-end": "",
      "if-prefix": "",
      "if-infix": "\u304C",
      "if-suffix!=": "\u4EE5\u5916",
      "if-suffix<": "\u3088\u308A\u5C0F\u3055\u3044",
      "if-suffix<=": "\u4EE5\u4E0B",
      "if-suffix>": "\u3088\u308A\u5927\u304D\u3044",
      "if-suffix>=": "\u4EE5\u4E0A",
      "if-suffixin": "\u306E\u3044\u305A\u308C\u304B",
      "if-suffixnotin": "\u306E\u3044\u305A\u308C\u3067\u3082\u306A\u3044",
      "if-then": "\u306A\u3089\u3070[\u3001]?",
      "if-else": "\u305D\u3046\u3067\u306A\u3051\u308C\u3070[\u3001]?",
      "if-end": "",
      "funcdef-begin": "",
      "funcdef-name-begin": "",
      "funcdef-name-end": "=",
      "funcdef-args-begin": "\u5165\u529B",
      "funcdef-arg-separator": "[,\u3001]",
      "funcdef-args-end": "",
      "funcdef-noarg": "\u5165\u529B\u306A\u3057",
      "funcdef-block": "\u306B\u5BFE\u3057[\u3066]?[\u3001]?",
      "funcdef-end": "",
      "assert-begin": ">>>\\s+",
      "assert-infix": "[\\n]",
      "assert-end": ""
    },
    pylike: {
      "syntax": "yui",
      "whitespace": "[ \\t\\r\u3000]",
      "whitespaces": "[ \\t\\r\u3000]+",
      "linefeed": "[\\n]",
      "word-segmenter": " ",
      "line-comment-begin": "[#\uFF03]",
      "comment-begin": "",
      "comment-end": "",
      "null": "None",
      "boolean-true": "True",
      "boolean-false": "False",
      "number-first-char": "[0-9]",
      "number-chars": "[0-9]*",
      "number-dot-char": "[\\.]",
      "name-first-char": "[A-Za-z_]",
      "name-chars": "[A-Za-z0-9_]*",
      "extra-name-begin": "",
      "extra-name-end": "",
      "string-begin": '"',
      "string-end": '"',
      "string-escape": "\\\\",
      "string-interpolation-begin": "\\{",
      "string-interpolation-end": "\\}",
      "string-content-end": '\\\\|\\{|\\"',
      "array-begin": "\\[",
      "array-end": "\\]",
      "array-separator": ",",
      "object-begin": "\\{",
      "object-end": "\\}",
      "object-separator": ",",
      "key-value-separator": ":",
      "grouping-begin!": "\\(",
      "grouping-end!": "\\)",
      "length-begin": "len\\s*\\(",
      "length-end": "\\)  ",
      "binary+": "\\+",
      "binary-": "-",
      "binary*": "\\*",
      "binary/": "/",
      "binary%": "%",
      "unary-minus": "-",
      "array-indexer-suffix": "\\[",
      "array-indexer-end": "\\]",
      "property-accessor": "\\.",
      "property-type": "__class__.__name__",
      "not-property-name": "append",
      "funcapp-args-suffix": "\\(",
      "funcapp-args-end": "\\)",
      "funcapp-args-separator": ",",
      "block-begin": "\\:",
      "block-end": "",
      "block-line": "",
      "assignment-begin": "",
      "assignment-infix": "\\=",
      "assignment-end": "",
      "increment-begin": "",
      "increment-infix": "\\+\\=",
      "increment-end": "1",
      "decrement-begin": "",
      "decrement-infix": "\\-\\=",
      "decrement-end": "1",
      "append-begin": "",
      "append-infix": ".append\\s*\\(",
      "append-suffix": "\\)",
      "append-end": "",
      "print-begin": "",
      "print-end": "",
      "break": "break\\s?",
      "continue": "continue\\s?",
      "pass": "pass\\s?",
      "return-begin": "return\\s",
      "return-end": "",
      "repeat-begin": "for\\s+_\\s+in\\s+range\\s*\\(\\s*",
      "repeat-times": "\\)\\s*",
      "repeat-block": "",
      "repeat-end": "",
      "if-begin": "if\\s",
      "if-condition-begin": "\\(?",
      "if-condition-end": "\\)?",
      "if-prefix": "",
      "if-infix==": "==",
      "if-infix!=": "!=",
      "if-infix<": "<",
      "if-infix<=": "<=",
      "if-infix>": ">",
      "if-infix>=": ">=",
      "if-infixin": "in\\s",
      "if-infixnotin": "not\\s+in\\s",
      "if-then": "",
      "if-else": "else\\s*",
      "if-end": "",
      "funcdef-begin": "def\\s",
      "funcdef-name-begin": "",
      "funcdef-name-end": "",
      "funcdef-args-begin": "\\(",
      "funcdef-noarg": "",
      "funcdef-arg-separator": ",",
      "funcdef-args-end": "\\)",
      "funcdef-block": "",
      "funcdef-end": "",
      "assert-begin": "assert\\s",
      "assert-infix": "==",
      "assert-end": "",
      "import-standard": "import\\s+stdlib",
      "import-begin": "import\\s",
      "import-end": ""
    },
    jslike: {
      "syntax": "javascript-like",
      "whitespace": "[ \\t\\r\u3000]",
      "whitespaces": "[ \\t\\r\u3000]+",
      "linefeed": "[\\n]",
      "word-segmenter": " ",
      "line-comment-begin": "//",
      "comment-begin": "/\\*",
      "comment-end": "\\*/",
      "number-first-char": "[0-9]",
      "number-chars": "[0-9]*",
      "number-dot-char": "[\\.]",
      "name-first-char": "[A-Za-z_]",
      "name-chars": "[A-Za-z0-9_]*",
      "extra-name-begin": "",
      "extra-name-end": "",
      "string-begin": '"',
      "string-end": '"',
      "string-escape": "\\\\",
      "string-interpolation-begin": "\\{",
      "string-interpolation-end": "\\}",
      "string-content-end": '\\\\|\\{|\\"',
      "array-begin": "\\[",
      "array-end": "\\]",
      "array-separator": ",",
      "object-begin": "\\{",
      "object-end": "\\}",
      "object-separator": ",",
      "key-value-separator": ":",
      "grouping-begin!": "\\(",
      "grouping-end!": "\\)",
      "binary+": "\\+",
      "binary-": "-",
      "binary*": "\\*",
      "binary/": "/",
      "binary%": "%",
      "unary-minus": "-",
      "array-indexer-suffix": "\\[",
      "array-indexer-end": "\\]",
      "property-accessor": "\\.",
      "property-length": "length",
      "not-property-name": "push",
      "funcapp-args-suffix": "\\(",
      "funcapp-args-end": "\\)",
      "funcapp-args-separator": ",",
      "block-begin": "\\:",
      "block-end": "",
      "block-line": "",
      "assignment-begin": "",
      "assignment-infix": "\\=",
      "assignment-end": "",
      "increment-begin": "",
      "increment-infix": "\\+\\+|\\+\\=\\s*1",
      "increment-end": "1",
      "decrement-begin": "",
      "decrement-infix": "\\-\\-|\\-\\=\\s*1",
      "decrement-end": "1",
      "append-begin": "",
      "append-infix": ".push\\s*\\(",
      "append-suffix": "\\)",
      "append-end": "",
      "import-begin": "import\\s",
      "import-end": "",
      "print-begin": "",
      "print-end": "",
      "break": "break\\s?",
      "continue": "continue\\s?",
      "pass": "",
      "return-begin": "return\\s",
      "return-end": "",
      "repeat-begin": "for\\s+_\\s+in\\s+range\\s*\\(\\s*",
      "repeat-times": "\\)\\s*",
      "repeat-block": "",
      "repeat-end": "",
      "if-begin": "if\\s",
      "if-condition-begin": "\\(",
      "if-condition-end": "\\)",
      "if-prefix": "",
      "if-infix==": "==",
      "if-infix!=": "!=",
      "if-infix<": "<",
      "if-infix<=": "<=",
      "if-infix>": ">",
      "if-infix>=": ">=",
      "if-infixin": "in\\s",
      "if-infixnotin": "not\\s+in\\s",
      "if-then": "",
      "if-else": "else\\s*",
      "if-end": "",
      "funcdef-begin": "function\\s",
      "funcdef-name-begin": "",
      "funcdef-name-end": "",
      "funcdef-args-begin": "\\(",
      "funcdef-noarg": "",
      "funcdef-arg-separator": ",",
      "funcdef-args-end": "\\)",
      "funcdef-block": "",
      "funcdef-end": "",
      "assert-begin": "assert\\s*",
      "assert-infix": "==",
      "assert-end": ""
    },
    emoji: {
      "syntax": "\u{1FAA2}",
      "whitespace": "[ \\t\\r\u3000]",
      "whitespaces": "[ \\t\\r\u3000]+",
      "word-segmenter": " ",
      "linefeed": "[\\n]",
      "line-comment-begin": "\u{1F4AD}|\u{1F5E8}\uFE0F|\u{1F4CC}|\u26A0\uFE0F",
      "comment-begin": "",
      "comment-end": "",
      "number-first-char": "[0-9]",
      "number-chars": "[0-9]*",
      "number-dot-char": "[\\.]",
      "null": "\u{1FAB5}",
      "boolean-true": "\u{1F44D}",
      "boolean-false": "\u{1F44E}",
      "name-first-char": "[A-Za-z_]",
      "name-chars": "[A-Za-z0-9_]*",
      "extra-name-begin": "",
      "extra-name-end": "",
      "string-begin": '"',
      "string-end": '"',
      "string-escape": "\\\\",
      "string-interpolation-begin": "\\{",
      "string-interpolation-end": "\\}",
      "string-content-end": '\\\\|\\{|\\"',
      "array-begin": "\\[",
      "array-end": "\\]",
      "array-separator": ",",
      "object-begin": "\\{",
      "object-end": "\\}",
      "object-separator": ",",
      "key-value-separator": ":",
      "grouping-begin": "\\(",
      "grouping-end": "\\)",
      "unary-minus": "-",
      "unary-length": "\u{1F4D0}",
      "unary-inspect": "\u{1F440}",
      "binary+": "\u2795",
      "binary-": "\u2796",
      "binary*": "\u2716\uFE0F",
      "binary/": "\u2797",
      "binary%": "\u{1F355}",
      "array-indexer-suffix": "\\[",
      "array-indexer-end": "\\]",
      "property-accessor": "",
      "property-type": "",
      "not-property-name": "",
      "funcapp-args-suffix": "\\(",
      "funcapp-args-end": "\\)",
      "funcapp-args-separator": ",",
      "block-begin": "\u{1F449}",
      "block-end": "\u{1F51A}",
      "assignment-begin": "",
      "assignment-infix": "\u2B05\uFE0F",
      "assignment-end": "",
      "increment-begin": "",
      "increment-infix": "\u2B06\uFE0F",
      "increment-end": "",
      "decrement-begin": "",
      "decrement-infix": "\u2B07\uFE0F",
      "decrement-end": "",
      "append-begin": "",
      "append-infix": "\u{1F9F2}",
      "append-suffix": "",
      "append-end": "",
      "print-begin": "",
      "print-end": "",
      "break": "\u{1F680}",
      "pass": "\u{1F4A4}",
      "return-begin": "\u2705|\u{1F4A1}",
      "return-end": "",
      "repeat-begin": "\u{1F300}",
      "repeat-times": "",
      "repeat-block": "",
      "repeat-end": "",
      "if-begin": "\u2753|\u{1F914}",
      "if-condition-begin": "",
      "if-condition-end": "",
      "if-prefix": "",
      "if-infix==": "\u2696\uFE0F",
      "if-infix!=": "\u{1F6AB}\u2696\uFE0F",
      "if-infix<": "\u{1F4C8}",
      "if-infix<=": "\u{1F4C8}\u2696\uFE0F",
      "if-infix>": "\u{1F4C9}",
      "if-infix>=": "\u{1F4C9}\u2696\uFE0F",
      "if-infixin": "\u{1F4E5}",
      "if-infixnotin": "\u{1F6AB}\u{1F4E5}",
      "if-then": "",
      "else-if": "\u2757\u2753",
      "if-else": "\u2757|\u{1F645}",
      "if-end": "",
      "funcdef-begin": "\u{1F9E9}",
      "funcdef-name-begin": "",
      "funcdef-name-end": "",
      "funcdef-args-begin": "\\(",
      "funcdef-arg-separator": "\\,",
      "funcdef-args-end": "\\)",
      "funcdef-noarg": "",
      "funcdef-block": "",
      "funcdef-end": "",
      "assert-begin": "\u{1F9EA}",
      "assert-infix": "\u2705",
      "assert-end": "",
      "import-standard": "\u{1F5F3}\uFE0F\\s+\u{1F4DA}",
      "import-operator": "\u{1F5F3}\uFE0F\\s+\u2795\u2796\u2716\uFE0F\u2797",
      "import-begin": "\u{1F5F3}\uFE0F",
      "import-end": ""
    },
    nannan: {
      "syntax": "\u306A\u3093\u306A\u3093\uFF1F",
      "whitespace": "[ \\t\\r\u3000]",
      "whitespaces": "[ \\t\\r\u3000]+",
      "linefeed": "[\\n]",
      "line-comment-begin": "\u26A0\uFE0F",
      "comment-begin": "",
      "comment-end": "",
      "number-first-char": "[0-9]",
      "number-chars": "[0-9]*",
      "number-dot-char": "[\\.]",
      "name-first-char": "[A-Za-z_]",
      "name-chars": "[A-Za-z0-9_]*",
      "extra-name-begin": "\u300C",
      "extra-name-end": "\u300D",
      "string-begin": '"',
      "string-end": '"',
      "string-escape": "\\\\",
      "string-interpolation-begin": "\\{",
      "string-interpolation-end": "\\}",
      "string-content-end": '\\\\|\\{|\\"',
      "!string-begin": `'|f"`,
      "array-begin": "\\[",
      "array-end": "\\]",
      "array-separator": ",",
      "object-begin": "\\{",
      "object-end": "\\}",
      "object-separator": ",",
      "key-value-separator": ":",
      "grouping-begin!": "\\(",
      "grouping-end!": "\\)",
      "length-begin": "\\|",
      "length-end": "\\|",
      "binary+": "\\+",
      "binary-": "-",
      "binary*": "\\*",
      "binary/": "/",
      "binary%": "%",
      "unary-minus": "-",
      "array-indexer-suffix": "\\[",
      "array-indexer-end": "\\]",
      "property-accessor": "\u306E",
      "property-length": "\u5927\u304D\u3055",
      "funcapp-args-suffix": "\\(",
      "funcapp-args-end": "\\)",
      "funcapp-args-separator": ",",
      "import-standard": "\u6A19\u6E96\u306E\u3084\u3064\u4F7F\u3046",
      "import-operator": "\u56DB\u5247\u6F14\u7B97\u5B50[\u3001]?\u4F7F\u3046",
      "import-begin": "",
      "import-end": "\u3092\u4F7F\u3046",
      "block-begin": "[\uFF1F\\?]",
      "block-end": "",
      "block-line": "",
      "assignment-begin": "",
      "assignment-infix": "=",
      "assignment-end": "",
      "increment-begin": "",
      "increment-infix": "",
      "increment-end": "\u4E0A\u3052\u3068\u304F",
      "increment-lookahead": "\u4E0A\u3052\u3068\u304F",
      "decrement-begin": "",
      "decrement-infix": "",
      "decrement-end": "\u4E0B\u3052\u3068\u304F",
      "decrement-lookahead": "\u4E0B\u3052\u3068\u304F",
      "append-begin": "",
      "append-infix": "\u306B",
      "append-suffix": "\u3092?",
      "append-end": "\u5165\u308C\u3068\u304F",
      "print-begin": "",
      "print-end": "",
      "break": "\u3082\u3046\u3048\u3048\u3063\u3066",
      "pass": "\u307B\u3063\u3068\u304F",
      "return-begin": "\u261D\uFE0F\u3053\u306E",
      "return-end": "\u3060\u3088",
      "return-none": "\u308F\u304B\u3089\u3093",
      "repeat-begin": "",
      "repeat-times": "\u56DE[\u3001]?",
      "repeat-block": "\u3084\u308D\u304B",
      "repeat-end": "",
      "if-begin": "",
      "if-condition-begin": "",
      "if-condition-end": "",
      "if-prefix": "",
      "if-infix": "\u304C",
      "if-suffix==": "\u3068\u540C\u3058",
      "if-suffix!=": "\u3084\u306A\u3044",
      "if-suffix<": "\u3088\u308A\u5C0F\u3055\u3044",
      "if-suffix<=": "\u4EE5\u4E0B",
      "if-suffix>": "\u3088\u308A\u5927\u304D\u3044",
      "if-suffix>=": "\u4EE5\u4E0A",
      "if-suffixin": "\u306E\u3044\u305A\u308C\u304B",
      "if-suffixnotin": "\u306E\u3044\u305A\u308C\u3067\u3082\u306A\u3044",
      "if-then": "\u3063\u3066\u307B\u3093\u307E",
      "if-else": "\u9055\u3046\u3093",
      "if-end": "",
      "funcdef-begin": "",
      "funcdef-name-begin": "",
      "funcdef-name-end": "",
      "funcdef-args-begin": "\\(",
      "funcdef-arg-separator": "[,\u3001]",
      "funcdef-args-end": "\\)",
      "funcdef-block": "\u3063\u3066\u306A\u3093\u306A\u3093",
      "funcdef-end": "",
      "assert-begin": ">>>\\s+",
      "assert-infix": "[\\n]",
      "assert-end": ""
    },
    empty: {
      "syntax": "empty"
    }
  };
  var DEFAULT_SYNTAX_JSON = {
    "whitespace": "[ \\t\\r\u3000]",
    "whitespaces": "[ \\t\\r\u3000]+",
    "linefeed": "[\\n]",
    "line-comment-begin": "[#\uFF03]",
    "number-first-char": "[0-9]",
    "number-chars": "[0-9]*",
    "number-dot-char": "[\\.]",
    "name-first-char": "[A-Za-z_]",
    "name-chars": "[A-Za-z0-9_]*",
    "string-begin": '"',
    "string-end": '"',
    "string-escape": "\\\\",
    "string-interpolation-begin": "\\{",
    "string-interpolation-end": "\\}",
    "array-begin": "\\[",
    "array-end": "\\]",
    "array-separator": ",",
    "object-begin": "\\{",
    "object-end": "\\}",
    "object-separator": ",",
    "key-value-separator": ":",
    "array-indexer-suffix": "\\[",
    "array-indexer-end": "\\]",
    "funcapp-args-suffix": "\\(",
    "funcapp-args-end": "\\)",
    "funcapp-args-separator": ","
  };
  function extractIdentifiers(text) {
    const identifiers = [];
    const pattern1 = /\n\s*([^\s\]\[\(\)"]+)\s*=(?!=)/g;
    let m;
    while ((m = pattern1.exec(text)) !== null) {
      identifiers.push(m[1]);
    }
    const pattern2 = /([^\s\]\[\(\)"]+)\s*\(/g;
    while ((m = pattern2.exec(text)) !== null) {
      identifiers.push(m[1]);
    }
    const withUnicode = identifiers.filter((id) => /[^\x00-\x7F]/.test(id));
    return [...new Set(withUnicode)];
  }
  function loadSyntax(nameOrPath = "yui") {
    let terminals;
    if (typeof nameOrPath === "object" && nameOrPath !== null) {
      terminals = { ...nameOrPath };
    } else if (Object.prototype.hasOwnProperty.call(BUILTIN_SYNTAXES, nameOrPath)) {
      terminals = { ...BUILTIN_SYNTAXES[nameOrPath] };
    } else {
      throw new Error(`Unknown syntax: "${nameOrPath}". Built-in syntaxes: ${Object.keys(BUILTIN_SYNTAXES).join(", ")}`);
    }
    for (const [key, value] of Object.entries(DEFAULT_SYNTAX_JSON)) {
      if (!(key in terminals)) {
        terminals[key] = value;
      }
    }
    if (!("string-content-end" in terminals)) {
      const escape = terminals["string-escape"] ?? "\\\\";
      const interp = terminals["string-interpolation-begin"] ?? "\\{";
      const strEnd = terminals["string-end"] ?? '\\"';
      terminals["string-content-end"] = `${escape}|${interp}|${strEnd}`;
    }
    if (!("identifiers" in terminals)) {
      terminals["identifiers"] = extractIdentifiers(JSON.stringify(terminals));
    }
    return terminals;
  }
  function splitHeadingChar(s) {
    if (s.startsWith("\\")) {
      const remaining2 = s.slice(2);
      let headingChar2;
      const next = s[1];
      if (next === "\\") headingChar2 = "\\";
      else if (next === "s") headingChar2 = " ";
      else if (next === "t") headingChar2 = "	";
      else if (next === "n") headingChar2 = "\n";
      else if (next === "r") headingChar2 = "\r";
      else if (next === "d") headingChar2 = "1";
      else if (next === "w") headingChar2 = "a";
      else headingChar2 = next;
      if (remaining2.startsWith("?")) return ["", remaining2.slice(1)];
      return [headingChar2, remaining2];
    }
    if (s.startsWith("\u25C1")) {
      const headingChar2 = s.slice(0, 2);
      const remaining2 = s.slice(2);
      if (remaining2.startsWith("?")) return ["", remaining2.slice(1)];
      return [headingChar2, remaining2];
    }
    if (s.length >= 2 && (s.codePointAt(1) === 65039 || s.codePointAt(1) === 8205)) {
      const headingChar2 = s.slice(0, 2);
      const remaining2 = s.slice(2);
      if (remaining2.startsWith("?")) return ["", remaining2.slice(1)];
      return [headingChar2, remaining2];
    }
    const headingChar = s[0];
    const remaining = s.slice(1);
    if (remaining.startsWith("?")) return ["", remaining.slice(1)];
    return [headingChar, remaining];
  }
  function getExampleFromPatternInner(pattern) {
    if (pattern === "") return "";
    if (pattern.includes("|")) pattern = pattern.split("|")[0];
    if (pattern.startsWith("[")) {
      const endPos = pattern.indexOf("]");
      if (pattern[endPos + 1] === "?") {
        return getExampleFromPatternInner(pattern.slice(endPos + 2));
      }
      const [headingChar2] = splitHeadingChar(pattern.slice(1, endPos));
      return headingChar2 + getExampleFromPatternInner(pattern.slice(endPos + 1));
    }
    const [headingChar, remaining] = splitHeadingChar(pattern);
    return headingChar + getExampleFromPatternInner(remaining);
  }
  function getExampleFromPattern(pattern) {
    const ESC = [
      ["\\|", "\u25C1\uFF5C"],
      ["\\[", "\u25C1\uFF3B"],
      ["\\]", "\u25C1\uFF3D"],
      ["\\(", "\u25C1\uFF08"],
      ["\\)", "\u25C1\uFF09"],
      ["\\*", "\u25C1\uFF0A"],
      ["\\?", "\u25C1\uFF1F"],
      ["\\+", "\u25C1\uFF0B"],
      ["+", ""],
      ["*", "?"]
    ];
    for (const [a, b] of ESC) {
      pattern = pattern.split(a).join(b);
    }
    let processed = "";
    while (pattern.length > 0) {
      const sPos = pattern.indexOf("(");
      if (sPos === -1) {
        processed += getExampleFromPatternInner(pattern);
        break;
      }
      const ePos = pattern.indexOf(")", sPos + 1);
      processed += getExampleFromPatternInner(pattern.slice(0, sPos));
      const inner = pattern.slice(sPos + 1, ePos);
      pattern = pattern.slice(ePos + 1);
      if (pattern.startsWith("?")) {
        pattern = pattern.slice(1);
      } else {
        processed += getExampleFromPatternInner(inner);
      }
    }
    const ESC2 = [
      ["\u25C1\uFF5C", "|"],
      ["\u25C1\uFF3B", "["],
      ["\u25C1\uFF3D", "]"],
      ["\u25C1\uFF08", "("],
      ["\u25C1\uFF09", ")"],
      ["\u25C1\uFF1F", "?"],
      ["\u25C1\uFF0B", "+"],
      ["\u25C1\uFF0A", "*"]
    ];
    for (const [a, b] of ESC2) {
      processed = processed.split(a).join(b);
    }
    return processed;
  }
  var YuiSyntax = class {
    constructor(syntaxJson) {
      if (typeof syntaxJson !== "object" || syntaxJson === null) {
        throw new Error("Terminals must be a dictionary");
      }
      this.terminals = { ...syntaxJson };
      this._patterns = {};
    }
    isDefined(terminal) {
      return (this.terminals[terminal] ?? "") !== "";
    }
    updateSyntax(updates) {
      Object.assign(this.terminals, updates);
      for (const key of Object.keys(updates)) {
        delete this._patterns[key];
      }
    }
    getPattern(terminal, ifUndefined = "") {
      if (this._patterns[terminal]) return this._patterns[terminal];
      let pattern = this.terminals[terminal] ?? ifUndefined;
      if (pattern === "" || pattern === null || pattern === void 0) {
        const never = /(?!)/;
        this._patterns[terminal] = never;
        return never;
      }
      if (typeof pattern === "string") {
        try {
          pattern = new RegExp(pattern, "u");
        } catch {
          try {
            pattern = new RegExp(pattern);
          } catch (e2) {
            throw new Error(`Invalid regex '${terminal}': ${pattern}: ${e2}`);
          }
        }
        this._patterns[terminal] = pattern;
      }
      return pattern;
    }
    forExample(terminal) {
      if (!this.isDefined(terminal)) return "";
      let p = this.terminals[terminal];
      if (p instanceof RegExp) p = p.source;
      return getExampleFromPattern(p);
    }
  };

  // src/yuiparser.js
  function extractIdentifiers2(text) {
    const identifiers = [];
    const pattern1 = /\n\s*([^\s\]\[\(\)"]+)\s*=(?!=)/g;
    let m;
    while ((m = pattern1.exec(text)) !== null) identifiers.push(m[1]);
    const pattern2 = /([^\s\]\[\(\)"]+)\s*\(/g;
    while ((m = pattern2.exec(text)) !== null) identifiers.push(m[1]);
    const withUnicode = identifiers.filter((id) => /[^\x00-\x7F]/.test(id));
    return [...new Set(withUnicode)];
  }
  var SourceNode = class extends ASTNode {
    constructor() {
      super();
    }
  };
  var Source = class extends YuiSyntax {
    constructor(source, filename = "main.yui", pos = 0, syntax = "yui") {
      const terminals = typeof syntax === "string" ? loadSyntax(syntax) : syntax;
      super(terminals);
      this.filename = filename;
      this.source = source;
      this.pos = pos;
      this.length = source.length;
      this.specialNames = [];
      this.addSpecialNames(extractIdentifiers2(source));
      this.memos = /* @__PURE__ */ new Map();
    }
    getMemo(nonterminal, pos) {
      return this.memos.get(`${nonterminal}@${pos}`) ?? null;
    }
    setMemo(nonterminal, pos, result, newPos) {
      this.memos.set(`${nonterminal}@${pos}`, [result, newPos]);
    }
    hasNext() {
      return this.pos < this.length;
    }
    isEos() {
      return this.pos >= this.length;
    }
    consumeString(text) {
      if (this.source.startsWith(text, this.pos)) {
        this.pos += text.length;
        return true;
      }
      return false;
    }
    matchedString(terminal) {
      const pattern = this.getPattern(terminal);
      const remaining = this.source.slice(this.pos);
      const m = pattern.exec(remaining);
      if (m && m.index === 0) return m[0];
      return "";
    }
    isMatch(terminal, { ifUndefined = false, unconsumed = false, lskipWs = true, lskipLf = false } = {}) {
      if (typeof ifUndefined === "boolean" && !this.isDefined(terminal)) {
        return ifUndefined;
      }
      if (terminal.startsWith("!")) {
        const wrongTerminal = `!${terminal}`;
        if (this.isDefined(wrongTerminal) && this.isMatch(wrongTerminal, { unconsumed: true, lskipWs })) {
          const expected = this.forExample(terminal);
          const matched = this.matchedString(wrongTerminal);
          throw new YuiError(["wrong", "token", `\u274C\`${matched}\``, `\u2705\`${expected}\``], this.p({ length: 1 }));
        }
      }
      const savedPos = this.pos;
      if (lskipWs || lskipLf) {
        this.skipWhitespacesAndComments(lskipLf);
      }
      const patternStr = typeof ifUndefined === "string" ? ifUndefined : "";
      const pattern = this.getPattern(terminal, patternStr);
      const remaining = this.source.slice(this.pos);
      const m = pattern.exec(remaining);
      if (m && m.index === 0) {
        if (unconsumed) {
          this.pos = savedPos;
          return true;
        }
        this.pos += m[0].length;
        return true;
      }
      this.pos = savedPos;
      return false;
    }
    tryMatch(terminal, {
      ifUndefined = true,
      unconsumed = false,
      BK = false,
      lskipWs = true,
      lskipLf = false,
      openingPos = null
    } = {}) {
      if (this.isMatch(terminal, { ifUndefined, unconsumed, lskipWs, lskipLf })) return;
      const expectedToken = this.forExample(terminal);
      if (openingPos !== null) {
        throw new YuiError(["expected", "closing", `\u2705\`${expectedToken}\``], this.p({ startPos: openingPos }));
      }
      const snippet = this.captureLine();
      throw new YuiError(
        ["expected", "token", `\u2705\`${expectedToken}\``, `\u274C\`${snippet}\``, `\u{1F50D}${terminal}`],
        this.p({ length: 1 }),
        null,
        BK
      );
    }
    findMatch(terminal, suffixes, lskipLf = false) {
      for (const suffix of suffixes) {
        const key = `${terminal}${suffix}`;
        if (this.isMatch(key, { ifUndefined: false, unconsumed: false, lskipWs: true, lskipLf })) {
          return suffix;
        }
      }
      return null;
    }
    canBacktrack(lookahead) {
      if (this.isDefined(lookahead)) {
        const pattern = this.getPattern(lookahead);
        const captured = this.captureLine();
        return !pattern.test(captured);
      }
      return true;
    }
    isEosOrLinefeed({ lskipWs = true, unconsumed = false } = {}) {
      const savedPos = this.pos;
      if (lskipWs) this.skipWhitespacesAndComments(false);
      if (this.isEos()) {
        if (unconsumed) this.pos = savedPos;
        return true;
      }
      return this.isMatch("linefeed", { lskipWs: false, lskipLf: false, unconsumed });
    }
    consumeUntil(terminal, { untilEof = true, disallowString = null } = {}) {
      const pattern = this.getPattern(terminal);
      const remaining = this.source.slice(this.pos);
      const m = pattern.exec(remaining);
      if (m) {
        if (disallowString && remaining.slice(0, m.index).includes(disallowString)) {
          return false;
        }
        this.pos += m.index;
        return true;
      }
      if (untilEof) {
        this.pos = this.length;
        return true;
      }
      return false;
    }
    skipWhitespacesAndComments(includeLinefeed = false) {
      while (this.hasNext()) {
        if (this.isMatch("whitespaces", { lskipWs: false })) continue;
        if (includeLinefeed && this.isMatch("linefeed", { lskipWs: false })) continue;
        if (this.isMatch("line-comment-begin", { ifUndefined: false, lskipWs: false })) {
          this.consumeUntil("linefeed", { untilEof: true });
          continue;
        }
        if (this.isDefined("comment-begin") && this.isDefined("comment-end")) {
          const openingPos = this.pos;
          if (this.isMatch("comment-begin", { lskipWs: false })) {
            this.consumeUntil("comment-end", { untilEof: true });
            this.tryMatch("comment-end", { lskipWs: false, openingPos });
            continue;
          }
        }
        break;
      }
    }
    addSpecialNames(names) {
      const combined = /* @__PURE__ */ new Set([...this.specialNames, ...names]);
      this.specialNames = [...combined].sort((a, b) => b.length - a.length);
    }
    matchSpecialName({ unconsumed = false } = {}) {
      for (const name of this.specialNames) {
        if (this.source.startsWith(name, this.pos)) {
          if (!unconsumed) this.pos += name.length;
          return name;
        }
      }
      return null;
    }
    captureIndent(indentChars = " 	\u3000") {
      let startPos = this.pos - 1;
      while (startPos >= 0) {
        const ch = this.source[startPos];
        if (ch === "\n") {
          startPos++;
          break;
        }
        startPos--;
      }
      if (startPos < 0) startPos = 0;
      let endPos = startPos;
      while (endPos < this.length) {
        if (indentChars.includes(this.source[endPos])) endPos++;
        else break;
      }
      return this.source.slice(startPos, endPos);
    }
    captureLine() {
      const startPos = this.pos;
      while (this.pos < this.length) {
        if (this.isMatch("linefeed", { lskipWs: false, unconsumed: true }) || this.isMatch("line-comment-begin", { lskipWs: false, unconsumed: true }) || this.isMatch("comment-begin", { lskipWs: false, unconsumed: true }) || this.isMatch("statement-separator", { lskipWs: false, unconsumed: true })) {
          const captured = this.source.slice(startPos, this.pos);
          this.pos = startPos;
          return captured;
        }
        this.pos++;
      }
      this.pos = startPos;
      return this.source.slice(startPos).split("\n")[0];
    }
    p({ node = null, startPos = null, endPos = null, length = 0 } = {}) {
      node = node ?? new SourceNode();
      node.filename = this.filename;
      node.source = this.source;
      const savePos = this.pos;
      if (startPos !== null) {
        node.pos = startPos;
        if (endPos !== null) node.endPos = endPos;
        else if (length !== 0) node.endPos = Math.min(startPos + length, this.length);
        else node.endPos = savePos;
      } else if (length !== 0) {
        node.pos = this.pos;
        node.endPos = Math.min(this.pos + length, this.length);
      } else {
        node.pos = Math.max(this.pos - 1, 0);
        node.endPos = this.pos;
      }
      return node;
    }
  };
  var NONTERMINALS = {};
  var ParserCombinator = class {
    quickCheck(source) {
      return true;
    }
    match(source, pc) {
      return true;
    }
  };
  function parse(nonterminal, source, pc, { lskipWs = true, lskipLf = false, BK = false } = {}) {
    const combinator = NONTERMINALS[nonterminal];
    const savedPos = source.pos;
    if (lskipWs || lskipLf) {
      source.skipWhitespacesAndComments(lskipLf);
    }
    const memoKey = source.pos;
    const memo = source.getMemo(nonterminal, memoKey);
    if (memo !== null) {
      source.pos = memo[1];
      return memo[0];
    }
    const startPos = source.pos;
    try {
      const result = combinator.match(source, pc);
      source.setMemo(nonterminal, startPos, result, source.pos);
      return result;
    } catch (e) {
      if (e instanceof YuiError) {
        if (e.BK === true && BK === false) {
          source.pos = startPos;
          const snippet = source.captureLine();
          throw new YuiError(
            ["expected", nonterminal.slice(1).toLowerCase(), `\u274C${snippet}`, `\u26A0\uFE0F${e.message}`],
            source.p({ length: 1 })
          );
        }
        throw e;
      }
      throw e;
    }
  }
  var ConstParser = class extends ParserCombinator {
    quickCheck(source) {
      return source.isMatch("null", { ifUndefined: false }) || source.isMatch("boolean-true", { ifUndefined: false }) || source.isMatch("boolean-false", { ifUndefined: false });
    }
    match(source, pc) {
      const savedPos = source.pos;
      if (source.isMatch("null", { ifUndefined: false })) {
        return source.p({ node: new ConstNode(null), startPos: savedPos });
      }
      if (source.isMatch("boolean-true", { ifUndefined: false })) {
        return source.p({ node: new ConstNode(true), startPos: savedPos });
      }
      if (source.isMatch("boolean-false", { ifUndefined: false })) {
        return source.p({ node: new ConstNode(false), startPos: savedPos });
      }
      throw new YuiError(["expected", "null or boolean"], source.p({ length: 1 }), null, true);
    }
  };
  NONTERMINALS["@Boolean"] = new ConstParser();
  var NumberParser = class extends ParserCombinator {
    quickCheck(source) {
      return source.isMatch("number-first-char", { unconsumed: true });
    }
    match(source, pc) {
      const savedPos = source.pos;
      if (source.isMatch("number-first-char")) {
        source.tryMatch("number-chars", { lskipWs: false });
        if (source.isMatch("number-dot-char", { lskipWs: false })) {
          source.tryMatch("number-first-char", { lskipWs: false });
          source.tryMatch("number-chars", { lskipWs: false });
          const num2 = source.source.slice(savedPos, source.pos);
          return source.p({ node: new NumberNode(parseFloat(num2), true), startPos: savedPos });
        }
        const num = source.source.slice(savedPos, source.pos);
        return source.p({ node: new NumberNode(parseInt(num, 10)), startPos: savedPos });
      }
      throw new YuiError(["expected", "number"], source.p({ length: 1 }), null, true);
    }
  };
  NONTERMINALS["@Number"] = new NumberParser();
  var StringParser = class extends ParserCombinator {
    quickCheck(source) {
      return source.isMatch("string-begin", { unconsumed: true });
    }
    match(source, pc) {
      const openingQuotePos = source.pos;
      if (source.isMatch("string-begin")) {
        let openingPos = source.pos;
        const stringContent = [];
        let expressionCount = 0;
        while (source.pos < source.length) {
          source.consumeUntil("string-content-end", { untilEof: true });
          stringContent.push(source.source.slice(openingPos, source.pos));
          if (source.isMatch("string-end", { unconsumed: true })) break;
          if (source.isMatch("string-escape")) {
            if (source.isEos()) {
              throw new YuiError(["bad", "escape sequence"], source.p({ length: 1 }));
            }
            const nextChar = source.source[source.pos];
            source.pos++;
            if (nextChar === "n") stringContent.push("\n");
            else if (nextChar === "t") stringContent.push("	");
            else stringContent.push(nextChar);
            openingPos = source.pos;
            continue;
          }
          const startInterPos = source.pos;
          if (source.isMatch("string-interpolation-begin", { lskipWs: false })) {
            const expression = parse("@Expression", source, pc);
            source.tryMatch("string-interpolation-end", { openingPos: startInterPos });
            stringContent.push(expression);
            expressionCount++;
            openingPos = source.pos;
            continue;
          }
          break;
        }
        source.tryMatch("string-end", { lskipWs: false, openingPos: openingQuotePos });
        const contents = expressionCount === 0 ? stringContent.join("") : stringContent;
        return source.p({ node: new StringNode(contents), startPos: openingQuotePos });
      }
      throw new YuiError(["expected", "string"], source.p({ length: 1 }), null, true);
    }
  };
  NONTERMINALS["@String"] = new StringParser();
  var ArrayParser = class extends ParserCombinator {
    quickCheck(source) {
      return source.isMatch("array-begin", { unconsumed: true });
    }
    match(source, pc) {
      const openingPos = source.pos;
      if (source.isMatch("array-begin")) {
        const args = [];
        while (!source.isMatch("array-end", { lskipLf: true, unconsumed: true })) {
          args.push(parse("@Expression", source, pc, { lskipLf: true }));
          if (source.isMatch("array-separator", { lskipLf: true })) continue;
        }
        source.tryMatch("array-end", { lskipLf: true, openingPos });
        return source.p({ node: new ArrayNode(args), startPos: openingPos });
      }
      throw new YuiError(["expected", "array"], source.p({ length: 1 }), null, true);
    }
  };
  NONTERMINALS["@Array"] = new ArrayParser();
  var ObjectParser = class extends ParserCombinator {
    quickCheck(source) {
      return source.isMatch("object-begin", { unconsumed: true });
    }
    match(source, pc) {
      const openingPos = source.pos;
      if (source.isMatch("object-begin", { lskipLf: true })) {
        const args = [];
        while (!source.isMatch("object-end", { lskipLf: true, unconsumed: true })) {
          args.push(parse("@String", source, pc, { lskipLf: true }));
          source.tryMatch("key-value-separator", { lskipLf: true });
          args.push(parse("@Expression", source, pc, { lskipLf: true }));
          if (source.isMatch("object-separator", { lskipLf: true })) continue;
        }
        source.tryMatch("object-end", { lskipLf: true, openingPos });
        return source.p({ node: new ObjectNode(args), startPos: openingPos });
      }
      throw new YuiError(["expected", "object"], source.p({ length: 1 }), null, true);
    }
  };
  NONTERMINALS["@Object"] = new ObjectParser();
  var NameParser = class extends ParserCombinator {
    match(source, pc) {
      const specialName = source.matchSpecialName();
      if (specialName !== null) {
        return source.p({
          node: new NameNode(specialName),
          startPos: source.pos - specialName.length
        });
      }
      if (source.isMatch("extra-name-begin", { ifUndefined: false })) {
        const startPos2 = source.pos;
        source.consumeUntil("extra-name-end", { disallowString: "\n" });
        const name = source.source.slice(startPos2, source.pos);
        const node = source.p({ node: new NameNode(name), startPos: startPos2 });
        source.tryMatch("extra-name-end", { openingPos: startPos2 - 1 });
        return node;
      }
      const startPos = source.pos;
      if (source.isMatch("name-first-char")) {
        source.tryMatch("name-chars", { lskipWs: false });
        source.tryMatch("name-end", { lskipWs: false });
        const name = source.source.slice(startPos, source.pos);
        return source.p({ node: new NameNode(name), startPos });
      }
      const snippet = source.captureLine().trim();
      throw new YuiError(["wrong", "name", `\u274C${snippet}`], source.p({ length: 1 }), null, true);
    }
  };
  NONTERMINALS["@Name"] = new NameParser();
  var LITERALS = ["@Number", "@String", "@Array", "@Object", "@Boolean"];
  var TermParser = class extends ParserCombinator {
    match(source, pc) {
      const openingPos = source.pos;
      if (source.isMatch("grouping-begin")) {
        const exprNode = parse("@Expression", source, pc);
        source.tryMatch("grouping-end", { openingPos });
        return exprNode;
      }
      if (source.isMatch("length-begin")) {
        const exprNode = parse("@Expression", source, pc);
        source.tryMatch("length-end", { openingPos });
        return source.p({ node: new ArrayLenNode(exprNode), startPos: openingPos });
      }
      for (const literal of LITERALS) {
        if (NONTERMINALS[literal].quickCheck(source)) {
          source.pos = openingPos;
          return parse(literal, source, pc, { BK: true });
        }
      }
      return parse("@Name", source, pc, { BK: true });
    }
  };
  NONTERMINALS["@Term"] = new TermParser();
  var PrimaryParser = class extends ParserCombinator {
    match(source, pc) {
      const startPos = source.pos;
      if (source.isMatch("unary-minus", { ifUndefined: false })) {
        const node2 = parse("@Primary", source, pc);
        return source.p({ node: new MinusNode(node2), startPos });
      }
      if (source.isMatch("unary-inspection", { ifUndefined: false })) {
        const node2 = parse("@Primary", source, pc);
        return source.p({ node: new PrintExpressionNode(node2, true), startPos });
      }
      if (source.isMatch("unary-length", { ifUndefined: false })) {
        const node2 = parse("@Primary", source, pc);
        return source.p({ node: new ArrayLenNode(node2), startPos });
      }
      let node = parse("@Term", source, pc, { BK: true });
      while (source.hasNext()) {
        const openingPos = source.pos;
        if (source.isMatch("funcapp-args-suffix")) {
          const args = [];
          while (!source.isMatch("funcapp-args-end", { unconsumed: true })) {
            args.push(parse("@Expression", source, pc, { lskipLf: true }));
            if (source.isMatch("funcapp-args-separator")) continue;
          }
          source.tryMatch("funcapp-args-end", { openingPos });
          node = source.p({ node: new FuncAppNode(node, args), startPos });
          continue;
        }
        if (source.isMatch("array-indexer-suffix", { ifUndefined: "\\[" })) {
          const indexNode = parse("@Expression", source, pc);
          source.tryMatch("array-indexer-end", { openingPos });
          node = source.p({ node: new GetIndexNode(node, indexNode), startPos });
          continue;
        }
        const savePos = source.pos;
        if (source.isMatch("property-accessor", { ifUndefined: false })) {
          if (source.isMatch("property-length", { ifUndefined: false })) {
            node = source.p({ node: new ArrayLenNode(node), startPos });
            continue;
          }
          if (source.isMatch("property-type", { ifUndefined: false })) {
          }
          source.pos = savePos;
        }
        break;
      }
      return node;
    }
  };
  NONTERMINALS["@Primary"] = new PrimaryParser();
  var MultiplicativeParser = class extends ParserCombinator {
    match(source, pc) {
      const startPos = source.pos;
      const leftNode = parse("@Primary", source, pc, { BK: true });
      try {
        if (source.isMatch("binary*", { ifUndefined: false })) {
          const rightNode = parse("@Multiplicative", source, pc);
          return source.p({ node: new BinaryNode(leftNode, "*", rightNode), startPos });
        }
        if (source.isMatch("binary/", { ifUndefined: false })) {
          const rightNode = parse("@Multiplicative", source, pc);
          return source.p({ node: new BinaryNode(leftNode, "/", rightNode), startPos });
        }
        if (source.isMatch("binary%", { ifUndefined: false })) {
          const rightNode = parse("@Multiplicative", source, pc);
          return source.p({ node: new BinaryNode(leftNode, "%", rightNode), startPos });
        }
      } catch {
      }
      source.pos = leftNode.endPos;
      return leftNode;
    }
  };
  NONTERMINALS["@Multiplicative"] = new MultiplicativeParser();
  var AdditiveParser = class extends ParserCombinator {
    match(source, pc) {
      const startPos = source.pos;
      const leftNode = parse("@Multiplicative", source, pc, { BK: true });
      try {
        if (source.isMatch("binary+", { ifUndefined: false })) {
          const rightNode = parse("@Additive", source, pc);
          return source.p({ node: new BinaryNode(leftNode, "+", rightNode), startPos });
        }
        if (source.isMatch("binary-", { ifUndefined: false })) {
          const rightNode = parse("@Additive", source, pc);
          return source.p({ node: new BinaryNode(leftNode, "-", rightNode), startPos });
        }
      } catch {
      }
      source.pos = leftNode.endPos;
      return leftNode;
    }
  };
  NONTERMINALS["@Additive"] = new AdditiveParser();
  var ComparativeParser = class extends ParserCombinator {
    match(source, pc) {
      const startPos = source.pos;
      const leftNode = parse("@Additive", source, pc, { BK: true });
      try {
        for (const [op, sym] of [
          ["binary==", "=="],
          ["binary!=", "!="],
          ["binary<=", "<="],
          ["binary>=", ">="],
          ["binary<", "<"],
          ["binary>", ">"],
          ["binaryin", "in"],
          ["binarynotin", "notin"]
        ]) {
          if (source.isMatch(op, { ifUndefined: false })) {
            const rightNode = parse("@Additive", source, pc);
            return source.p({
              node: new BinaryNode(leftNode, sym, rightNode, true),
              startPos
            });
          }
        }
      } catch {
      }
      source.pos = leftNode.endPos;
      return leftNode;
    }
  };
  NONTERMINALS["@Comparative"] = new ComparativeParser();
  var ExpressionParser = class extends ParserCombinator {
    match(source, pc) {
      return parse("@Comparative", source, pc, { BK: true });
    }
  };
  NONTERMINALS["@Expression"] = new ExpressionParser();
  var AssignmentParser = class extends ParserCombinator {
    match(source, pc) {
      let BK = source.canBacktrack("assignment-lookahead");
      const startPos = source.pos;
      source.tryMatch("assignment-begin", { BK });
      if (BK) BK = source.pos === startPos;
      const leftNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("assignment-infix", { BK });
      const rightNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("assignment-end", { BK });
      return source.p({ node: new AssignmentNode(leftNode, rightNode), startPos });
    }
  };
  NONTERMINALS["@Assignment"] = new AssignmentParser();
  var IncrementParser = class extends ParserCombinator {
    match(source, pc) {
      let BK = source.canBacktrack("increment-lookahead");
      const startPos = source.pos;
      source.tryMatch("increment-begin", { BK });
      if (BK) BK = source.pos === startPos;
      const lvalueNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("increment-infix", { BK });
      source.tryMatch("increment-end", { BK });
      return source.p({ node: new IncrementNode(lvalueNode), startPos });
    }
  };
  NONTERMINALS["@Increment"] = new IncrementParser();
  var DecrementParser = class extends ParserCombinator {
    match(source, pc) {
      let BK = source.canBacktrack("decrement-lookahead");
      const startPos = source.pos;
      source.tryMatch("decrement-begin", { BK });
      if (BK) BK = source.pos === startPos;
      const lvalueNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("decrement-infix", { BK });
      source.tryMatch("decrement-end", { BK });
      return source.p({ node: new DecrementNode(lvalueNode), startPos });
    }
  };
  NONTERMINALS["@Decrement"] = new DecrementParser();
  var AppendParser = class extends ParserCombinator {
    match(source, pc) {
      let BK = source.canBacktrack("append-lookahead");
      const startPos = source.pos;
      source.tryMatch("append-begin", { BK });
      if (BK) BK = source.pos === startPos;
      const lvalueNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("append-infix", { BK });
      const valueNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("append-suffix", { BK });
      source.tryMatch("append-end", { BK });
      return source.p({ node: new AppendNode(lvalueNode, valueNode), startPos });
    }
  };
  NONTERMINALS["@Append"] = new AppendParser();
  var BreakParser = class extends ParserCombinator {
    match(source, pc) {
      const startPos = source.pos;
      source.tryMatch("break", { BK: true });
      return source.p({ node: new BreakNode(), startPos });
    }
  };
  NONTERMINALS["@Break"] = new BreakParser();
  var ImportParser = class extends ParserCombinator {
    match(source, pc) {
      const startPos = source.pos;
      source.tryMatch("import-standard", { BK: true });
      return source.p({ node: new ImportNode(), startPos });
    }
  };
  NONTERMINALS["@Import"] = new ImportParser();
  var PassParser = class extends ParserCombinator {
    match(source, pc) {
      const startPos = source.pos;
      source.tryMatch("pass", { BK: true });
      return source.p({ node: new PassNode(), startPos });
    }
  };
  NONTERMINALS["@Pass"] = new PassParser();
  var ReturnParser = class extends ParserCombinator {
    match(source, pc) {
      let BK = source.canBacktrack("return-lookahead");
      const startPos = source.pos;
      source.tryMatch("return-begin", { BK });
      if (BK) BK = source.pos === startPos;
      const exprNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("return-end", { BK });
      return source.p({ node: new ReturnNode(exprNode), startPos });
    }
  };
  NONTERMINALS["@Return"] = new ReturnParser();
  var PrintExpressionParser = class extends ParserCombinator {
    match(source, pc) {
      let BK = source.canBacktrack("print-lookahead");
      const startPos = source.pos;
      source.tryMatch("print-begin", { BK });
      if (BK) BK = source.pos === startPos;
      const exprNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("print-end", { BK });
      return source.p({ node: new PrintExpressionNode(exprNode), startPos });
    }
  };
  NONTERMINALS["@PrintExpression"] = new PrintExpressionParser();
  var RepeatParser = class extends ParserCombinator {
    match(source, pc) {
      let BK = source.canBacktrack("repeat-lookahead");
      const startPos = source.pos;
      source.tryMatch("repeat-begin", { BK });
      if (BK) BK = source.pos === startPos;
      const timesNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("repeat-times", { BK });
      source.tryMatch("repeat-block", { BK });
      pc = { ...pc, indent: source.captureIndent() };
      const blockNode = parse("@Block", source, pc);
      source.tryMatch("repeat-end", { BK: false });
      return source.p({ node: new RepeatNode(timesNode, blockNode), startPos });
    }
  };
  NONTERMINALS["@Repeat"] = new RepeatParser();
  var IfParser = class extends ParserCombinator {
    match(source, pc) {
      const startPos = source.pos;
      let BK = source.canBacktrack("if-lookahead");
      source.tryMatch("if-begin", { BK });
      source.tryMatch("if-condition-begin", { BK });
      if (BK) BK = source.pos === startPos;
      let leftNode = parse("@Expression", source, pc, { BK });
      let operator, rightNode;
      if (leftNode instanceof BinaryNode && leftNode.comparative) {
        operator = leftNode.operator;
        rightNode = leftNode.rightNode;
        leftNode = leftNode.leftNode;
      } else {
        operator = source.findMatch("if-infix", ["==", "!=", "<=", "<", ">=", ">", "notin", "in"]);
        if (!operator) {
          source.tryMatch("if-infix", { BK });
        }
        rightNode = parse("@Expression", source, pc, { BK });
        if (!operator) {
          operator = source.findMatch("if-suffix", ["!=", "<=", "<", ">=", ">", "notin", "in", "=="]);
          source.skipWhitespacesAndComments();
          if (operator === null) operator = "==";
        }
      }
      source.tryMatch("if-condition-end", { BK });
      pc = { ...pc, indent: source.captureIndent() };
      source.tryMatch("if-then", { BK: false });
      const thenNode = parse("@Block", source, pc, { BK: false });
      const savePos = source.pos;
      source.skipWhitespacesAndComments(true);
      let elseNode = null;
      if (source.isMatch("if-else")) {
        elseNode = parse("@Block", source, pc, { BK: false });
      } else {
        source.pos = savePos;
      }
      source.tryMatch("if-end", { BK: false });
      const opSymbol = typeof operator === "string" ? operator : operator.symbol;
      return source.p({ node: new IfNode(leftNode, opSymbol, rightNode, thenNode, elseNode), startPos });
    }
  };
  NONTERMINALS["@If"] = new IfParser();
  var FuncDefParser = class extends ParserCombinator {
    match(source, pc) {
      let BK = source.canBacktrack("funcdef-lookahead");
      const startPos = source.pos;
      source.tryMatch("funcdef-begin", { BK });
      source.tryMatch("funcdef-name-begin", { BK });
      if (BK) BK = source.pos === startPos;
      const nameNode = parse("@Name", source, pc, { BK });
      source.tryMatch("funcdef-name-end", { BK });
      const args = [];
      if (!source.isMatch("funcdef-noarg")) {
        source.tryMatch("funcdef-args-begin", { BK });
        while (!source.isMatch("funcdef-args-end", { unconsumed: true })) {
          const argNode = parse("@Name", source, pc);
          args.push(argNode);
          if (source.isMatch("funcdef-arg-separator")) continue;
          break;
        }
        source.tryMatch("funcdef-args-end", { BK: false });
      }
      pc = { ...pc, indent: source.captureIndent() };
      source.tryMatch("funcdef-block", { BK });
      const bodyNode = parse("@Block", source, pc, { BK: false });
      source.tryMatch("funcdef-end", { BK: false });
      return source.p({ node: new FuncDefNode(nameNode, args, bodyNode), startPos });
    }
  };
  NONTERMINALS["@FuncDef"] = new FuncDefParser();
  var AssertParser = class extends ParserCombinator {
    match(source, pc) {
      const startPos = source.pos;
      let BK = source.canBacktrack("assert-lookahead");
      source.tryMatch("assert-begin", { BK });
      if (BK) BK = source.pos === startPos;
      const testNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("assert-infix", { BK });
      const referenceNode = parse("@Expression", source, pc, { BK });
      source.tryMatch("assert-end", { BK });
      return source.p({ node: new AssertNode(testNode, referenceNode), startPos });
    }
  };
  NONTERMINALS["@Assert"] = new AssertParser();
  var BlockParser = class extends ParserCombinator {
    match(source, pc) {
      const savedPos = source.pos;
      source.tryMatch("block-begin");
      if (source.isMatch("block-end")) {
        return source.p({ node: new BlockNode([]), startPos: savedPos });
      }
      let statements = parse("@Statement[]", source, pc);
      if (source.isMatch("block-end")) {
        return source.p({ node: new BlockNode(statements), startPos: savedPos });
      }
      const endLevelIndent = pc.indent ?? "";
      while (source.hasNext()) {
        source.isEosOrLinefeed();
        const lineStartPos = source.pos;
        if (source.consumeString(endLevelIndent)) {
          if (source.isMatch("whitespace", { lskipWs: false })) {
            if (source.isMatch("block-end", { unconsumed: true })) {
              throw new YuiError(
                ["wrong", "indent", `\u2705\`${endLevelIndent}\``],
                source.p({ startPos: lineStartPos, length: endLevelIndent.length })
              );
            }
            statements = statements.concat(parse("@Statement[]", source, pc));
            continue;
          }
        }
        if (source.isMatch("linefeed", { unconsumed: true })) continue;
        break;
      }
      source.tryMatch("block-end", { openingPos: savedPos });
      return source.p({ node: new BlockNode(statements), startPos: savedPos });
    }
  };
  NONTERMINALS["@Block"] = new BlockParser();
  var STATEMENTS = [
    "@FuncDef",
    "@Assignment",
    "@Assert",
    "@If",
    "@Repeat",
    "@Break",
    "@Increment",
    "@Decrement",
    "@Append",
    "@Return",
    "@Import",
    "@Pass",
    "@PrintExpression"
  ];
  var StatementParser = class extends ParserCombinator {
    match(source, pc) {
      const savedPos = source.pos;
      for (const parserName of STATEMENTS) {
        source.pos = savedPos;
        try {
          return parse(parserName, source, pc, { BK: true });
        } catch (e) {
          if (e instanceof YuiError && e.BK) continue;
          throw e;
        }
      }
      source.pos = savedPos;
      const line = source.captureLine();
      throw new YuiError(["wrong", "statement", `\u274C${line}`], source.p({ length: 1 }));
    }
  };
  NONTERMINALS["@Statement"] = new StatementParser();
  var StatementsParser = class extends ParserCombinator {
    match(source, pc) {
      let statements;
      if (source.isEosOrLinefeed({ lskipWs: true, unconsumed: true })) {
        statements = [];
      } else {
        statements = [parse("@Statement", source, pc)];
      }
      while (source.isMatch("statement-separator", { ifUndefined: false })) {
        statements.push(parse("@Statement", source, pc));
      }
      return statements;
    }
  };
  NONTERMINALS["@Statement[]"] = new StatementsParser();
  var TopLevelParser = class extends ParserCombinator {
    match(source, pc) {
      source.skipWhitespacesAndComments(true);
      const savedPos = source.pos;
      const statements = [];
      while (source.hasNext()) {
        const curPos = source.pos;
        statements.push(...parse("@Statement[]", source, pc));
        if (curPos === source.pos) break;
        source.skipWhitespacesAndComments(true);
      }
      return source.p({ node: new BlockNode(statements, true), startPos: savedPos });
    }
  };
  NONTERMINALS["@TopLevel"] = new TopLevelParser();
  var YuiParser = class {
    constructor(syntax = "yui") {
      this.syntax = syntax;
      this.terminals = typeof syntax === "object" ? { ...syntax } : loadSyntax(syntax);
    }
    parse(sourceCode) {
      const source = new Source(sourceCode, "main.yui", 0, this.terminals);
      return parse("@TopLevel", source, {});
    }
  };

  // src/yuiruntime.js
  var YuiBreakException = class extends Error {
    constructor() {
      super("break");
      this.name = "YuiBreakException";
    }
  };
  var YuiReturnException = class extends Error {
    constructor(value = null) {
      super("return");
      this.name = "YuiReturnException";
      this.value = value;
    }
  };
  var YuiFunction = class {
    constructor(name) {
      this.name = name;
    }
    call(arguments_, node, runtime) {
      throw new Error("Abstract method: call");
    }
  };
  var LocalFunctionV = class extends YuiFunction {
    constructor(name, parameters, body) {
      super(name);
      this.parameters = parameters;
      this.body = body;
    }
    call(argValues, node, runtime) {
      runtime.pushenv();
      if (this.parameters.length !== argValues.length) {
        throw new YuiError(
          ["mismatch", "arguments", `\u2705${this.parameters.length}`, `\u274C${argValues.length}`],
          node
        );
      }
      for (let i = 0; i < this.parameters.length; i++) {
        runtime.setenv(this.parameters[i], argValues[i]);
      }
      try {
        runtime.pushCallFrame(this.name, argValues, node);
        runtime.checkRecursionDepth();
        this.body.visit(runtime);
      } catch (e) {
        if (e instanceof YuiReturnException) {
          if (e.value !== null) {
            runtime.popCallFrame();
            runtime.popenv();
            return e.value;
          }
        } else {
          throw e;
        }
      }
      runtime.popCallFrame();
      return new YuiValue(runtime.popenv());
    }
  };
  var NativeFunction = class extends YuiFunction {
    constructor(fn, isFfi = false) {
      super(fn.name || "anonymous");
      this.fn = fn;
      this.isFfi = isFfi;
    }
    call(argValues, node, runtime) {
      try {
        const result = this.fn(...argValues);
        return result instanceof YuiValue ? result : new YuiValue(result);
      } catch (e) {
        if (e instanceof YuiError) {
          if (!e.errorNode) e.errorNode = node;
          throw e;
        }
        throw new YuiError(["error", "internal", `\u{1F50D}${this.name}`, `\u26A0\uFE0F ${e.message}`], node);
      }
    }
  };
  var YuiRuntime = class {
    constructor() {
      this.environments = [{}];
      this.callFrames = [];
      this.filesystems = {};
      this.shouldStop = false;
      this.timeout = 0;
      this._startTime = 0;
      this.interactiveMode = false;
      this.source = "";
      this.resetStats();
    }
    resetStats() {
      this.incrementCount = 0;
      this.decrementCount = 0;
      this.compareCount = 0;
      this.testPassed = [];
      this.testFailed = [];
    }
    hasenv(name) {
      for (let i = this.environments.length - 1; i >= 0; i--) {
        if (name in this.environments[i]) return true;
      }
      return false;
    }
    getenv(name) {
      for (let i = this.environments.length - 1; i >= 0; i--) {
        if (name in this.environments[i]) return this.environments[i][name];
      }
      return null;
    }
    setenv(name, value) {
      this.environments[this.environments.length - 1][name] = value;
    }
    pushenv() {
      this.environments.push({});
    }
    popenv() {
      return this.environments.pop();
    }
    stringfyEnv(stack = -1, indentPrefix = "") {
      const idx = stack < 0 ? this.environments.length + stack : stack;
      const env = this.environments[idx];
      const inner = indentPrefix + "  ";
      const lines = [`${indentPrefix}<${this.stringfyCallFrames(stack)}>
{`];
      const entries = Object.entries(env);
      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
        if (key.startsWith("@")) continue;
        lines.push(`
${indentPrefix}  "${key}": `);
        lines.push(YuiValue.stringfyValue(value, inner));
        if (i < entries.length - 1) lines.push(", ");
      }
      lines.push(`
${indentPrefix}}`);
      return lines.join("");
    }
    pushCallFrame(funcName, args, node) {
      this.callFrames.push([funcName, args, node]);
    }
    popCallFrame() {
      this.callFrames.pop();
    }
    stringfyCallFrames(stack = -1) {
      if (this.callFrames.length === 0) return "global";
      const idx = stack < 0 ? this.callFrames.length + stack : stack;
      const frame = this.callFrames[idx];
      const args = frame[1].map((arg) => YuiValue.stringfyValue(arg, null)).join(", ");
      return `${frame[0]}(${args})]`;
    }
    checkRecursionDepth() {
      if (this.callFrames.length > 512) {
        const frame = this.callFrames[this.callFrames.length - 1];
        const args = frame[1].map((a) => String(a)).join(", ");
        const snippet = `${frame[0]}(${args})`;
        throw new YuiError(["error", "recursion", `\u{1F50D}${snippet}`], frame[2]);
      }
    }
    countInc() {
      this.incrementCount++;
    }
    countDec() {
      this.decrementCount++;
    }
    countCompare() {
      this.compareCount++;
    }
    load(fn) {
      return new NativeFunction(fn);
    }
    print(value, node) {
      const [line, , snippet] = node.extract();
      let out;
      if (this.interactiveMode || node instanceof StringNode) {
        out = String(value);
      } else if (node instanceof FuncAppNode) {
        out = `#line: ${line} ${node.snippet.trim()}
>>> ${node.snippet}
${value}`;
      } else {
        out = `#line: ${line}
>>> ${snippet.trim()}
${value}`;
      }
      console.log(out);
    }
    start(timeout = 30) {
      this.shouldStop = false;
      this.timeout = timeout;
      this._startTime = Date.now();
    }
    checkExecution(node) {
      if (this.shouldStop) {
        throw new YuiError(["interrupted"], node);
      }
      if (this.timeout > 0 && (Date.now() - this._startTime) / 1e3 > this.timeout) {
        throw new YuiError(["error", "timeout", `\u274C${this.timeout}[sec]`, `\u2705${this.timeout}[sec]`], node);
      }
    }
    exec(source, syntax = "yui", timeout = 30, evalMode = true) {
      this.source = source;
      const parser = new YuiParser(syntax);
      const program = parser.parse(source);
      try {
        this.start(timeout);
        const value = program.evaluate(this);
        return evalMode ? YuiType.yuiToNative(value) : this.environments[this.environments.length - 1];
      } catch (e) {
        if (e instanceof YuiError) {
          e.runtime = this;
          throw e;
        }
        throw e;
      }
    }
    evaluate(node) {
      return node.visit(this);
    }
    // ─────────────────────────────────────────────
    // Visitor methods — Literals
    // ─────────────────────────────────────────────
    visitConstNode(node) {
      if (node.nativeValue === true) return YuiValue.TrueValue;
      if (node.nativeValue === false) return YuiValue.FalseValue;
      return YuiValue.NullValue;
    }
    visitNumberNode(node) {
      if (node.isFloat) {
        return new YuiValue(node.nativeValue, YuiType.FloatType);
      }
      return new YuiValue(node.nativeValue);
    }
    visitStringNode(node) {
      if (typeof node.contents === "string") {
        return new YuiValue(node.contents);
      }
      const parts = [];
      for (const content of node.contents) {
        if (typeof content === "string") {
          parts.push(content);
        } else {
          const value = content.visit(this);
          parts.push(String(YuiType.yuiToNative(value)));
        }
      }
      return new YuiValue(parts.join(""));
    }
    visitArrayNode(node) {
      const arrayValue = new YuiValue([]);
      for (const element of node.elements) {
        const v = element.visit(this);
        arrayValue.append(v);
      }
      return arrayValue;
    }
    visitObjectNode(node) {
      const objectValue = new YuiValue({});
      for (let i = 0; i < node.elements.length; i += 2) {
        const key = node.elements[i].visit(this);
        const val = node.elements[i + 1].visit(this);
        objectValue.setItem(key, val);
      }
      return objectValue;
    }
    // ─────────────────────────────────────────────
    // Variable / expression visitors
    // ─────────────────────────────────────────────
    visitNameNode(node) {
      if (!this.hasenv(node.name)) {
        throw new YuiError(["undefined", "variable", `\u274C${node.name}`], node);
      }
      return this.getenv(node.name);
    }
    visitGetIndexNode(node) {
      const collection = node.collection.visit(this);
      const index = node.indexNode.visit(this);
      return collection.getItem(index);
    }
    visitArrayLenNode(node) {
      const value = node.element.visit(this);
      return new YuiValue(value.arrayview.length);
    }
    visitMinusNode(node) {
      const value = node.element.visit(this);
      YuiType.NumberType.matchOrRaise(value);
      return new YuiValue(-YuiType.matchedNative(value));
    }
    visitBinaryNode(node) {
      throw new YuiError(
        ["error", "internal", `\u{1F50D}${node.operator} operator is not implemented`],
        node
      );
    }
    visitFuncAppNode(node) {
      const name = `@${node.nameNode.name}`;
      if (!this.hasenv(name)) {
        throw new YuiError(["undefined", "function", `\u274C${node.nameNode.name}`], node.nameNode);
      }
      const func = this.getenv(name);
      if (!(func instanceof YuiFunction)) {
        throw new YuiError(["error", "type", "\u2705<function>", `\u274C${func}`], node.nameNode);
      }
      const argValues = node.arguments.map((arg) => arg.visit(this));
      if (node.snippet === "") {
        const args = argValues.map((v) => String(v)).join(", ");
        node.snippet = `${node.nameNode.name}(${args})`;
      }
      return func.call(argValues, node, this);
    }
    // ─────────────────────────────────────────────
    // Assignment / mutation visitors
    // ─────────────────────────────────────────────
    visitAssignmentNode(node) {
      if (typeof node.variable.update !== "function") {
        throw new YuiError(["expected", "variable", `\u274C${node.variable}`], node.variable);
      }
      const value = node.expression.visit(this);
      node.variable.update(value, this);
    }
    visitIncrementNode(node) {
      const value = node.variable.visit(this);
      YuiType.IntType.matchOrRaise(value);
      node.variable.update(new YuiValue(YuiType.matchedNative(value) + 1), this);
      this.countInc();
    }
    visitDecrementNode(node) {
      const value = node.variable.visit(this);
      YuiType.IntType.matchOrRaise(value);
      node.variable.update(new YuiValue(YuiType.matchedNative(value) - 1), this);
      this.countDec();
    }
    visitAppendNode(node) {
      const array = node.variable.visit(this);
      const value = node.expression.visit(this);
      array.append(value);
    }
    // ─────────────────────────────────────────────
    // Control-flow visitors
    // ─────────────────────────────────────────────
    visitBlockNode(node) {
      for (const statement of node.statements) {
        statement.visit(this);
      }
    }
    visitIfNode(node) {
      const left = node.left.visit(this);
      const right = node.right.visit(this);
      const result = node.operator.evaluate(left, right);
      this.countCompare();
      if (result) {
        node.thenBlock.visit(this);
      } else if (node.elseBlock) {
        node.elseBlock.visit(this);
      }
    }
    visitBreakNode(node) {
      throw new YuiBreakException();
    }
    visitPassNode(node) {
    }
    visitRepeatNode(node) {
      const countValue = node.countNode.visit(this);
      YuiType.IntType.matchOrRaise(countValue);
      const count = YuiType.matchedNative(countValue);
      try {
        for (let i = 0; i < Math.abs(count); i++) {
          this.checkExecution(node);
          node.blockNode.visit(this);
        }
      } catch (e) {
        if (e instanceof YuiBreakException) return;
        throw e;
      }
    }
    visitReturnNode(node) {
      const value = node.expression.visit(this);
      throw new YuiReturnException(value);
    }
    visitFuncDefNode(node) {
      const params = node.parameters.map((p) => p.name);
      const func = new LocalFunctionV(node.nameNode.name, params, node.body);
      this.setenv(`@${node.nameNode.name}`, func);
      return func;
    }
    // ─────────────────────────────────────────────
    // Print / assert visitors
    // ─────────────────────────────────────────────
    visitPrintExpressionNode(node) {
      if (node.expression instanceof MinusNode) {
        return node.expression.element.visit(this);
      }
      if (node.expression instanceof FuncAppNode) {
        node.expression.snippet = "";
      }
      const value = node.expression.visit(this);
      this.print(value, node.expression);
      return value;
    }
    visitAssertNode(node) {
      let tested = null;
      let referenceValue = null;
      try {
        tested = node.test.visit(this);
        referenceValue = node.reference.visit(this);
        if (tested.type.equals(tested, referenceValue)) {
          this.testPassed.push(String(node.test));
          return;
        }
      } catch (e) {
        if (e instanceof YuiError) throw e;
      }
      throw new YuiError(
        ["failed", "test", `\u{1F50D}${node.test}`, `\u274C${tested}`, `\u2705${referenceValue}`],
        node
      );
    }
    visitImportNode(node) {
      const modules = [];
      if (node.moduleName === null) {
        standardLib(modules);
      }
      for (const [names, fn] of modules) {
        for (const name of names.split("|")) {
          this.setenv(`@${name}`, new NativeFunction(fn));
        }
      }
    }
  };

  // src/yuicoding.js
  var CodingVisitor = class extends YuiSyntax {
    constructor(syntaxJson) {
      if (typeof syntaxJson === "string") {
        syntaxJson = loadSyntax(syntaxJson);
      }
      super(syntaxJson);
      this.buffer = [];
      this.indent = 0;
      this.justLinefeeded = false;
    }
    emit(node) {
      this.buffer = [];
      this.indent = 0;
      this.justLinefeeded = true;
      node.visit(this);
      return this.buffer.join("");
    }
    lastChar() {
      if (this.buffer.length === 0) return "\n";
      const last = this.buffer[this.buffer.length - 1];
      return last[last.length - 1];
    }
    linefeed() {
      if (!this.justLinefeeded) {
        this.buffer.push("\n" + "  ".repeat(this.indent));
        this.justLinefeeded = true;
      }
    }
    string(text) {
      if (text.includes("\n")) {
        const lines = text.split("\n");
        for (const line of lines.slice(0, -1)) {
          this.string(line);
          this.linefeed();
        }
        this.string(lines[lines.length - 1]);
        return;
      }
      if (text.length === 0) return;
      if (text === " " && this.lastChar() === " ") return;
      this.buffer.push(text);
      this.justLinefeeded = false;
    }
    wordSegment(noSpaceIfLastChars = " \n([{") {
      if (this.isDefined("word-segmenter")) {
        if (!noSpaceIfLastChars.includes(this.lastChar())) {
          this.string(" ");
        }
      }
    }
    terminal(terminal, { ifUndefined = null, linefeedBefore = false } = {}) {
      if (terminal === "linefeed") {
        this.linefeed();
        return;
      }
      if (!this.isDefined(terminal)) return;
      const token = this.forExample(terminal);
      if (token === "") {
        console.warn(`Warning: terminal '${terminal}' is empty string`);
        return;
      }
      if (!`,()[]{}:"'.`.includes(token[0])) {
        this.wordSegment();
      }
      if (linefeedBefore) this.linefeed();
      this.string(token);
    }
    comment(comment) {
      if (!comment) return;
      if (this.isDefined("comment-begin") && this.isDefined("comment-end")) {
        this.terminal("comment-begin");
        this.string(comment);
        this.terminal("comment-end");
      } else if (this.isDefined("line-comment-begin")) {
        for (const line of comment.split("\n")) {
          this.terminal("line-comment-begin");
          this.string(` ${line}`);
          this.linefeed();
        }
      }
    }
    expression(node) {
      this.wordSegment();
      node.visit(this);
    }
    statement(node) {
      node.visit(this);
      this.comment(node.comment);
    }
    block(node) {
      if (!(node instanceof BlockNode)) {
        new BlockNode([node]).visit(this);
      } else {
        node.visit(this);
      }
    }
    escape(text) {
      return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    }
    // ─────────────────────────────────────────────
    // Visitor methods
    // ─────────────────────────────────────────────
    visitASTNode(node) {
      this.string(`FIXME: ${node.constructor.name}`);
    }
    visitConstNode(node) {
      if (node.nativeValue === null) {
        this.terminal("null");
      } else if (node.nativeValue === true) {
        this.terminal("boolean-true");
      } else {
        this.terminal("boolean-false");
      }
    }
    visitNumberNode(node) {
      this.terminal("number-begin");
      this.string(YuiType.arrayviewS(node.nativeValue));
      this.terminal("number-end");
    }
    visitStringNode(node) {
      this.terminal("string-begin");
      if (typeof node.contents === "string") {
        this.string(this.escape(node.contents));
      } else {
        for (const content of node.contents) {
          if (typeof content === "string") {
            this.string(this.escape(content));
          } else {
            this.terminal("string-interpolation-begin");
            content.visit(this);
            this.terminal("string-interpolation-end");
          }
        }
      }
      this.terminal("string-end");
    }
    visitNameNode(node) {
      this.terminal("name-begin");
      this.string(node.name);
      this.terminal("name-end");
    }
    visitArrayNode(node) {
      const savedBuffer = this.buffer;
      this.buffer = [];
      this.terminal("array-begin");
      node.elements.forEach((element, i) => {
        if (i > 0) this.terminal("array-separator");
        this.expression(element);
      });
      this.terminal("array-end");
      const content = this.buffer.join("");
      this.buffer = savedBuffer;
      if (content.length <= 80 && !content.includes("\n")) {
        this.string(content);
        return;
      }
      this.terminal("array-begin");
      this.indent++;
      this.linefeed();
      node.elements.forEach((element, i) => {
        if (i > 0) {
          this.terminal("array-separator");
          this.linefeed();
        }
        this.expression(element);
      });
      this.indent--;
      this.linefeed();
      this.terminal("array-end");
    }
    visitObjectNode(node) {
      const savedBuffer = this.buffer;
      this.buffer = [];
      this.terminal("object-begin");
      for (let i = 0; i < node.elements.length; i += 2) {
        if (i > 0) this.terminal("object-separator");
        this.expression(node.elements[i]);
        this.terminal("key-value-separator");
        this.expression(node.elements[i + 1]);
      }
      this.terminal("object-end");
      const content = this.buffer.join("");
      this.buffer = savedBuffer;
      if (content.length <= 80 && !content.includes("\n")) {
        this.string(content);
        return;
      }
      this.terminal("object-begin");
      this.indent++;
      this.linefeed();
      for (let i = 0; i < node.elements.length; i += 2) {
        if (i > 0) {
          this.terminal("object-separator");
          this.linefeed();
        }
        this.expression(node.elements[i]);
        this.terminal("key-value-separator");
        this.expression(node.elements[i + 1]);
      }
      this.indent--;
      this.linefeed();
      this.terminal("object-end");
    }
    visitMinusNode(node) {
      if (this.isDefined("minus-begin")) {
        this.terminal("minus-begin");
        this.expression(node.element);
        this.terminal("minus-end");
      } else if (this.isDefined("unary-minus")) {
        this.terminal("unary-minus");
        node.element.visit(this);
      } else {
        this.visitASTNode(node);
      }
    }
    visitBinaryNode(node) {
      this.expression(node.leftNode);
      this.wordSegment();
      this.terminal(`binary${node.operator}`);
      this.wordSegment();
      this.expression(node.rightNode);
    }
    visitArrayLenNode(node) {
      if (this.isDefined("property-length")) {
        this.expression(node.element);
        this.terminal("property-accessor");
        this.terminal("property-length");
      } else if (this.isDefined("unary-length")) {
        this.terminal("unary-length");
        this.expression(node.element);
      } else if (this.isDefined("length-begin")) {
        this.terminal("length-begin");
        this.expression(node.element);
        this.terminal("length-end");
      }
    }
    visitGetIndexNode(node) {
      this.terminal("array-indexer-begin");
      this.expression(node.collection);
      this.terminal("array-indexer-suffix");
      this.expression(node.indexNode);
      this.terminal("array-indexer-end");
    }
    visitFuncAppNode(node) {
      this.terminal("funcapp-begin");
      this.expression(node.nameNode);
      this.terminal("funcapp-args-suffix");
      node.arguments.forEach((arg, i) => {
        if (i > 0) this.terminal("funcapp-args-separator");
        this.expression(arg);
      });
      this.terminal("funcapp-args-end");
    }
    visitAssignmentNode(node) {
      this.terminal("assignment-begin");
      this.expression(node.variable);
      this.terminal("assignment-infix");
      this.expression(node.expression);
      this.terminal("assignment-end");
    }
    visitIncrementNode(node) {
      this.terminal("increment-begin");
      this.expression(node.variable);
      this.terminal("increment-infix");
      this.terminal("increment-end");
    }
    visitDecrementNode(node) {
      this.terminal("decrement-begin");
      this.expression(node.variable);
      this.terminal("decrement-infix");
      this.terminal("decrement-end");
    }
    visitAppendNode(node) {
      this.terminal("append-begin");
      this.expression(node.variable);
      this.terminal("append-infix");
      this.expression(node.expression);
      this.terminal("append-suffix");
      this.terminal("append-end");
    }
    visitBreakNode(node) {
      this.terminal("break");
    }
    visitPassNode(node) {
    }
    visitReturnNode(node) {
      if (node.expression instanceof ASTNode) {
        this.terminal("return-begin");
        this.expression(node.expression);
        this.terminal("return-end");
      } else {
        this.terminal("return-none");
      }
    }
    visitPrintExpressionNode(node) {
      if (node.groping) {
        this.terminal("groping-begin");
        this.expression(node.expression);
        this.terminal("groping-end");
      } else if (node.inspection && this.isDefined("unary-inspection")) {
        this.terminal("unary-inspection");
        this.expression(node.expression);
      } else {
        this.terminal("print-begin");
        this.expression(node.expression);
        this.terminal("print-end");
      }
    }
    visitIfNode(node) {
      this.terminal("if-begin");
      this.terminal("if-condition-begin");
      this.expression(node.left);
      if (!(node.left instanceof BinaryNode && node.left.comparative)) {
        const opSymbol = node.operator.symbol ?? String(node.operator);
        if (this.isDefined(`if-infix${opSymbol}`)) {
          this.terminal(`if-infix${opSymbol}`);
        } else {
          this.terminal("if-infix");
        }
        this.expression(node.right);
        if (this.isDefined(`if-suffix${opSymbol}`)) {
          this.terminal(`if-suffix${opSymbol}`);
        } else {
          this.terminal("if-suffix");
        }
        this.terminal("if-condition-end");
      }
      this.terminal("if-then");
      this.block(node.thenBlock);
      if (node.elseBlock) {
        if (this.isDefined("if-else-if") && node.elseBlock instanceof IfNode) {
          this.terminal("if-else-if", { linefeedBefore: true });
          this.block(node.elseBlock);
        } else {
          this.terminal("if-else", { linefeedBefore: true });
          this.block(node.elseBlock);
        }
      }
      this.terminal("if-end", { linefeedBefore: true });
    }
    visitRepeatNode(node) {
      this.terminal("repeat-begin");
      this.expression(node.countNode);
      this.terminal("repeat-times");
      this.terminal("repeat-block");
      this.block(node.blockNode);
      this.terminal("repeat-end", { linefeedBefore: true });
    }
    visitFuncDefNode(node) {
      this.terminal("funcdef-begin");
      this.terminal("funcdef-name-begin");
      this.expression(node.nameNode);
      this.terminal("funcdef-name-end");
      if (this.isDefined("funcdef-noarg") && node.parameters.length === 0) {
        this.terminal("funcdef-noarg");
      } else {
        this.terminal("funcdef-args-begin");
        node.parameters.forEach((arg, i) => {
          if (i > 0) this.terminal("funcdef-arg-separator");
          this.expression(arg);
        });
        this.terminal("funcdef-args-end");
      }
      this.terminal("funcdef-block");
      this.block(node.body);
      this.terminal("funcdef-end", { linefeedBefore: true });
    }
    visitAssertNode(node) {
      this.terminal("assert-begin");
      this.expression(node.test);
      this.terminal("assert-infix");
      this.expression(node.reference);
      this.terminal("assert-end");
    }
    visitBlockNode(node) {
      if (!node.topLevel) {
        this.terminal("block-begin");
        this.indent++;
        this.linefeed();
      }
      if (node.statements.length === 0) {
        this.terminal("pass");
      } else {
        node.statements.forEach((statement, i) => {
          if (i > 0) this.linefeed();
          statement.visit(this);
          if (statement instanceof FuncDefNode) this.linefeed();
          this.terminal("block-separator");
          if (statement instanceof PassNode) this.linefeed();
          this.comment(statement.comment);
        });
      }
      if (!node.topLevel) {
        this.indent--;
        this.justLinefeeded = false;
        this.terminal("block-end", { linefeedBefore: true });
      }
    }
    visitImportNode(node) {
      this.terminal("import-standard");
    }
  };

  // src/yuiexample.js
  var YuiExample = class {
    constructor(name, description, astNode) {
      this.name = name;
      this.description = description;
      this.astNode = astNode;
    }
    generate(syntax = "yui") {
      const visitor = new CodingVisitor(syntax);
      return visitor.emit(this.astNode);
    }
  };
  function exampleHelloWorld() {
    const statements = [
      new PassNode('Print "Hello, world!"'),
      new PrintExpressionNode(new StringNode("Hello, world!"))
    ];
    return new YuiExample(
      "hello_world",
      "Print 'Hello, world!'",
      new BlockNode(statements, true)
    );
  }
  function exampleVariables() {
    const statements = [
      new PassNode("Define variables x and y"),
      new AssignmentNode(new NameNode("x"), new NumberNode(1)),
      new AssignmentNode(new NameNode("y"), new MinusNode(new NumberNode(2))),
      new PassNode("Increment x"),
      new IncrementNode(new NameNode("x")),
      new PassNode("Decrement y"),
      new DecrementNode(new NameNode("y")),
      new PassNode("Test that x is 2 and y is -3"),
      new AssertNode(new NameNode("x"), new NumberNode(2)),
      new AssertNode(new NameNode("y"), new MinusNode(new NumberNode(3)))
    ];
    return new YuiExample(
      "variables",
      "Basic variable definition and increment/decrement",
      new BlockNode(statements, true)
    );
  }
  function exampleLoop() {
    const statements = [
      new PassNode("Loop 10 times and break at 5"),
      new AssignmentNode(new NameNode("count"), new NumberNode(0)),
      new RepeatNode(
        new NumberNode(10),
        new BlockNode([
          new IncrementNode(new NameNode("count")),
          new IfNode(
            new NameNode("count"),
            "==",
            new NumberNode(5),
            new BlockNode(new BreakNode())
          )
        ])
      ),
      new PassNode("Test that count is 5"),
      new AssertNode(new NameNode("count"), new NumberNode(5))
    ];
    return new YuiExample(
      "loop",
      "Loop 10 times and break at 5",
      new BlockNode(statements, true)
    );
  }
  function exampleNestedConditionalBranches() {
    const thenBlock = new IncrementNode(new NameNode("y"));
    const elseBlock = new IncrementNode(new NameNode("z"));
    const statements = [
      new PassNode("Test nested conditions on x and y"),
      new AssignmentNode(new NameNode("x"), new NumberNode(1)),
      new AssignmentNode(new NameNode("y"), new NumberNode(2)),
      new AssignmentNode(new NameNode("z"), new NumberNode(3)),
      new PassNode("If x is 0, check y and increment y or z accordingly"),
      new IfNode(
        new NameNode("x"),
        "==",
        new NumberNode(0),
        new BlockNode(new IfNode(new NameNode("y"), "==", new NumberNode(1), thenBlock, elseBlock)),
        new BlockNode(new IfNode(new NameNode("y"), "==", new NumberNode(2), thenBlock, elseBlock))
      ),
      new PassNode("Test that y was incremented and z was not"),
      new AssertNode(new NameNode("y"), new NumberNode(3))
    ];
    return new YuiExample(
      "nested_conditional_branches",
      "Nested conditional branching",
      new BlockNode(statements, true)
    );
  }
  function exampleComparisons() {
    const thenBlock = new IncrementNode(new NameNode("y"));
    const elseBlock = new IncrementNode(new NameNode("z"));
    const statements = [
      new PassNode("Various comparisons on x"),
      new AssignmentNode(new NameNode("x"), new NumberNode(1)),
      new AssignmentNode(new NameNode("y"), new NumberNode(0)),
      new AssignmentNode(new NameNode("z"), new NumberNode(0)),
      new PassNode("Is x equal to 1?"),
      new IfNode(new NameNode("x"), "==", new NumberNode(1), thenBlock, elseBlock),
      new PassNode("Is x not equal to 1?"),
      new IfNode(new NameNode("x"), "!=", new NumberNode(1), thenBlock, elseBlock),
      new PassNode("Is x less than 1?"),
      new IfNode(new NameNode("x"), "<", new NumberNode(1), thenBlock, elseBlock),
      new PassNode("Is x greater than 1?"),
      new IfNode(new NameNode("x"), ">", new NumberNode(1), thenBlock, elseBlock),
      new PassNode("Is x less than or equal to 1?"),
      new IfNode(new NameNode("x"), "<=", new NumberNode(1), thenBlock, elseBlock),
      new PassNode("Is x greater than or equal to 1?"),
      new IfNode(new NameNode("x"), ">=", new NumberNode(1), thenBlock, elseBlock),
      new PassNode("Test that all conditions were evaluated correctly"),
      new AssertNode(new NameNode("y"), new NumberNode(3)),
      new AssertNode(new NameNode("z"), new NumberNode(3))
    ];
    return new YuiExample(
      "comparisons",
      "Comparison operations",
      new BlockNode(statements, true)
    );
  }
  function exampleArray() {
    const statements = [
      new PassNode("Create an array A with elements 1, 2, 3"),
      new AssignmentNode(
        new NameNode("A"),
        new ArrayNode([new NumberNode(1), new NumberNode(2), new NumberNode(3)])
      ),
      new PassNode("Append 0 to the end of A"),
      new AppendNode(new NameNode("A"), new NumberNode(0)),
      new PassNode("Increment the first element of A"),
      new IncrementNode(new GetIndexNode(new NameNode("A"), new NumberNode(0))),
      new PassNode("If 2 is in A, set the first element to the fourth element"),
      new IfNode(
        new NumberNode(2),
        "in",
        new NameNode("A"),
        new AssignmentNode(
          new GetIndexNode(new NameNode("A"), new NumberNode(0)),
          new GetIndexNode(new NameNode("A"), new NumberNode(3))
        )
      ),
      new PassNode("Test that the array has 4 elements"),
      new AssertNode(new ArrayLenNode(new NameNode("A")), new NumberNode(4))
    ];
    return new YuiExample(
      "array",
      "Array creation and element manipulation",
      new BlockNode(statements, true)
    );
  }
  function exampleStrings() {
    const statements = [
      new PassNode("Create a string s with value 'hello'"),
      new AssignmentNode(new NameNode("s"), new StringNode("hello")),
      new PassNode("Set the first character of s to 'H'"),
      new PassNode("Note: strings are just the array of character codes. So we can manipulate them like arrays."),
      new AssignmentNode(
        new GetIndexNode(new NameNode("s"), new NumberNode(0)),
        new GetIndexNode(new StringNode("H"), new NumberNode(0))
      ),
      new PassNode('Append " world" to s'),
      new AssignmentNode(new NameNode("t"), new StringNode(" world")),
      new AssignmentNode(new NameNode("i"), new NumberNode(0)),
      new RepeatNode(new ArrayLenNode(new NameNode("t")), new BlockNode([
        new AppendNode(new NameNode("s"), new GetIndexNode(new NameNode("t"), new NameNode("i"))),
        new IncrementNode(new NameNode("i"))
      ])),
      new PassNode("Test that s is now 'Hello world'"),
      new AssertNode(new NameNode("s"), new StringNode("Hello world"))
    ];
    return new YuiExample(
      "strings",
      "String creation and manipulation",
      new BlockNode(statements, true)
    );
  }
  function exampleObjects() {
    const statements = [
      new PassNode("Create an object O with properties x and y"),
      new AssignmentNode(new NameNode("O"), new ObjectNode([
        new StringNode("x"),
        new NumberNode(0),
        new StringNode("y"),
        new NumberNode(0)
      ])),
      new PassNode("Set the x property of O to 1"),
      new AssignmentNode(
        new GetIndexNode(new NameNode("O"), new StringNode("x")),
        new NumberNode(1)
      ),
      new PassNode("Set the y property of O to 2"),
      new AssignmentNode(
        new GetIndexNode(new NameNode("O"), new StringNode("y")),
        new NumberNode(2)
      ),
      new PassNode("Test that O has properties x=1 and y=2"),
      new AssertNode(new GetIndexNode(new NameNode("O"), new StringNode("x")), new NumberNode(1)),
      new AssertNode(new GetIndexNode(new NameNode("O"), new StringNode("y")), new NumberNode(2))
    ];
    return new YuiExample(
      "objects",
      "Object creation and property manipulation",
      new BlockNode(statements, true)
    );
  }
  function exampleFunction() {
    const statements = [
      new PassNode("Define function that adds 1"),
      new FuncDefNode(
        new NameNode("succ"),
        [new NameNode("n")],
        new BlockNode([
          new IncrementNode(new NameNode("n")),
          new ReturnNode(new NameNode("n"))
        ])
      ),
      new AssignmentNode(
        new NameNode("result"),
        new FuncAppNode(new NameNode("succ"), [new NumberNode(0)])
      ),
      new AssertNode(new NameNode("result"), new NumberNode(1))
    ];
    return new YuiExample(
      "function",
      "Function definition and call (increment function)",
      new BlockNode(statements, true)
    );
  }
  function exampleFunctionNoArgument() {
    const statements = [
      new PassNode("Define function that returns 0"),
      new FuncDefNode(
        new NameNode("zero"),
        [],
        new BlockNode(new ReturnNode(new NumberNode(0)))
      ),
      new AssertNode(new FuncAppNode(new NameNode("zero"), []), new NumberNode(0))
    ];
    return new YuiExample(
      "function_no_argument",
      "Function definition and call (zero-argument function)",
      new BlockNode(statements, true)
    );
  }
  function exampleFunctionWithoutReturn() {
    const statements = [
      new PassNode("Define function that creates a point object"),
      new FuncDefNode(
        new NameNode("point"),
        [new NameNode("x"), new NameNode("y")],
        new BlockNode([
          new PassNode("If function does not return anything, return the local environment as an object")
        ])
      ),
      new AssignmentNode(
        new NameNode("O"),
        new FuncAppNode(new NameNode("point"), [new NumberNode(0), new NumberNode(0)])
      ),
      new AssertNode(new GetIndexNode(new NameNode("O"), new StringNode("x")), new NumberNode(0))
    ];
    return new YuiExample(
      "function_without_return",
      "Function definition and call (function without return value)",
      new BlockNode(statements, true)
    );
  }
  function exampleRecursiveFunction() {
    const statements = [
      new PassNode("Define recursive function that computes factorial"),
      new FuncDefNode(
        new NameNode("fact"),
        [new NameNode("n")],
        new BlockNode([
          new IfNode(
            new NameNode("n"),
            "==",
            new NumberNode(0),
            new BlockNode([new ReturnNode(new NumberNode(1))]),
            new BlockNode([
              new PassNode("Yui does not have arithmetic operators."),
              new ReturnNode(new FuncAppNode(new NameNode("multiplex"), [
                new NameNode("n"),
                new FuncAppNode(new NameNode("fact"), [
                  new FuncAppNode(new NameNode("decrease"), [new NameNode("n")])
                ])
              ]))
            ])
          )
        ])
      ),
      new PassNode("multiplex(a, b) function for a * b."),
      new FuncDefNode(
        new NameNode("multiplex"),
        [new NameNode("a"), new NameNode("b")],
        new BlockNode([
          new AssignmentNode(new NameNode("result"), new NumberNode(0)),
          new RepeatNode(new NameNode("b"), new BlockNode([
            new RepeatNode(new NameNode("a"), new BlockNode([
              new IncrementNode(new NameNode("result"))
            ]))
          ])),
          new ReturnNode(new NameNode("result"))
        ])
      ),
      new PassNode("decrease(n) function for n-1."),
      new FuncDefNode(
        new NameNode("decrease"),
        [new NameNode("n")],
        new BlockNode([
          new DecrementNode(new NameNode("n")),
          new ReturnNode(new NameNode("n"))
        ])
      ),
      new PassNode("Test fact(0) is 1"),
      new AssertNode(new FuncAppNode(new NameNode("fact"), [new NumberNode(0)]), new NumberNode(1)),
      new PassNode("Test that fact(5) is 120"),
      new AssertNode(new FuncAppNode(new NameNode("fact"), [new NumberNode(5)]), new NumberNode(120))
    ];
    return new YuiExample(
      "recursive_function",
      "Recursive function definition and call (factorial function)",
      new BlockNode(statements, true)
    );
  }
  function exampleFloatAdd() {
    const statements = [
      new PassNode("float format: [sign, d1..d7]  sign=1 or -1, d1..d7 = abs(x)*1e6 digits"),
      new PassNode("float_add(a, b): add two same-sign float arrays (no stdlib)"),
      new FuncDefNode(
        new NameNode("float_add"),
        [new NameNode("a"), new NameNode("b")],
        new BlockNode([
          new AssignmentNode(new NameNode("result"), new ArrayNode([
            new GetIndexNode(new NameNode("a"), new NumberNode(0)),
            new NumberNode(0),
            new NumberNode(0),
            new NumberNode(0),
            new NumberNode(0),
            new NumberNode(0),
            new NumberNode(0),
            new NumberNode(0)
          ])),
          new AssignmentNode(new NameNode("carry"), new NumberNode(0)),
          new AssignmentNode(new NameNode("i"), new NumberNode(7)),
          new RepeatNode(new NumberNode(7), new BlockNode([
            new AssignmentNode(new NameNode("sum"), new NameNode("carry")),
            new RepeatNode(
              new GetIndexNode(new NameNode("a"), new NameNode("i")),
              new BlockNode([new IncrementNode(new NameNode("sum"))])
            ),
            new RepeatNode(
              new GetIndexNode(new NameNode("b"), new NameNode("i")),
              new BlockNode([new IncrementNode(new NameNode("sum"))])
            ),
            new AssignmentNode(new NameNode("carry"), new NumberNode(0)),
            new IfNode(new NameNode("sum"), ">=", new NumberNode(10), new BlockNode([
              new IncrementNode(new NameNode("carry")),
              new RepeatNode(new NumberNode(10), new BlockNode([
                new DecrementNode(new NameNode("sum"))
              ]))
            ])),
            new AssignmentNode(
              new GetIndexNode(new NameNode("result"), new NameNode("i")),
              new NameNode("sum")
            ),
            new DecrementNode(new NameNode("i"))
          ])),
          new ReturnNode(new NameNode("result"))
        ])
      ),
      new PassNode("3.14 + 2.50 = 5.64"),
      new AssignmentNode(new NameNode("a"), new ArrayNode([
        new NumberNode(1),
        new NumberNode(3),
        new NumberNode(1),
        new NumberNode(4),
        new NumberNode(0),
        new NumberNode(0),
        new NumberNode(0),
        new NumberNode(0)
      ])),
      new AssignmentNode(new NameNode("b"), new ArrayNode([
        new NumberNode(1),
        new NumberNode(2),
        new NumberNode(5),
        new NumberNode(0),
        new NumberNode(0),
        new NumberNode(0),
        new NumberNode(0),
        new NumberNode(0)
      ])),
      new AssignmentNode(
        new NameNode("c"),
        new FuncAppNode(new NameNode("float_add"), [new NameNode("a"), new NameNode("b")])
      ),
      new PassNode("c == [1, 5, 6, 4, 0, 0, 0, 0]  (5.640000)"),
      new AssertNode(new GetIndexNode(new NameNode("c"), new NumberNode(0)), new NumberNode(1)),
      new AssertNode(new GetIndexNode(new NameNode("c"), new NumberNode(1)), new NumberNode(5)),
      new AssertNode(new GetIndexNode(new NameNode("c"), new NumberNode(2)), new NumberNode(6)),
      new AssertNode(new GetIndexNode(new NameNode("c"), new NumberNode(3)), new NumberNode(4)),
      new AssertNode(new GetIndexNode(new NameNode("c"), new NumberNode(4)), new NumberNode(0)),
      new PassNode("1.99 + 1.01 = 3.00  (tests carry propagation)"),
      new AssignmentNode(new NameNode("a"), new ArrayNode([
        new NumberNode(1),
        new NumberNode(1),
        new NumberNode(9),
        new NumberNode(9),
        new NumberNode(0),
        new NumberNode(0),
        new NumberNode(0),
        new NumberNode(0)
      ])),
      new AssignmentNode(new NameNode("b"), new ArrayNode([
        new NumberNode(1),
        new NumberNode(1),
        new NumberNode(0),
        new NumberNode(1),
        new NumberNode(0),
        new NumberNode(0),
        new NumberNode(0),
        new NumberNode(0)
      ])),
      new AssignmentNode(
        new NameNode("c"),
        new FuncAppNode(new NameNode("float_add"), [new NameNode("a"), new NameNode("b")])
      ),
      new PassNode("c == [1, 3, 0, 0, 0, 0, 0, 0]  (3.000000)"),
      new AssertNode(new GetIndexNode(new NameNode("c"), new NumberNode(1)), new NumberNode(3)),
      new AssertNode(new GetIndexNode(new NameNode("c"), new NumberNode(2)), new NumberNode(0)),
      new AssertNode(new GetIndexNode(new NameNode("c"), new NumberNode(3)), new NumberNode(0))
    ];
    return new YuiExample(
      "float_add",
      "Add two same-sign floats as digit arrays (no stdlib)",
      new BlockNode(statements, true)
    );
  }
  function exampleNullAssignment() {
    const statements = [
      new PassNode("Assign null to a variable"),
      new AssignmentNode(new NameNode("x"), new ConstNode(null)),
      new PassNode("Test that x is null"),
      new AssertNode(new NameNode("x"), new ConstNode(null))
    ];
    return new YuiExample(
      "null_assignment",
      "Assign null to a variable and compare",
      new BlockNode(statements, true)
    );
  }
  function exampleBooleanAssignment() {
    const statements = [
      new PassNode("Assign true and false to variables"),
      new AssignmentNode(new NameNode("t"), new ConstNode(true)),
      new AssignmentNode(new NameNode("f"), new ConstNode(false)),
      new PassNode("Test that t is true and f is false"),
      new AssertNode(new NameNode("t"), new ConstNode(true)),
      new AssertNode(new NameNode("f"), new ConstNode(false))
    ];
    return new YuiExample(
      "boolean_assignment",
      "Assign true/false to variables and compare",
      new BlockNode(statements, true)
    );
  }
  function exampleBooleanBranch() {
    const statements = [
      new PassNode("Branch on a boolean value"),
      new AssignmentNode(new NameNode("flag"), new ConstNode(true)),
      new AssignmentNode(new NameNode("result"), new NumberNode(0)),
      new IfNode(
        new NameNode("flag"),
        "==",
        new ConstNode(true),
        new BlockNode(new AssignmentNode(new NameNode("result"), new NumberNode(1))),
        new BlockNode(new AssignmentNode(new NameNode("result"), new NumberNode(2)))
      ),
      new PassNode("Test that result is 1 because flag was true"),
      new AssertNode(new NameNode("result"), new NumberNode(1))
    ];
    return new YuiExample(
      "boolean_branch",
      "Conditional branch based on a boolean value",
      new BlockNode(statements, true)
    );
  }
  function exampleNullCheck() {
    const statements = [
      new PassNode("Define is_null function"),
      new FuncDefNode(
        new NameNode("is_null"),
        [new NameNode("v")],
        new BlockNode([
          new IfNode(
            new NameNode("v"),
            "==",
            new ConstNode(null),
            new BlockNode(new ReturnNode(new ConstNode(true))),
            new BlockNode(new ReturnNode(new ConstNode(false)))
          )
        ])
      ),
      new PassNode("Test is_null with null and non-null values"),
      new AssertNode(new FuncAppNode(new NameNode("is_null"), [new ConstNode(null)]), new ConstNode(true)),
      new AssertNode(new FuncAppNode(new NameNode("is_null"), [new NumberNode(0)]), new ConstNode(false)),
      new AssertNode(new FuncAppNode(new NameNode("is_null"), [new StringNode("")]), new ConstNode(false))
    ];
    return new YuiExample(
      "null_check",
      "Function that checks if a value is null",
      new BlockNode(statements, true)
    );
  }
  function getAllExamples() {
    return [
      exampleHelloWorld(),
      exampleVariables(),
      exampleLoop(),
      exampleNestedConditionalBranches(),
      exampleComparisons(),
      exampleArray(),
      exampleStrings(),
      exampleObjects(),
      exampleFunction(),
      exampleFunctionNoArgument(),
      exampleFunctionWithoutReturn(),
      exampleRecursiveFunction(),
      exampleFloatAdd(),
      exampleNullAssignment(),
      exampleBooleanAssignment(),
      exampleBooleanBranch(),
      exampleNullCheck()
    ];
  }
  return __toCommonJS(browser_entry_exports);
})();

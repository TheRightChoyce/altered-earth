"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheHydraRenderer__factory = exports.TheHydraDataStore__factory = exports.TheHydra__factory = exports.Owned__factory = exports.ITheHydraRenderer__factory = exports.ITheHydraDataStore__factory = exports.ITheHydra__factory = exports.IExquisiteGraphics__factory = exports.ExquisiteGraphics__factory = exports.ERC721TokenReceiver__factory = exports.ERC721__factory = exports.factories = void 0;
exports.factories = __importStar(require("./factories"));
var ERC721__factory_1 = require("./factories/ERC721.sol/ERC721__factory");
Object.defineProperty(exports, "ERC721__factory", { enumerable: true, get: function () { return ERC721__factory_1.ERC721__factory; } });
var ERC721TokenReceiver__factory_1 = require("./factories/ERC721.sol/ERC721TokenReceiver__factory");
Object.defineProperty(exports, "ERC721TokenReceiver__factory", { enumerable: true, get: function () { return ERC721TokenReceiver__factory_1.ERC721TokenReceiver__factory; } });
var ExquisiteGraphics__factory_1 = require("./factories/ExquisiteGraphics.mock.sol/ExquisiteGraphics__factory");
Object.defineProperty(exports, "ExquisiteGraphics__factory", { enumerable: true, get: function () { return ExquisiteGraphics__factory_1.ExquisiteGraphics__factory; } });
var IExquisiteGraphics__factory_1 = require("./factories/IExquisiteGraphics__factory");
Object.defineProperty(exports, "IExquisiteGraphics__factory", { enumerable: true, get: function () { return IExquisiteGraphics__factory_1.IExquisiteGraphics__factory; } });
var ITheHydra__factory_1 = require("./factories/ITheHydra__factory");
Object.defineProperty(exports, "ITheHydra__factory", { enumerable: true, get: function () { return ITheHydra__factory_1.ITheHydra__factory; } });
var ITheHydraDataStore__factory_1 = require("./factories/ITheHydraDataStore__factory");
Object.defineProperty(exports, "ITheHydraDataStore__factory", { enumerable: true, get: function () { return ITheHydraDataStore__factory_1.ITheHydraDataStore__factory; } });
var ITheHydraRenderer__factory_1 = require("./factories/ITheHydraRenderer__factory");
Object.defineProperty(exports, "ITheHydraRenderer__factory", { enumerable: true, get: function () { return ITheHydraRenderer__factory_1.ITheHydraRenderer__factory; } });
var Owned__factory_1 = require("./factories/Owned__factory");
Object.defineProperty(exports, "Owned__factory", { enumerable: true, get: function () { return Owned__factory_1.Owned__factory; } });
var TheHydra__factory_1 = require("./factories/TheHydra__factory");
Object.defineProperty(exports, "TheHydra__factory", { enumerable: true, get: function () { return TheHydra__factory_1.TheHydra__factory; } });
var TheHydraDataStore__factory_1 = require("./factories/TheHydraDataStore__factory");
Object.defineProperty(exports, "TheHydraDataStore__factory", { enumerable: true, get: function () { return TheHydraDataStore__factory_1.TheHydraDataStore__factory; } });
var TheHydraRenderer__factory_1 = require("./factories/TheHydraRenderer__factory");
Object.defineProperty(exports, "TheHydraRenderer__factory", { enumerable: true, get: function () { return TheHydraRenderer__factory_1.TheHydraRenderer__factory; } });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheHydraRenderer__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_theHydra",
                type: "address",
            },
            {
                internalType: "address",
                name: "_theHydraDataStore",
                type: "address",
            },
            {
                internalType: "address",
                name: "_xqstgfx",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "dataStore",
        outputs: [
            {
                internalType: "contract ITheHydraDataStore",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getOnChainSVG",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getOnChainSVG_AsBase64",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "renderSVG",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "renderSVG_AsString",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "theHydra",
        outputs: [
            {
                internalType: "contract ITheHydra",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "_renderType",
                type: "string",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "xqstgfx",
        outputs: [
            {
                internalType: "contract IExquisiteGraphics",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506040516200142c3803806200142c8339810160408190526100319161008f565b600080546001600160a01b039485166001600160a01b0319918216179091556001805493851693821693909317909255600280549190931691161790556100d2565b80516001600160a01b038116811461008a57600080fd5b919050565b6000806000606084860312156100a457600080fd5b6100ad84610073565b92506100bb60208501610073565b91506100c960408501610073565b90509250925092565b61134a80620000e26000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063660d0d6711610066578063660d0d671461010e578063a388fd9214610121578063c87b56dd14610134578063d689c59214610147578063e88741691461015a57600080fd5b80633289f1b9146100985780633d1acdb4146100c857806341dcf454146100e85780634eaa5b88146100fb575b600080fd5b6000546100ab906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100db6100d6366004610bd4565b61016d565b6040516100bf9190610cac565b6100db6100f6366004610cbf565b61017e565b6100db610109366004610d3b565b610227565b6001546100ab906001600160a01b031681565b6100db61012f366004610bd4565b610324565b6100db610142366004610d3b565b6103eb565b6100db610155366004610d3b565b6107b8565b6002546100ab906001600160a01b031681565b606061017882610324565b92915050565b60015460408051638db1abb560e01b815290516060926001600160a01b031691638db1abb59160048083019260009291908290030181865afa1580156101c8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101f09190810190610d84565b83836101fb8761083a565b60405160200161020e9493929190610de9565b60405160208183030381529060405290505b9392505050565b60015460405163b4e169cb60e01b8152600481018390526060916000916001600160a01b039091169063b4e169cb90602401600060405180830381865afa158015610276573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261029e9190810190610d84565b905060006102ab82610324565b604080516208006081018252620800408152600060209182019081528251808401909352601a83527f646174613a696d6167652f7376672b786d6c3b6261736536342c0000000000009183019190915291925061030990829061093b565b61031c610315836109ca565b829061093b565b949350505050565b600254604051630a19259560e01b81526060916000916001600160a01b0390911690630a1925959061035a908690600401610cac565b600060405180830381865afa158015610377573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261039f9190810190610d84565b604080516208006081019091526208004081526000602090910181815291925050610220826040516020016103d49190610e24565b60408051601f19818403018152919052829061093b565b6000546040805163ad156f7760e01b815290516060926001600160a01b03169163ad156f779160048083019260209291908290030181865afa158015610435573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104599190610f61565b82101561050b57600160009054906101000a90046001600160a01b03166001600160a01b0316638db1abb56040518163ffffffff1660e01b8152600401600060405180830381865afa1580156104b3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104db9190810190610d84565b6104e48361083a565b6040516020016104f5929190610f7a565b6040516020818303038152906040529050919050565b60008054604051633b6f14e960e21b8152600481018590526001600160a01b039091169063edbc53a490602401602060405180830381865afa158015610555573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105799190610f61565b905060006105868261083a565b60015460405163b4e169cb60e01b8152600481018590529192506000916001600160a01b039091169063b4e169cb90602401600060405180830381865afa1580156105d5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105fd9190810190610d84565b9050600061060a82610324565b604080516210006081018252621000408152600060209182019081528251808401909352601a83527f646174613a696d6167652f7376672b786d6c3b6261736536342c0000000000009183019190915291925061066890829061093b565b610674610315836109ca565b604080516210006080820183526210004080835260006020938401818152855193840190955290825291019081526107616106ae8a61083a565b8761072c60008054906101000a90046001600160a01b03166001600160a01b03166354a343d86040518163ffffffff1660e01b8152600401602060405180830381865afa158015610703573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107279190610f61565b61083a565b866107368e61083a565b60405160200161074a959493929190610fa9565b60408051601f19818403018152919052839061093b565b60408051808201909152601d81527f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c00000060208201526107a090829061093b565b6107ac610315836109ca565b98975050505050505050565b60015460405163b4e169cb60e01b8152600481018390526060916000916001600160a01b039091169063b4e169cb90602401600060405180830381865afa158015610807573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261082f9190810190610d84565b90506102208161016d565b6060816000036108615750506040805180820190915260018152600360fc1b602082015290565b8160005b811561088b578061087581611242565b91506108849050600a83611271565b9150610865565b60008167ffffffffffffffff8111156108a6576108a6610b65565b6040519080825280601f01601f1916602001820160405280156108d0576020820181803683370190505b5090505b841561031c576108e5600183611285565b91506108f2600a8661129c565b6108fd9060306112b0565b60f81b818381518110610912576109126112c8565b60200101906001600160f81b031916908160001a905350610934600a86611271565b94506108d4565b601f1982015182518251603f1990920191829061095890836112b0565b11156109ba5760405162461bcd60e51b815260206004820152602760248201527f44796e616d69634275666665723a20417070656e64696e67206f7574206f66206044820152663137bab732399760c91b606482015260840160405180910390fd5b6109c48484610b2f565b50505050565b606081516000036109e957505060408051602081019091526000815290565b60006040518060600160405280604081526020016112fe6040913990506000600384516002610a1891906112b0565b610a229190611271565b610a2d9060046112de565b90506000610a3c8260206112b0565b67ffffffffffffffff811115610a5457610a54610b65565b6040519080825280601f01601f191660200182016040528015610a7e576020820181803683370190505b509050818152600183018586518101602084015b81831015610aea576003830192508251603f8160121c168501518253600182019150603f81600c1c168501518253600182019150603f8160061c168501518253600182019150603f8116850151825350600101610a92565b600389510660018114610b045760028114610b1557610b21565b613d3d60f01b600119830152610b21565b603d60f81b6000198301525b509398975050505050505050565b8051602082019150808201602084510184015b81841015610b5a578351815260209384019301610b42565b505082510190915250565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610ba457610ba4610b65565b604052919050565b600067ffffffffffffffff821115610bc657610bc6610b65565b50601f01601f191660200190565b600060208284031215610be657600080fd5b813567ffffffffffffffff811115610bfd57600080fd5b8201601f81018413610c0e57600080fd5b8035610c21610c1c82610bac565b610b7b565b818152856020838501011115610c3657600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015610c6f578181015183820152602001610c57565b838111156109c45750506000910152565b60008151808452610c98816020860160208601610c54565b601f01601f19169290920160200192915050565b6020815260006102206020830184610c80565b600080600060408486031215610cd457600080fd5b83359250602084013567ffffffffffffffff80821115610cf357600080fd5b818601915086601f830112610d0757600080fd5b813581811115610d1657600080fd5b876020828501011115610d2857600080fd5b6020830194508093505050509250925092565b600060208284031215610d4d57600080fd5b5035919050565b6000610d62610c1c84610bac565b9050828152838383011115610d7657600080fd5b610220836020830184610c54565b600060208284031215610d9657600080fd5b815167ffffffffffffffff811115610dad57600080fd5b8201601f81018413610dbe57600080fd5b61031c84825160208401610d54565b60008151610ddf818560208601610c54565b9290920192915050565b60008551610dfb818460208a01610c54565b82018486823760009085019081528351610e19818360208801610c54565b019695505050505050565b7f3c73766720786d6c6e733d22687474703a2f2f7777772e77332e6f72672f323081527f30302f737667222073686170652d72656e646572696e673d226372697370456460208201527f676573222077696474683d223130302522206865696768743d2231303025222060408201527f76657273696f6e3d22312e31222076696577426f783d2230203020313238203160608201527f3238222066696c6c3d2223666666223e3c726563742077696474683d2231323860808201527f22206865696768743d22313238222066696c6c3d222366666622202f3e3c672060a08201527f7472616e73666f726d3d227472616e736c6174652833322c333229223e00000060c082015260008251610f408160dd850160208701610c54565b691e17b39f1e17b9bb339f60b11b60dd93909101928301525060e701919050565b600060208284031215610f7357600080fd5b5051919050565b60008351610f8c818460208801610c54565b835190830190610fa0818360208801610c54565b01949350505050565b7f7b2273796d626f6c223a22414c5445524544222c226e616d65223a22546865208152664879647261202360c81b602082015260008651610ff1816027850160208b01610c54565b7f222c226465736372697074696f6e223a22412066756c6c79206f6e2d636861696027918401918201527f6e2065646974696f6e206f6620546865204879647261202300000000000000006047820152865161105481605f840160208b01610c54565b6c0171022b234ba34b7b71037b31609d1b605f9290910191820152855161108281606c840160208a01610c54565b7f2e20456163682065646974696f6e206973203634783634707820696e2073697a606c92909101918201527f6520776974682061203332707820626f726465722c20363420636f6c6f72732c608c8201527f20616e642073746f726564206f6e2074686520457468657265756d20626c6f6360ac8201527f6b636861696e20666f72657665722e222c22696d616765223a2200000000000060cc8201526107ac61118361117d61113560e6850189610dcd565b7f222c2265787465726e616c5f75726c223a2268747470733a2f2f616c74657265815275642d65617274682e78797a2f7468652d68796472612f60501b602082015260360190565b86610dcd565b7f222c2261747472696275746573223a5b7b2274726169745f74797065223a225381527f697a65222c2276616c7565223a2236347836347078227d2c7b2274726169745f60208201527f74797065223a22426f72646572222c2276616c7565223a2233327078227d2c7b60408201527f2274726169745f74797065223a22436f6c6f7273222c2276616c7565223a223660608201526434227d5d7d60d81b608082015260850190565b634e487b7160e01b600052601160045260246000fd5b6000600182016112545761125461122c565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826112805761128061125b565b500490565b6000828210156112975761129761122c565b500390565b6000826112ab576112ab61125b565b500690565b600082198211156112c3576112c361122c565b500190565b634e487b7160e01b600052603260045260246000fd5b60008160001904831182151516156112f8576112f861122c565b50029056fe4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa164736f6c634300080d000a";
const isSuperArgs = (xs) => xs.length > 1;
class TheHydraRenderer__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_theHydra, _theHydraDataStore, _xqstgfx, overrides) {
        return super.deploy(_theHydra, _theHydraDataStore, _xqstgfx, overrides || {});
    }
    getDeployTransaction(_theHydra, _theHydraDataStore, _xqstgfx, overrides) {
        return super.getDeployTransaction(_theHydra, _theHydraDataStore, _xqstgfx, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.TheHydraRenderer__factory = TheHydraRenderer__factory;
TheHydraRenderer__factory.bytecode = _bytecode;
TheHydraRenderer__factory.abi = _abi;

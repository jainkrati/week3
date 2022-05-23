//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Mastermind Variation Test", function () {
    this.timeout(100000000);

    it("Should calculate the correct output hash", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        const INPUT = {
            pubGuessA : 0,
            pubGuessB : 1,
            pubGuessC : 2, 
            pubGuessD : 3,  
            pubNumHit : 4, 
            pubNumBlow : 0, 
            pubSolnHash : "4046572753705156516533877115157892344525214496218946562836800000520730329639",

            privSolnA : 0,
            privSolnB : 1,
            privSolnC : 2,
            privSolnD : 3,
            privSalt : 0
        };

        const witness = await circuit.calculateWitness(INPUT, true);

        // console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e("4046572753705156516533877115157892344525214496218946562836800000520730329639")));
    });
});
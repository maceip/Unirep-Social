"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TREE_DEPTHS_CONFIG = exports.DEFAULT_ATTESTING_FEE = exports.DEFAULT_EPOCH_LENGTH = exports.DEFAULT_NUM_ATTESTATIONS_PER_EPOCH_KEY = exports.DEFAULT_MAX_EPOCH_KEY_NONCE = exports.DEFAULT_START_BLOCK = exports.DEFAULT_ETH_PROVIDER = void 0;
const unirep_1 = require("@unirep/unirep");
const DEFAULT_ETH_PROVIDER = 'http://localhost:8545';
exports.DEFAULT_ETH_PROVIDER = DEFAULT_ETH_PROVIDER;
const DEFAULT_START_BLOCK = 0;
exports.DEFAULT_START_BLOCK = DEFAULT_START_BLOCK;
const DEFAULT_MAX_EPOCH_KEY_NONCE = unirep_1.numEpochKeyNoncePerEpoch;
exports.DEFAULT_MAX_EPOCH_KEY_NONCE = DEFAULT_MAX_EPOCH_KEY_NONCE;
const DEFAULT_NUM_ATTESTATIONS_PER_EPOCH_KEY = unirep_1.numAttestationsPerEpochKey;
exports.DEFAULT_NUM_ATTESTATIONS_PER_EPOCH_KEY = DEFAULT_NUM_ATTESTATIONS_PER_EPOCH_KEY;
const DEFAULT_EPOCH_LENGTH = unirep_1.epochLength;
exports.DEFAULT_EPOCH_LENGTH = DEFAULT_EPOCH_LENGTH;
const DEFAULT_ATTESTING_FEE = unirep_1.attestingFee;
exports.DEFAULT_ATTESTING_FEE = DEFAULT_ATTESTING_FEE;
const DEFAULT_TREE_DEPTHS_CONFIG = 'circuit';
exports.DEFAULT_TREE_DEPTHS_CONFIG = DEFAULT_TREE_DEPTHS_CONFIG;
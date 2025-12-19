import type { Abi } from "viem";

export const MessagingV2ABI: Abi = [
    {
      inputs: [
        {
          internalType: 'uint24',
          name: 'chainSelector',
          type: 'uint24',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'validatorLib',
          type: 'address',
        },
      ],
      name: 'DuplicateValidatorLib',
      type: 'error',
    },
    {
      inputs: [],
      name: 'EmptyDstChainData',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FailedCall',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'balance',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'needed',
          type: 'uint256',
        },
      ],
      name: 'InsufficientBalance',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'provided',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'required',
          type: 'uint256',
        },
      ],
      name: 'InsufficientFee',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint24',
          name: 'received',
          type: 'uint24',
        },
        {
          internalType: 'uint24',
          name: 'expexted',
          type: 'uint24',
        },
      ],
      name: 'InvalidDstChainSelector',
      type: 'error',
    },
    {
      inputs: [],
      name: 'InvalidReceiver',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'validatorLibsCount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'validationsCount',
          type: 'uint256',
        },
      ],
      name: 'InvalidValidationsCount',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'validatorConfigsCount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'validatorLibsCount',
          type: 'uint256',
        },
      ],
      name: 'InvalidValidatorConfigsCount',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'messageHash',
          type: 'bytes32',
        },
      ],
      name: 'MessageAlreadyProcessed',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'messageSubmissionHash',
          type: 'bytes32',
        },
      ],
      name: 'MessageSubmissionAlreadyProcessed',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'messageId',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'messageSubmissionHash',
          type: 'bytes32',
        },
      ],
      name: 'MessageSubmissionAlreadyReceived',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'messageSubmossionHash',
          type: 'bytes32',
        },
      ],
      name: 'MessageSubmissionNotRetryable',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint8',
          name: 'bits',
          type: 'uint8',
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'SafeCastOverflowedUintDowncast',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
      ],
      name: 'SafeERC20FailedOperation',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'messageId',
          type: 'bytes32',
        },
      ],
      name: 'ConceroMessageDelivered',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'messageId',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'error',
          type: 'bytes',
        },
      ],
      name: 'ConceroMessageDeliveryFailed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'messageId',
          type: 'bytes32',
        },
        {
          components: [
            {
              internalType: 'uint256',
              name: 'relayer',
              type: 'uint256',
            },
            {
              internalType: 'uint256[]',
              name: 'validatorsFee',
              type: 'uint256[]',
            },
            {
              internalType: 'address',
              name: 'token',
              type: 'address',
            },
          ],
          indexed: false,
          internalType: 'struct IConceroRouter.Fee',
          name: 'fee',
          type: 'tuple',
        },
      ],
      name: 'ConceroMessageFeePaid',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'messageId',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'bytes[]',
          name: 'validations',
          type: 'bytes[]',
        },
        {
          indexed: false,
          internalType: 'address[]',
          name: 'validatorLibs',
          type: 'address[]',
        },
        {
          indexed: false,
          internalType: 'bool[]',
          name: 'validationChecks',
          type: 'bool[]',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'relayerLib',
          type: 'address',
        },
      ],
      name: 'ConceroMessageReceived',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'messageId',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'messageReceipt',
          type: 'bytes',
        },
        {
          indexed: false,
          internalType: 'address[]',
          name: 'validatorLibs',
          type: 'address[]',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'relayerLib',
          type: 'address',
        },
      ],
      name: 'ConceroMessageSent',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'messageId',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'bool[]',
          name: 'newValidationChecks',
          type: 'bool[]',
        },
      ],
      name: 'ConceroMessageSubmissionRetriedWithRevalidation',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'relayer',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'RelayerFeeWithdrawn',
      type: 'event',
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: 'uint24',
              name: 'dstChainSelector',
              type: 'uint24',
            },
            {
              internalType: 'uint64',
              name: 'srcBlockConfirmations',
              type: 'uint64',
            },
            {
              internalType: 'address',
              name: 'feeToken',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'relayerLib',
              type: 'address',
            },
            {
              internalType: 'address[]',
              name: 'validatorLibs',
              type: 'address[]',
            },
            {
              internalType: 'bytes[]',
              name: 'validatorConfigs',
              type: 'bytes[]',
            },
            {
              internalType: 'bytes',
              name: 'relayerConfig',
              type: 'bytes',
            },
            {
              internalType: 'bytes',
              name: 'dstChainData',
              type: 'bytes',
            },
            {
              internalType: 'bytes',
              name: 'payload',
              type: 'bytes',
            },
          ],
          internalType: 'struct IConceroRouter.MessageRequest',
          name: 'messageRequest',
          type: 'tuple',
        },
      ],
      name: 'conceroSend',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: 'uint24',
              name: 'dstChainSelector',
              type: 'uint24',
            },
            {
              internalType: 'uint64',
              name: 'srcBlockConfirmations',
              type: 'uint64',
            },
            {
              internalType: 'address',
              name: 'feeToken',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'relayerLib',
              type: 'address',
            },
            {
              internalType: 'address[]',
              name: 'validatorLibs',
              type: 'address[]',
            },
            {
              internalType: 'bytes[]',
              name: 'validatorConfigs',
              type: 'bytes[]',
            },
            {
              internalType: 'bytes',
              name: 'relayerConfig',
              type: 'bytes',
            },
            {
              internalType: 'bytes',
              name: 'dstChainData',
              type: 'bytes',
            },
            {
              internalType: 'bytes',
              name: 'payload',
              type: 'bytes',
            },
          ],
          internalType: 'struct IConceroRouter.MessageRequest',
          name: 'messageRequest',
          type: 'tuple',
        },
      ],
      name: 'getMessageFee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes',
          name: 'messageReceipt',
          type: 'bytes',
        },
        {
          internalType: 'address',
          name: 'relayerLib',
          type: 'address',
        },
        {
          internalType: 'address[]',
          name: 'validatorLibs',
          type: 'address[]',
        },
        {
          internalType: 'bool[]',
          name: 'validationChecks',
          type: 'bool[]',
        },
        {
          internalType: 'bytes[]',
          name: 'validations',
          type: 'bytes[]',
        },
      ],
      name: 'getMessageSubmissionHash',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'relayerLib',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'feeToken',
          type: 'address',
        },
      ],
      name: 'getRelayerFeeEarned',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'messageId',
          type: 'bytes32',
        },
      ],
      name: 'isMessageProcessed',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'messageId',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'messageSubmissionHash',
          type: 'bytes32',
        },
      ],
      name: 'isMessageSubmissionRetryable',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: 'bytes',
              name: 'messageReceipt',
              type: 'bytes',
            },
            {
              internalType: 'address[]',
              name: 'validatorLibs',
              type: 'address[]',
            },
            {
              internalType: 'bytes[]',
              name: 'validations',
              type: 'bytes[]',
            },
            {
              internalType: 'bool[]',
              name: 'validationChecks',
              type: 'bool[]',
            },
            {
              internalType: 'address',
              name: 'relayerLib',
              type: 'address',
            },
          ],
          internalType: 'struct IConceroRouter.RetryMessageSubmissionParams',
          name: 'retryMessageSubmissionParams',
          type: 'tuple',
        },
        {
          internalType: 'uint32',
          name: 'gasLimitOverride',
          type: 'uint32',
        },
      ],
      name: 'retryMessageSubmission',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: 'bytes',
              name: 'messageReceipt',
              type: 'bytes',
            },
            {
              internalType: 'address[]',
              name: 'validatorLibs',
              type: 'address[]',
            },
            {
              internalType: 'bytes[]',
              name: 'validations',
              type: 'bytes[]',
            },
            {
              internalType: 'bool[]',
              name: 'validationChecks',
              type: 'bool[]',
            },
            {
              internalType: 'address',
              name: 'relayerLib',
              type: 'address',
            },
          ],
          internalType: 'struct IConceroRouter.RetryMessageSubmissionParams',
          name: 'retryMessageSubmissionParams',
          type: 'tuple',
        },
        {
          internalType: 'bytes[]',
          name: 'internalValidatorConfigsOverrides',
          type: 'bytes[]',
        },
        {
          internalType: 'uint32',
          name: 'gasLimitOverride',
          type: 'uint32',
        },
      ],
      name: 'retryMessageSubmissionWithRevalidation',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes',
          name: 'messageReceipt',
          type: 'bytes',
        },
        {
          internalType: 'bytes[]',
          name: 'validations',
          type: 'bytes[]',
        },
        {
          internalType: 'address[]',
          name: 'validatorLibs',
          type: 'address[]',
        },
        {
          internalType: 'address',
          name: 'relayerLib',
          type: 'address',
        },
      ],
      name: 'submitMessage',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'tokens',
          type: 'address[]',
        },
      ],
      name: 'withdrawRelayerFee',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ];
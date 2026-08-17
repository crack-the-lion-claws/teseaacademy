window.TESEA_CONFIG={
  apiBaseUrl:'',
  apiVersion:'v1',
  mode:'live',
  oauth:{
    google:{clientId:'',redirectUri:''},
    microsoft:{clientId:'',tenant:'common',redirectUri:''}
  },
  rafikiAi:{
    enabled: true,
    provider: 'custom',
    model: 'gemini-1.5-flash',
    endpoint: '/api/v1/ai/chat',
    maxTokens: 2048,
    temperature: 0.7
  },
  payment:{
    enabled: true,
    provider: 'azampay',
    mode: 'sandbox',
    currency: 'TZS',
    merchantId: '',
    publicKey: '',
    callbackUrl: '/api/v1/payments/webhook'
  }
};


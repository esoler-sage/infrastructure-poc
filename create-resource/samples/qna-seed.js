module.exports = [
  {
    id: 0,
    answer: 'You can change the default message if you use the QnAMakerDialog. See this for details: https://docs.botframework.com/en-us/azure-bot-service/templates/qnamaker/#navtitle',
    source: 'Custom Editorial',
    questions: [
      'How can I change the default message from QnA Maker?'
    ],
    metadata: []
  },
  {
    id: 0,
    answer: 'You can use our REST apis to manage your KB. See here for details: https://westus.dev.cognitive.microsoft.com/docs/services/58994a073d9e04097c7ba6fe/operations/58994a073d9e041ad42d9baa',
    source: 'Custom Editorial',
    questions: [
      'How do I programmatically update my KB?'
    ],
    metadata: [
      {
        name: 'category',
        value: 'api'
      }
    ]
  }
];
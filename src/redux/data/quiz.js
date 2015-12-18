// Fake an api request
export default {
  status: 200,
  meta: {
    baseUrl: 'http://localhost:8005'
  },
  data: {
    testNo: 4,
    wordList: [
      {
        word: 'accuse',
        fileName: 'accuse.mp3'
      },
      {
        word: 'acne',
        fileName: 'acne.mp3'
      },
      {
        word: 'anatomy',
        fileName: 'anatomy.mp3'
      }
    ]
  }

}

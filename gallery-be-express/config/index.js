module.exports = {
  jwt: {
    secretKey: 'sadkfljaslkxclvkjlkjwerLKDJLKJFmnsaf324085LKJD90798732HD',
    issuer: 'gallery-be-express',
    algorithm: 'HS256',
    subject: 'gallery-be-express',
    expiresIn: 60 * 3, // 기본 3분
    expiresInRemember: 60 * 60 * 24 * 6 // 기억하기 눌렀을 때 6일
  }
}

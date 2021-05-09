module.exports = {
  jwt: {
    secretKey: 'very secretKey very',
    issuer: 'VUE-NODE',
    algorithm: 'HS256',
    subject: 'VUE-NODE',
    expiresIn: 60 * 3, // 기본 3분
    expiresInRemember: 60 * 60 * 24 * 6 // 기억하기 눌렀을 때 6일
  }
}

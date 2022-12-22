const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  // 로그인시 실행
  // done 함수의 첫 번째 인수는 에러가 날 때 실행 두 번째 인수는 저장할 데이터
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 각 요청마다 실행함
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};

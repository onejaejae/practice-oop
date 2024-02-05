export const emailForm = (url: string) => {
  return `
    <style>div {  text-align:center } </style>
    <style>span {  color: #2e4257; font-size: 22px;  font-weight: 700; line-height: 42px; text-decoration: none solid rgb(51,153,0); text-align:left; font-family: ShopifySans, "Helvetica Neue", Helvetica, sans-serif; padding: 10px 0px; } </style><span>${'가입해주셔서 감사합니다.'}</span>
    <div></div>
    <style>h3 {  font-weight: 400; font-size: 16px; line-height: 24px; color: #2e4257; font-family: ShopifySans, "Helvetica Neue", Helvetica, sans-serif; } </style><h3>${'환영합니다'}</h3>
      <h3>${'아래의 링크를 클릭해 주시면 가입이 완료됩니다!'}
  </h3>
  <div></div>
  <style> { background-color: #7ab55c; border-radius: 4px; color: rgb(255, 255, 255); display: inline-block; font-family: sans-serif; font-size: 15px; text-align: center; text-decoration: none; text-size-adjust: none; color: white; border:0; border-radius:5px padding: 10px; }</style><a href=${url}>${'메일 인증하기'}
  </a>
    `;
};

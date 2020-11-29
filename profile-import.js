import profileDefault from './profile-default-export.js'

console.log(JSON.stringify(profileDefault))

import {profileNamed} from './profile-named-export.js'

console.log(JSON.stringify(profileNamed))

// 基本は名前付きで公開すればいいと思う
// $ node profile-import.js | jq
// {
//   "profile": [
//     {
//       "profile": {
//         "description": {
//           "bio": "現在は運用保守の仕事をしています。",
//           "website": "",
//           "location": "神奈川県在住 新丸子近辺"
//         },
//         "avatarMediaUrl": "https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
//       }
//     }
//   ]
// }
// [
//   {
//     "profile": {
//       "description": {
//         "bio": "現在は運用保守の仕事をしています。",
//         "website": "",
//         "location": "神奈川県在住 新丸子近辺"
//       },
//       "avatarMediaUrl": "https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
//     }
//   }
// ]

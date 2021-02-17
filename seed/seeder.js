// // const async = require("async")
// require("dotenv").config()
// const mongoose = require("mongoose")
// const db = require("../models")
// const bcrypt = require("bcryptjs")

// mongoose.connect("mongodb://localhost/clubhouse", {
//   // mongoose.connect(process.env.DB_URI, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// })

// const users = [
//   {
//     username: "Phoenix",
//     password: process.env.PW_ONE,
//     isMember: true,
//     isAdmin: true,
//   },
//   {
//     username: "MemberTest",
//     password: process.env.PW_TWO,
//     isMember: true,
//     isAdmin: false,
//   },
//   {
//     username: "NonMemberTest",
//     password: process.env.PW_THREE,
//     isMember: false,
//     isAdmin: false,
//   },
// ]
// const messages = [
//   {
//     title: "Mission",
//     text: "Horizon",
//   },
//   {
//     title: "Test1",
//     text:
//       "LongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTestLongMessageTest",
//   },
//   {
//     title: "Test2",
//     text: "Test",
//   },
//   {
//     title: "Test3",
//     text: "Test",
//   },
//   {
//     title: "Test4",
//     text: "Test",
//   },
//   {
//     title: "Test5",
//     text: "Test",
//   },
//   {
//     title: "Test6",
//     text: "Test",
//   },
//   {
//     title: "Test7",
//     text: "Test",
//   },
//   {
//     title: "Test8",
//     text: "Test",
//   },
//   {
//     title: "Test9",
//     text: "Test",
//   },
//   {
//     title: "Test10",
//     text: "Test",
//   },
//   {
//     title: "Test11",
//     text: "Test",
//   },
//   {
//     title: "Test12",
//     text: "Test",
//   },
//   {
//     title: "Test13",
//     text: "Test",
//   },
//   {
//     title: "Test14",
//     text: "Test",
//   },
// ]

// // function userCreate(username, password, isMember, isAdmin) {
// //   const user = new db.User({
// //     username: username,
// //     password: password,
// //     isMember: isMember,
// //     isAdmin: isAdmin,
// //   })

// //   user.save(function (err) {
// //     if (err) {
// //       console.log(err)
// //       return
// //     } else {
// //       console.log("New User: " + user.username)
// //       users.push(user)
// //     }
// //   })
// // }

// // function messageCreate(title, text, user) {
// //   messageDetails = {
// //     title: title,
// //     text: text,
// //     user: user,
// //   }

// //   const message = new db.Message(messageDetails)
// //   message.save(function (err) {
// //     if (err) {
// //       console.log(err)
// //       return
// //     }
// //     console.log("New Message: " + message)
// //     messages.push(message)
// //   })
// // }

// // function createUsers() {
// //   userCreate("Phoenix", bcrypt.hashSync(process.env.PW_ONE, 10), true, true)
// //   userCreate("MemberTest", bcrypt.hashSync(process.env.PW_TWO, 10), true, false)
// //   userCreate(
// //     "NonMemberTest",
// //     bcrypt.hashSync(process.env.PW_THREE, 10),
// //     false,
// //     false
// //   )
// // }

// // function createMessages() {
// //   console.log(users)
// //   messageCreate("Mission", "Horizon", users[0])
// //   messageCreate("Test", "1", users[0])
// //   messageCreate(
// //     "Test",
// //     "LongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPostLongPost",
// //     users[0]
// //   )
// //   messageCreate("Member", "Test", users[1])
// //   messageCreate("Member", "Test2", users[1])
// //   messageCreate("NonMember", "Test", users[2])
// //   messageCreate("Loyal", "Hope", users[0])
// //   messageCreate("Member", "Test3", users[1])
// //   messageCreate("Message", "Message", users[2])
// //   messageCreate("Message", "Message2", users[2])
// //   messageCreate("Another", "Message", users[0])
// //   messageCreate("Hello", "World", users[0])
// //   messageCreate("Hi again", "World", users[0])
// // }

// db.User.deleteMany({})
//   .then(() => db.Message.deleteMany({}))
//   .then(() => {
//     const resultIds = []
//     for (let i = 0; i < users.length; i++) {
//       db.User.create({
//         username: users[i].username,
//         password: bcrypt.hashSync(users[i].password, 10),
//         isMember: users[i].isMember,
//         isAdmin: users[i].isAdmin,
//       }).then(result => {
//         // const resultIds = []
//         for (let i = 0; i < result.length; i++) {
//           resultIds.push(result._id)
//         }
//       })
//     }
//   })
//   .then(resultIds => {
//     // db.User.find({}).then(res => {
//     console.log(resultIds, "RES")
//     //   const resultIds = []
//     //   for (let i = 0; i < result.length; i++) {
//     //     resultIds.push(result._id)
//     //   }
//     for (let i = 0; i < messages.length; i++) {
//       db.Message.create({
//         text: messages[i].text,
//         title: messages[i].title,
//         user: resultIds[Math.floor(Math.random() * resultIds.length)],
//       })
//     }
//   })
//   //   })
//   .then(results => {
//     setTimeout(() => {
//       mongoose.connection.close()
//     }, 5000)
//   })
//   //     if (err) {
//   //       console.log(err)
//   //     } else mongoose.connection.close()
//   //   }) // mongoose.connection.close()
//   // db.Message.create({
//   //   text: messages[i].text,
//   //   title: messages[i].title,
//   //   user: messages[i].user,
//   // })
//   // setTimeout(() => {
//   // createMessages()
//   // }, 5000)
//   //   })
//   //   .then(() => {
//   //     // mongoose.connection.close()
//   //   })
//   .catch(err => {
//     console.error(err)
//     process.exit(1)
//   })

// // mongoose.connection.close()

import { PushRequestDto } from "./dtos/pushrequest.dto";
const admin = require("firebase-admin");

const sendUnicast=function(pushRequestDto:PushRequestDto){
    const {token,title,content}=pushRequestDto; 
    const message={
        notification:{
            title:title,
            body:content,
        },
        android:{
            notification:{
                sound:"default",
            },
        },
        apns:{
            payload:{
                aps:{
                sound:"default",
                },
            },
        },
        token:token[0],
    };
admin
    .messaging()
    .send(message)
    .then(function(response:any){
        console.log("푸시 알림 전송 성공",response);
    })
    .catch(function(err){
        console.log("푸시알림 전송 실패",err);
    });
};

const sendMulticast = function(pushRequestDto:PushRequestDto){
    const {token,title,content}=pushRequestDto;
    if(token.length!==0){
        const message = {
          notification: {
            title: title,
            body: content,
          },
          android: {
            notification: {
              sound: 'default',
            },
          },
          apns: {
            payload: {
              aps: {
                sound: 'default',
              },
            },
          },
          tokens: token,
        };

    admin
    .messaging()
    .sendMulticast(message)
    .then(function(response:any){
        console.log("푸시 알림 전송 성공",response);
    })
    .catch(function(err){
        console.log("푸시알림 전송 실패",err);
    });
};
}
module.exports={
    sendUnicast,
    sendMulticast, 
};
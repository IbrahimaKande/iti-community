import { element } from 'protractor';
import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';
export class PostMapper {
  map(data: PostData): Post { 
    return {
      ...data,
      message: this.parseMessage(`${data.message} ${data.attachementUrl ? data.attachementUrl : ''}`)
    }
  }
  private parseMessage(message: string): PostMessage {
    // TODO rajouter png jpg et gif
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|png|gif)/gmi;
     // TODO mp4,wmv,flv,avi,wav
    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;
     // TODO mp3,ogg,wav
    const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav) /gmi;
    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];
    const pictureMatche = pictureRegex.exec(message);
    if (pictureMatche) {
     // TODO ajouter un attachement de type image dans attachements
        attachements.push({
          type : 'image',
          url : pictureMatche[0],
    })}
    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {
     // TODO ajouter un attachement de type video dans attachements
     attachements.push({
      type : 'video',
      url : videoMatche[0],
})
    }
    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {
     // TODO ajouter un attachement de type audio dans attachements
     attachements.push({
      type : 'video',
      url : audioMatche[0],
})
    }
    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {
     // TODO ajouter un attachement de type youtube dans attachements
     attachements.push({
      type : 'youtube',
      videoId : message,
})
    }
    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}